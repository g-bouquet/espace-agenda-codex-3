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

### Session 3 (actuelle - Février 2026) — Refonte Visuelle Wellness
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

## Backlog prioritaire

### P0 - Critique
- ⏳ **SMTP réel** : L'envoi d'emails est MOCKÉ (localhost:1025). Nécessite des identifiants SMTP réels (host, port, user, password) de l'hébergeur email de l'utilisateur.

### P1 - Important
- ⏳ **Images** : Remplacer les photos stock (surtout les bénéfices sur Home) par des visuels thérapeute/bien-être plus adaptés

### P2 - Souhaitable
- ⏳ **Admin auth sécurisée** : Authentification côté serveur (JWT) au lieu de client-side check. Mot de passe admin actuel : `w/h=E{449fXZ` (à reconfigurer)
- ⏳ **Logo footer** : Version blanche/SVG du logo (nécessite que l'utilisateur fournisse le fichier)

## Credentials
- Admin URL : `/admin/login`
- Admin password `.env` : `JQi]=3+8Azc4` (REACT_APP_ADMIN_PASSWORD)
- Email contact : `contact@espaceagenda.fr`
- SMTP : **MOCKED** (localhost:1025 dev) - À configurer avec vrais identifiants

## Notes techniques importantes
- Le SMTP email est actuellement sur `localhost:1025` (mock dev) → emails non envoyés en production
- Hot reload actif sur frontend et backend
- Supervisor gère les services (ne pas modifier ports)
- Toutes les URLs/credentials via `.env` uniquement
