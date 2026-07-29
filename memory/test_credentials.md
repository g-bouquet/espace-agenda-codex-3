# Credentials de test — Espace Agenda

## Interface Admin
- URL : `/gestion-x7k9p2/login` (ancienne `/admin/login` désactivée → renvoie à l'accueil)
- Mot de passe : `JQi]=3+8Azc4`
- Auth : JWT signé côté serveur (POST /api/admin/login), token stocké dans localStorage
- Endpoints : POST /api/admin/login, POST /api/admin/verify
- ⚠️ Protection anti-brute-force : 5 tentatives échouées par IP → blocage 15 min (HTTP 429). Collection MongoDB `login_attempts` (clé = IP via X-Forwarded-For). Pour lever un blocage en test : `db.login_attempts.deleteMany({})`.

## Email Contact
- Adresse : `contact@espaceagenda.com`
- SMTP : `smtp.hostinger.com` port 465 SSL (actif)

## MongoDB
- URL : `mongodb://localhost:27017`
- Base de données : `espace_agenda`
- Collections : `blog_posts` (6 articles), `contacts`, `newsletter`

## Preview URL
- Frontend : `https://wellness-blog-seo.preview.emergentagent.com`
- Backend API : `https://wellness-blog-seo.preview.emergentagent.com/api`
