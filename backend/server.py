from fastapi import FastAPI, APIRouter, HTTPException, Query, Request, Response
from dotenv import load_dotenv
from urllib.parse import quote
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timezone, timedelta
import re
import jwt as pyjwt

from models import (
    ContactSubmission, ContactSubmissionCreate,
    BlogPost, BlogPostCreate, BlogPostUpdate,
    NewsletterSubscription, NewsletterSubscriptionCreate
)
from email_service import email_service


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Utility function to generate slug
def generate_slug(title: str) -> str:
    """Génère un slug URL-friendly depuis un titre"""
    slug = title.lower()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug.strip('-')


# ============================================================================
# ADMIN AUTH HELPERS (JWT)
# ============================================================================

JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 24


def _jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def create_admin_token() -> str:
    payload = {
        "sub": "admin",
        "role": "admin",
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS),
    }
    return pyjwt.encode(payload, _jwt_secret(), algorithm=JWT_ALGORITHM)


def verify_admin_token(token: str) -> bool:
    try:
        payload = pyjwt.decode(token, _jwt_secret(), algorithms=[JWT_ALGORITHM])
        return payload.get("role") == "admin"
    except (pyjwt.ExpiredSignatureError, pyjwt.InvalidTokenError):
        return False


# ============================================================================
# ADMIN AUTH ENDPOINTS
# ============================================================================

LOGIN_MAX_ATTEMPTS = 5
LOGIN_LOCKOUT_MINUTES = 15


def _client_ip(request: Request) -> str:
    """Récupère l'IP réelle du client derrière l'ingress Kubernetes."""
    xff = request.headers.get("x-forwarded-for", "")
    if xff:
        return xff.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


async def _check_login_lockout(ip: str):
    """Bloque temporairement l'IP après trop de tentatives échouées."""
    record = await db.login_attempts.find_one({"_id": ip})
    if record and record.get("count", 0) >= LOGIN_MAX_ATTEMPTS:
        now = datetime.now(timezone.utc).timestamp()
        locked_until = record.get("locked_until", 0)
        if locked_until > now:
            remaining = int((locked_until - now) // 60) + 1
            raise HTTPException(
                status_code=429,
                detail=f"Trop de tentatives de connexion. Réessayez dans {remaining} minute(s).",
            )
        # Verrou expiré : réinitialisation
        await db.login_attempts.delete_one({"_id": ip})


async def _register_failed_login(ip: str):
    now = datetime.now(timezone.utc).timestamp()
    record = await db.login_attempts.find_one({"_id": ip})
    count = (record.get("count", 0) if record else 0) + 1
    update = {"count": count, "last_attempt": now}
    if count >= LOGIN_MAX_ATTEMPTS:
        update["locked_until"] = now + LOGIN_LOCKOUT_MINUTES * 60
    await db.login_attempts.update_one({"_id": ip}, {"$set": update}, upsert=True)


async def _clear_login_attempts(ip: str):
    await db.login_attempts.delete_one({"_id": ip})


@api_router.post("/admin/login")
async def admin_login(request: Request):
    """Valide le mot de passe admin et retourne un JWT signé (avec protection anti-brute-force)"""
    ip = _client_ip(request)
    await _check_login_lockout(ip)
    body = await request.json()
    password = body.get("password", "")
    admin_password = os.environ.get("ADMIN_PASSWORD", "")
    if not admin_password:
        raise HTTPException(status_code=500, detail="Configuration serveur manquante")
    if password != admin_password:
        await _register_failed_login(ip)
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")
    await _clear_login_attempts(ip)
    token = create_admin_token()
    return {"success": True, "token": token}


@api_router.post("/admin/verify")
async def admin_verify(request: Request):
    """Vérifie la validité d'un JWT admin"""
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Non authentifié")
    token = auth[7:]
    if verify_admin_token(token):
        return {"valid": True}
    raise HTTPException(status_code=401, detail="Token invalide ou expiré")


# ============================================================================
# CONTACT ENDPOINTS
# ============================================================================

@api_router.post("/contact", response_model=dict)
async def submit_contact(contact_data: ContactSubmissionCreate):
    """
    Soumet un formulaire de contact
    - Enregistre dans la base de données
    - Envoie un email de notification à l'équipe
    - Envoie un email de confirmation au client
    """
    try:
        # Créer l'objet de contact
        contact = ContactSubmission(**contact_data.dict())
        
        # Sauvegarder dans MongoDB
        result = await db.contacts.insert_one(contact.dict())
        
        logger.info(f"Nouveau contact enregistré: {contact.id} - {contact.name}")
        
        # Envoyer les emails (non bloquant - ne fait pas échouer la requête si ça échoue)
        try:
            email_service.send_contact_notification(
                name=contact.name,
                email=contact.email,
                phone=contact.phone,
                subject=contact.subject,
                message=contact.message,
                profession=contact.profession
            )
            email_service.send_contact_confirmation(
                name=contact.name,
                email=contact.email
            )
        except Exception as email_error:
            logger.error(f"Erreur lors de l'envoi des emails: {str(email_error)}")
            # Continue même si l'email échoue
        
        return {
            "success": True,
            "message": "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
            "id": contact.id
        }
    
    except Exception as e:
        logger.error(f"Erreur lors de la soumission du contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Une erreur est survenue lors de l'envoi du message")


@api_router.get("/contacts", response_model=List[ContactSubmission])
async def get_contacts(
    limit: int = Query(default=50, le=100),
    skip: int = Query(default=0, ge=0)
):
    """Récupère la liste des contacts (pour admin futur)"""
    try:
        contacts = await db.contacts.find().sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        return [ContactSubmission(**contact) for contact in contacts]
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des contacts")


# ============================================================================
# BLOG ENDPOINTS
# ============================================================================

@api_router.get("/blog/posts", response_model=dict)
async def get_blog_posts(
    limit: int = Query(default=10, le=50),
    skip: int = Query(default=0, ge=0),
    category: Optional[str] = None,
    published: bool = True
):
    """Récupère la liste des articles de blog"""
    try:
        # Construire le filtre
        filter_dict = {"published": published} if published else {}
        if category:
            filter_dict["category"] = category
        
        # Récupérer les articles
        posts = await db.blog_posts.find(filter_dict).sort("date", -1).skip(skip).limit(limit).to_list(limit)
        total = await db.blog_posts.count_documents(filter_dict)
        
        # Retirer le contenu complet de la liste (juste excerpt)
        posts_list = []
        for post in posts:
            post_data = BlogPost(**post).dict()
            post_data.pop('content', None)  # Retirer le contenu complet
            posts_list.append(post_data)
        
        return {
            "posts": posts_list,
            "total": total
        }
    
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des articles: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des articles")


@api_router.get("/blog/posts/{identifier}", response_model=BlogPost)
async def get_blog_post(identifier: str):
    """Récupère un article de blog par son slug (SEO) ou son ID (rétrocompatibilité)"""
    try:
        post = await db.blog_posts.find_one({
            "published": True,
            "$or": [{"slug": identifier}, {"id": identifier}]
        })
        
        if not post:
            raise HTTPException(status_code=404, detail="Article non trouvé")
        
        return BlogPost(**post)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la récupération de l'article {identifier}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération de l'article")


@api_router.get("/sitemap.xml")
async def sitemap(request: Request):
    """Génère dynamiquement le sitemap XML (pages statiques + articles publiés)."""
    host = request.headers.get("x-forwarded-host") or request.headers.get("host", "")
    proto = request.headers.get("x-forwarded-proto", "https")
    base = f"{proto}://{host}".rstrip("/")

    today = datetime.now(timezone.utc).date().isoformat()
    static_pages = [
        ("/", "1.0", "weekly"),
        ("/solution", "0.9", "monthly"),
        ("/offres", "0.9", "monthly"),
        ("/exemples", "0.7", "monthly"),
        ("/blog", "0.8", "weekly"),
        ("/contact", "0.7", "monthly"),
        ("/mentions-legales", "0.3", "yearly"),
        ("/confidentialite", "0.3", "yearly"),
    ]

    entries = [(f"{base}{path}", today, freq, priority) for path, priority, freq in static_pages]

    try:
        posts = await db.blog_posts.find({"published": True}).to_list(1000)
    except Exception as e:
        logger.error(f"Sitemap: erreur lecture articles: {e}")
        posts = []

    for p in posts:
        slug = p.get("slug")
        if not slug:
            continue
        raw = p.get("updated_at") or p.get("created_at")
        if isinstance(raw, datetime):
            lastmod = raw.date().isoformat()
        elif isinstance(raw, str) and raw:
            lastmod = raw[:10]
        else:
            lastmod = today
        loc = f"{base}/blog/{quote(slug, safe='')}"
        entries.append((loc, lastmod, "monthly", "0.6"))

    url_xml = "".join(
        f"<url><loc>{loc}</loc><lastmod>{lastmod}</lastmod>"
        f"<changefreq>{freq}</changefreq><priority>{priority}</priority></url>"
        for loc, lastmod, freq, priority in entries
    )
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        f"{url_xml}</urlset>"
    )
    return Response(content=xml, media_type="application/xml")


@api_router.post("/blog/posts", response_model=dict)
async def create_blog_post(post_data: BlogPostCreate):
    """Crée un nouvel article de blog (CMS - Admin)"""
    try:
        # Générer le slug
        slug = generate_slug(post_data.title)
        
        # Créer l'objet BlogPost
        post = BlogPost(
            **post_data.dict(),
            slug=slug
        )
        
        # Sauvegarder dans MongoDB
        result = await db.blog_posts.insert_one(post.dict())
        
        logger.info(f"Nouvel article créé: {post.id} - {post.title}")
        
        return {
            "success": True,
            "message": "Article créé avec succès",
            "post": post.dict()
        }
    
    except Exception as e:
        logger.error(f"Erreur lors de la création de l'article: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la création de l'article")


@api_router.put("/blog/posts/{post_id}", response_model=dict)
async def update_blog_post(post_id: str, post_update: BlogPostUpdate):
    """Met à jour un article de blog existant (CMS - Admin)"""
    try:
        # Récupérer l'article existant
        existing_post = await db.blog_posts.find_one({"id": post_id})
        if not existing_post:
            raise HTTPException(status_code=404, detail="Article non trouvé")
        
        # Préparer les données de mise à jour
        update_data = {k: v for k, v in post_update.dict().items() if v is not None}
        
        # Si le titre change, regénérer le slug
        if "title" in update_data:
            update_data["slug"] = generate_slug(update_data["title"])
        
        update_data["updated_at"] = datetime.utcnow()
        
        # Mettre à jour dans MongoDB
        result = await db.blog_posts.update_one(
            {"id": post_id},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=400, detail="Aucune modification effectuée")
        
        # Récupérer l'article mis à jour
        updated_post = await db.blog_posts.find_one({"id": post_id})
        
        logger.info(f"Article mis à jour: {post_id}")
        
        return {
            "success": True,
            "message": "Article mis à jour avec succès",
            "post": BlogPost(**updated_post).dict()
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la mise à jour de l'article {post_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la mise à jour de l'article")


@api_router.delete("/blog/posts/{post_id}", response_model=dict)
async def delete_blog_post(post_id: str):
    """Supprime un article de blog (CMS - Admin)"""
    try:
        result = await db.blog_posts.delete_one({"id": post_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Article non trouvé")
        
        logger.info(f"Article supprimé: {post_id}")
        
        return {
            "success": True,
            "message": "Article supprimé avec succès"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la suppression de l'article {post_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la suppression de l'article")


@api_router.get("/blog/categories", response_model=dict)
async def get_blog_categories():
    """Récupère toutes les catégories uniques des articles de blog"""
    try:
        categories = await db.blog_posts.distinct("category", {"published": True})
        return {"categories": categories}
    
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des catégories: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des catégories")


# ============================================================================
# NEWSLETTER ENDPOINTS
# ============================================================================

@api_router.post("/newsletter/subscribe", response_model=dict)
async def subscribe_newsletter(subscription_data: NewsletterSubscriptionCreate):
    """Inscrit un email à la newsletter"""
    try:
        # Vérifier si déjà inscrit
        existing = await db.newsletter.find_one({"email": subscription_data.email})
        if existing:
            # Réactiver si désabonné
            if existing.get("status") == "unsubscribed":
                await db.newsletter.update_one(
                    {"email": subscription_data.email},
                    {"$set": {"status": "active"}}
                )
                return {"success": True, "message": "Vous êtes à nouveau inscrit à notre newsletter."}
            return {"success": True, "message": "Vous êtes déjà inscrit à notre newsletter."}

        subscription = NewsletterSubscription(**subscription_data.dict())
        await db.newsletter.insert_one(subscription.dict())
        logger.info(f"Nouvelle inscription newsletter: {subscription.email}")

        return {"success": True, "message": "Merci pour votre inscription ! Vous recevrez nos prochaines actualités."}

    except Exception as e:
        logger.error(f"Erreur inscription newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de l'inscription")


@api_router.get("/newsletter/subscribers", response_model=List[NewsletterSubscription])
async def get_newsletter_subscribers(
    limit: int = Query(default=100, le=500),
    skip: int = Query(default=0, ge=0),
    status: str = Query(default="active")
):
    """Récupère la liste des abonnés newsletter (admin)"""
    try:
        filter_dict = {"status": status} if status else {}
        subscribers = await db.newsletter.find(filter_dict).sort("subscribed_at", -1).skip(skip).limit(limit).to_list(limit)
        return [NewsletterSubscription(**s) for s in subscribers]
    except Exception as e:
        logger.error(f"Erreur récupération abonnés: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des abonnés")


@api_router.delete("/newsletter/subscribers/{email}", response_model=dict)
async def unsubscribe_newsletter(email: str):
    """Désabonne un email de la newsletter"""
    try:
        result = await db.newsletter.update_one(
            {"email": email},
            {"$set": {"status": "unsubscribed"}}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Email non trouvé")
        return {"success": True, "message": "Désabonnement effectué"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur désabonnement: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors du désabonnement")


# ============================================================================
# LEGACY / TEST ENDPOINTS
# ============================================================================

@api_router.get("/")
async def root():
    return {"message": "Espace Agenda API - Bienvenue"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()