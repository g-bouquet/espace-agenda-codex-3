# PRD - Espace Agenda V3

## Problème original
Mise à jour d'une application React V2 ("Espace Agenda") vers une spécification V3 complète : refonte du contenu, des prix, de l'UX et de nouvelles fonctionnalités pour un service de gestion de rendez-vous en ligne destiné aux praticiens et indépendants.

## Architecture technique
- **Frontend** : React, React Router, TailwindCSS, Shadcn UI, AOS, react-intersection-observer
- **Backend** : FastAPI (port 8001), préfixe `/api`
- **Base de données** : MongoDB (`espace_agenda`)
- **Contenu** : Centralisé dans `/app/frontend/src/content.js`

## Structure des fichiers clés
```
/app
├── backend/
│   ├── server.py         # API endpoints
│   ├── models.py         # Pydantic models
│   ├── email_service.py  # SMTP email service
│   └── .env              # Config (SMTP, MongoDB)
├── frontend/
│   └── src/
│       ├── content.js    # Source unique de vérité (textes, prix, FAQ)
│       ├── components/
│       │   ├── Header.jsx
│       │   └── Footer.jsx  # + Newsletter subscription form
│       └── pages/
│           ├── Home.jsx
│           ├── Solution.jsx  # Page enrichie (comparaison, intégrations, RGPD, FAQ)
│           ├── Offres.jsx    # Tableau comparatif
│           ├── Exemples.jsx
│           ├── Contact.jsx
│           ├── MentionsLegales.jsx
│           ├── Confidentialite.jsx
│           └── admin/
│               ├── AdminLogin.jsx
│               ├── AdminDashboard.jsx  # 3 stats: posts, contacts, newsletters
│               ├── AdminContacts.jsx
│               ├── AdminNewsletters.jsx  # Nouveau
│               └── AdminPosts.jsx
```

## Schéma DB
- **contacts** : `{ id, name, email, phone, subject, profession, message, status, created_at }`
- **blog_posts** : `{ id, title, slug, excerpt, content, author, date, category, image, published }`
- **newsletter** : `{ id, email, name, status, subscribed_at }`

## API endpoints clés
- `POST /api/contact` : Soumission formulaire contact (DB + email SMTP)
- `GET /api/contacts` : Liste des contacts (admin)
- `POST /api/newsletter/subscribe` : Inscription newsletter
- `GET /api/newsletter/subscribers` : Liste abonnés newsletter (admin)
- `DELETE /api/newsletter/subscribers/{email}` : Désabonnement
- `GET /api/blog/posts` : Articles de blog
- `POST /api/blog/posts` : Créer un article (admin)

## Ce qui a été implémenté

### Session 1 (précédente)
- Centralisation du contenu dans `content.js`
- Mise à jour de toutes les pages (Home, Offres, Solution, Exemples, Contact, MentionsLegales)
- Création de la page Politique de Confidentialité
- Retrait du badge Emergent, copyright 2026
- Configuration email backend SMTP

### Session 5 (Février 2026) — Toggle Tarifaire & Renommage Intégral
- ✅ **content.js** : `offers` — Prime → Intégral, 100 SMS, prix annuels (290/450/690€), faqsOffres mis à jour
- ✅ **Offres.jsx** : réécriture avec toggle mensuel/annuel, badge "2 mois offerts", bandeau Sur mesure, tableau comparatif
- ✅ **Home.jsx** : toggle indépendant `isAnnualHome`
- **Tests** : 16/16 passés (iteration_4.json)

### Session 10 (Février 2026) — Fix URL démo + Bug FAQ
- ✅ **Exemples.jsx** : URL CalmeOstéo → `https://calmeosteo.wlbookings.com` (plus ostodirect)
- ✅ **accordion.jsx** : suppression du `style={{ '--radix-accordion-content-height': 'auto' }}` qui écrasait le calcul Radix → contenu visible (height 173px sur /solution)
- ✅ **index.css** : `animation-fill-mode: forwards` sur `.animate-accordion-down/up` + fallback CSS `[data-state="open"] → height: auto !important; overflow: visible`
- **Tests** : 12/12 passés (iteration_9.json) — FAQ vérifié sur /solution, /offres, /exemples
- ✅ **Couleur accent** : Terracotta #C27A62 → Doré sauge #9E7E4A sur TOUS les fichiers (JSX, tailwind.config.js, App.css) — zéro occurrence résiduelle confirmée
- ✅ **button.jsx** : outline hover → `hover:bg-transparent hover:border-primary hover:text-primary` (plus de fond coloré agressif au hover)
- ✅ **HeroSection.jsx** : icône Leaf + label-tag "Réservation en ligne pour praticiens" sur toutes les pages (Solution, Offres, Exemples, Blog, Contact)
- ✅ **accordion.jsx** : fallback `--radix-accordion-content-height: auto` + `leading-relaxed` — FAQ ouvre 9 questions sur /solution
- ✅ **tailwind.config.js** : safelist accordion, `terracotta.DEFAULT: '#9E7E4A'`, `accent.DEFAULT: '#9E7E4A'`
- **Tests** : 13/13 passés (iteration_8.json)
- ✅ **Contact.jsx** : harmonisation design warm — tous les labels (label-tag), inputs, select, textarea avec `borderColor: #E2DFD8` + `rounded-xl`, plus aucune classe résiduelle `text-foreground`/`border-neutral-300`/`focus:ring-amber-700`. Section délai refaite en 3 cartes (#FFFFFF sur #F4F0E8). Option sujet corrigée 79→69.
- ✅ **content.js** : `contactInfo.email` et `legalInfo.email` → `contact@espaceagenda.com` (2 occurrences). `locationShort` → `Bordeaux + à distance`.
- ✅ **email_service.py** : ajout `self.use_ssl`, `_send_email` utilise `SMTP_SSL` pour port 465, couleurs templates #2C352D/#5A7161, adresse footer mise à jour.
- ✅ **backend/.env** : SMTP_HOST=smtp.hostinger.com, SMTP_PORT=465, SMTP_USE_SSL=true, CONTACT_EMAIL=contact@espaceagenda.com. **SMTP_PASSWORD doit être saisi par l'opérateur.**
- **Tests** : 16/16 passés après correction du champ Téléphone (iteration_7.json + self-test)
- ✅ **Blog.jsx** : réécriture — suppression newsletter non fonctionnelle, état vide "Les articles arrivent bientôt", design warm cohérent, CTA final deep forest, zéro classe résiduelle bg-muted
- ✅ **BlogPost.jsx** : bug critique corrigé — `post.content` affiché via `dangerouslySetInnerHTML` (plus de texte hardcodé "Introduction", "Les enjeux..."), convertisseur Markdown→HTML natif sans dépendance externe, CTA inline bas d'article, section articles connexes conditionnelle
- ✅ **index.css** : styles `.prose-blog` ajoutés (h2/h3 Cormorant Garamond, paragraphes #5E6C60, blockquote avec bordure verte)
- **Tests** : 15/15 passés + Markdown corrigé (iteration_6.json)
- ✅ **Header.jsx** : "Exemples" → "Aperçu" (desktop + mobile), path `/exemples` inchangé
- ✅ **Exemples.jsx** : réécriture complète — 2 démos réelles (Harmonie Thérapie + CalmeOstéo), images tablette téléchargées en `/public/`, grille professions 3+2, FAQ, CTA deep forest
- ✅ **Offres.jsx** : correctif toggle layout shift — badge "2 mois offerts" en `flex-col` sous le toggle
- ✅ **Home.jsx** : même correctif toggle layout shift
- **Tests** : 15/15 passés (iteration_5.json)
- ✅ **Scroll reset** : composant ScrollToTop (behavior: instant) sur chaque navigation
- ✅ **Professions** : 29 professions exactes, groupées en 5 catégories (tags pill sage green + labels terracotta)
- ✅ **Intégrations** : couleur uniforme sage green (#5A7161) sur tous les items
- ✅ **FAQ Exemples** : 6 questions/réponses complètes ajoutées dans faqsExemples (content.js)
- ✅ **Offres.jsx** : cartes pricing warm palette, Fix import Card/CardContent
- ✅ **Palette de couleurs** : Sage Green (#5A7161), Terracotta (#C27A62), Warm Sand (#F9F6F0), Deep Forest (#2C352D)
- ✅ **Typographie** : Cormorant Garamond (headings), Manrope (body) — remplace Poppins/Open Sans
- ✅ **HeroSection** : Fond forêt lumineuse, overlay warm sand, layout gauche aligné, pill buttons
- ✅ **Header** : Glassmorphism (.header-glass), rounded-full CTA sage green
- ✅ **Home.jsx** : Complète refonte — images wellness praticiens, palette warm, sections épurées
- ✅ **Footer** : Fond deep forest (#2C352D), newsletter intégrée
- ✅ **Contact.jsx** : Formulaire warm sand, cards coordonnées epurées
- ✅ **Offres.jsx, Blog.jsx, Exemples.jsx, Solution.jsx** : Couleurs bleues/indigo résiduelles supprimées
- ✅ **App.css** : Design system complet (glass, warm shadows, textures, scrollbar)
- ✅ **tailwind.config.js** : Nouvelle palette complète
- ✅ **Page Solution** : Bug page blanche corrigé + contenu enrichi (comparaison manuelle/EA, fonctionnalités complètes depuis keyFeatures, intégrations, section RGPD, FAQ complète avec ancre #faq)
- ✅ **Localisation** : "Bordeaux" (plus "+ à distance") dans Footer et Contact
- ✅ **Liens internes** : "Voir toutes les questions" → /solution#faq (plus d'ancre cassée)
- ✅ **Offres** : Prime = 50 SMS inclus, Pro = téléphone inclus, Essentiel = SMS en option
- ✅ **Tableau comparatif** : mis à jour (SMS + téléphone)
- ✅ **FAQ** : Réponses complètes rédigées + alignement contenu (téléphone dès Pro)
- ✅ **Bugs apostrophes** : Corrigés dans Exemples.jsx (JSX text)
- ✅ **Newsletter** : Backend (subscribe/list/unsubscribe) + Admin page + Formulaire footer
- ✅ **Contact** : Champ `profession` sauvegardé en DB + affiché dans email notification
- ✅ **Admin** : Dashboard 3 stats (posts, contacts, newsletters) + page AdminNewsletters

### Session 12 (Avril 2026) — 6 tâches implémentées et validées
- ✅ **T1 Blog** : Suppression marqueurs `*(Pilier N)*` dans `parseMarkdown()` — `BlogPost.jsx`
- ✅ **T2 SEO** : Extraction blocs métadonnées (Balise title, Meta description, Slug URL, Maillage interne) — strippés du contenu visible, intégrés dans `document.title` et balise meta description dynamique
- ✅ **T3 CTA accueil** : Bouton "Voir un exemple de page" restyled (bordure 2px `#5A7161`, flèche, contraste renforcé) — `Home.jsx`
- ✅ **T4 Bénéfice** : "Facturation incluse dès 29€/mois" → "Rappels automatiques inclus" (axe conversion anti-absences) — `Home.jsx`
- ✅ **T5 FAQ** : Correction bug root cause — `[class*="animate-"] { opacity: 0; }` masquait tous les accordéons. Remplacé par classes explicites dans `index.css`. FAQ opérationnelle sur / et /solution
- ✅ **T6 Auth JWT** : Login côté serveur (POST /api/admin/login + POST /api/admin/verify). Token JWT signé HS256, expiry 24h. Bypass navigateur impossible. `AuthContext.jsx` + `server.py`
- **Tests** : 31/31 PASS (testing agent iteration 10)
- ✅ **insert_blog_posts.py** : Créé et exécuté — insertion directe MongoDB sans supprimer les existants
- ✅ **6 articles en base** : 3 SEO piliers nouveaux (Conseils pratiques, Organisation, Comparatif) + 3 articles existants
  - Pilier 1 : "Comment réduire les absences et les lapins dans votre cabinet ?"
  - Pilier 2 : "Gagner du temps en cabinet : ce que la gestion de vos rendez-vous vous coûte vraiment"
  - Pilier 3 : "Quel logiciel de prise de rendez-vous choisir quand on est praticien indépendant ? Guide 2026"
- ✅ **Frontend /blog** : 6 cartes d'articles affichées correctement (images, catégories, dates, excerpts)
- **Tests** : Vérifié via curl API (6 articles) + screenshot frontend (6 cartes visibles)

## Backlog prioritaire

### P0 - Critique
- ✅ **SMTP réel** : Configuré sur Hostinger SMTP SSL port 465 (contact@espaceagenda.com)

### P1 - Important
- ⏳ **Images** : Remplacer les photos stock (surtout les bénéfices sur Home) par des visuels thérapeute/bien-être plus adaptés

### P2 - Souhaitable
- ⏳ **Admin auth sécurisée** : Authentification côté serveur (JWT) au lieu de client-side check
- ⏳ **Logo footer** : Version blanche/SVG du logo (nécessite que l'utilisateur fournisse le fichier)
- ⏳ **Témoignages réels** : Photos et avis de praticiens réels pour renforcer la confiance

## Credentials
- Admin URL : `/admin/login`
- Admin password `.env` : `JQi]=3+8Azc4` (REACT_APP_ADMIN_PASSWORD)
- Email contact : `contact@espaceagenda.com`
- SMTP : Hostinger SSL port 465 — **ACTIF**

## Notes techniques importantes
- SMTP configuré et actif : Hostinger smtp.hostinger.com port 465 SSL
- Hot reload actif sur frontend et backend
- Supervisor gère les services (ne pas modifier ports)
- Toutes les URLs/credentials via `.env` uniquement
- `insert_blog_posts.py` : script d'insertion additive (ne supprime pas les posts existants)


## Changelog — 24 juin 2026 (Wave UI/Routing message 106)
- ✅ **Routing par slug SEO** : `/blog/:slug` (App.js, Blog.jsx, BlogPost.jsx). Endpoint backend `GET /api/blog/posts/{identifier}` accepte slug ET id (rétrocompatibilité).
- ✅ **Liens "Pour aller plus loin"** : liens internes des 3 articles corrigés en base pour pointer vers le bon slug (`backend/fix_blog_internal_links.py`, idempotent).
- ✅ **Avatar Guillaume** : photo réelle (rounded-full object-cover) à la place du "G".
- ✅ **En-tête article** : "Retour aux articles" et badge catégorie sur lignes séparées (bug d'alignement inline corrigé).
- ✅ **Support WhatsApp dès Essentiel** : maj content.js (feature Essentiel + FAQ faq-7 + faqsOffres faq-6) + nouvelle ligne "Support WhatsApp" (✓ partout) dans le tableau comparatif Offres.jsx.
- ✅ **Tableau comparatif** : "Sous-domaine personnalisé" déplacé du haut vers le bas (entre Google Analytics et Chatbot).
- ⚠️ Note : préversion externe (gateway) en veille pendant la session ; app saine en local (localhost:3000 + API OK). À réveiller via app.emergent.sh.
- ⚠️ Leçon technique : ne JAMAIS lancer plusieurs `search_replace` en parallèle sur le MÊME fichier (a corrompu content.js — corrigé).


## Changelog — 24 juin 2026 (Wave UI contenu)
- ✅ **Hero accueil** : sous-ligne CTA « Rappels automatiques inclus » → « Support WhatsApp inclus » (suppression de la répétition avec le subtitle).
- ✅ **Section "Nos formules" (Home.jsx)** : ajout de la mention « mini-formation de prise en main de 30 minutes » dans le texte sous les offres.
- ✅ **Suppression des "tickets"** sur tout le site : content.js (feature Essentiel, feature Pro renforcé, FAQ faq-7, howItWorks étape 3). Plus aucune occurrence (`grep` vide).
- 🧹 Suppression des fichiers morts non importés `frontend/src/mock.js` et `frontend/src/content.js.backup` (contenaient aussi "tickets").
- Responsive vérifié : desktop 1440 / tablette 820 / mobile 390 OK.


## Changelog — 24 juin 2026 (Optimisation SEO complète)
- ✅ **Composant `Seo` réutilisable** (`frontend/src/components/Seo.jsx`) : met à jour title, meta description, canonical, Open Graph (og:title/description/image/url/type/site_name/locale), Twitter Cards (summary_large_image) et JSON-LD par page. URL canonique = window.location.origin (dynamique).
- ✅ **Balises uniques sur 9 pages** : Accueil, Solution, Offres, Exemples, Blog, Contact, Mentions légales, Confidentialité + articles. Titres 32-57 car., descriptions 142-160 car. 0 page vide, 0 doublon (vérifié).
- ✅ **Articles de blog** : génération auto du title (SEO meta de l'article, sinon post.title + marque si ≤65 car.) et de la meta description (coupée au mot près + « … »). 3/3 uniques. JSON-LD `BlogPosting` injecté.
- ✅ **index.html** : `lang="fr"`, title/description optimisés, `robots: index,follow`, OG + Twitter par défaut, JSON-LD `Organization`.
- 🔎 Limite connue : meta injectées côté client (OK pour Google qui exécute le JS) ; pour un rendu parfait sur les crawlers sociaux (Facebook/LinkedIn sans JS), prévoir SSR/prerender. Restant : `sitemap.xml` + `robots.txt` dynamiques avec le vrai domaine de prod.


## Changelog — 24 juin 2026 (Sitemap dynamique + robots.txt)
- ✅ **Endpoint backend `GET /api/sitemap.xml`** (server.py) : génère le sitemap XML dynamiquement à chaque requête → 8 pages statiques + tous les articles `published` (slug encodé, lastmod ISO depuis updated_at/created_at). URLs construites depuis le Host de la requête (s'adapte à tout domaine). Tout nouvel article y apparaît automatiquement.
- ✅ **`frontend/public/robots.txt`** : `Allow: /`, `Disallow: /admin`, directive `Sitemap:` → /api/sitemap.xml.
- ⚠️ La ligne `Sitemap:` du robots.txt pointe vers le domaine de preview courant (wellness-blog-seo...). À mettre à jour avec le domaine de production réel lors du déploiement (les URLs DANS le sitemap, elles, s'adaptent automatiquement au domaine via le Host). Puis soumettre le sitemap dans Google Search Console.
- 🔧 Icônes lucide ajoutées devant chaque catégorie de la section "Professions" (page Aperçu) : Brain, Sparkles, Hand, Stethoscope, Compass.


## Changelog — 24 juin 2026 (Image OG de marque)
- ✅ **Image OG de marque 1200×630** générée (esthétique wellness : sable/vert/or, « Espace Agenda » + « La réservation en ligne pour praticiens bien-être »), recadrée au ratio OG idéal et hébergée en `frontend/public/og-image.jpg`.
- ✅ **Seo.jsx** : image OG par défaut = `${origin}/og-image.jpg` (s'adapte au domaine). Les articles de blog gardent leur propre image.
- ✅ **index.html** : og:image + twitter:image par défaut = nouvelle image de marque (URL absolue ; à mettre à jour avec le domaine de prod, comme la ligne Sitemap du robots.txt).
- ❌ SSR/prérendu : non retenu par l'utilisateur (on conserve l'injection JS, parfaite pour Google).


## Changelog — 5 juillet 2026 (Refonte offres + conformité)
- ✅ **Accueil** : badge « Calendrier synchronisé » ajouté dans le hero. Lien « Admin » retiré du footer (accès /admin/login toujours protégé JWT, non listé publiquement).
- ✅ **Solution** : « Espace client » n'est plus une option (inclus par défaut). FAQ « Quel support ? » : phrase base de connaissances supprimée + support unifié. Aucune mention ChatBot.
- ✅ **Offres — prix** : 29 / 39 / 59 €/mois (Essentiel/Pro/Intégral) propagés partout. SMS retirés des inclusions Pro/Intégral. Hero « Tarif TTC France » supprimé. Intro : mention « Réservation de groupe ».
- ✅ **Offres — SMS** : partout « Rappels SMS disponibles à prix coûtant » + précision « facturés au coût réel par notre fournisseur, sans marge ajoutée » (option SMS + FAQ).
- ✅ **Offres — support unifié** : même support humain (email, WhatsApp, téléphone) sur les 3 offres. Différenciation via nouveau bloc « Accompagnement à l'installation » par offre (installSetup dans content.js).
- ✅ **Offres — ChatBot** retiré (features + tableau + FAQ).
- ✅ **Tableau comparatif** : ajout Zoom/Google Meet/Microsoft Teams, Multilangue, Évaluations et avis, Avoir l'air occupé, Bons de réduction — tous dès Essentiel. SMS « À prix coûtant ». Ligne Chatbot supprimée. Support unifié.
- ✅ **Conformité** : bandeau cookies RGPD (`CookieConsent.jsx`, accepter/refuser + localStorage, monté globalement dans App.js). Pages Mentions légales + Confidentialité existantes et liées au footer.
- ⏳ **Logo header/footer** (demande « gris sur gris + liseré ») : DIFFÉRÉ — le logo header est foncé sur crème (bien visible) et le footer blanc sur vert foncé (bon contraste) ; impossible de reproduire « blanc sur gris ». En attente de clarification / du fichier logo.


## Changelog — 6 juillet 2026 (RGPD analytics + SMS prix + hero)
- ✅ **Accueil** : mention « Rappels automatiques inclus » retirée de la ligne sous les CTA du hero.
- ✅ **RGPD** : PostHog (seul tracker) ne s'initialise plus au chargement. `posthog.init` déplacé dans `window.__initAnalytics()`, appelé uniquement si consentement === 'accepted' (localStorage) OU sur l'événement `cookie-consent` (Accepter). Vérifié : 0 requête PostHog avant consentement, chargement après « Accepter ». Scripts emergent.sh conservés (plateforme).
- ✅ **Offres SMS** : « prix coûtant » → « 0,09 €/SMS, à prix coûtant » partout (feature Essentiel, option, FAQ, tableau comparatif).
- ℹ️ **Accès admin** : plus de lien visible ; accès via URL directe `/admin/login` (protégé par authentification JWT).

