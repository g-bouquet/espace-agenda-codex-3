# Check-list SEO — Mise en ligne (Espace Agenda)

> À parcourir le jour du déploiement sur le domaine de production (ex. `https://espaceagenda.com`).
> Remplacez `VOTRE-DOMAINE.com` partout par votre vrai domaine.

## 1. Configuration liée au domaine (⚠️ obligatoire)
- [ ] **`frontend/public/robots.txt`** → mettre à jour la ligne `Sitemap:` :
      `Sitemap: https://VOTRE-DOMAINE.com/api/sitemap.xml`
- [ ] **`frontend/public/index.html`** → remplacer l'URL absolue de l'image OG par défaut :
      `og:image` et `twitter:image` → `https://VOTRE-DOMAINE.com/og-image.jpg`
- [ ] Rebuild + redéploiement après ces 2 changements.
- [ ] HTTPS actif + redirection `http://` → `https://` et `www` → non-www (ou l'inverse), une seule version canonique.

## 2. Vérifications techniques (post-déploiement)
- [ ] `https://VOTRE-DOMAINE.com/robots.txt` accessible (HTTP 200).
- [ ] `https://VOTRE-DOMAINE.com/api/sitemap.xml` renvoie du XML valide avec les URLs en `https://VOTRE-DOMAINE.com/...`
      (le sitemap s'adapte automatiquement au domaine via l'en-tête Host).
- [ ] Sur 2-3 pages : `<title>` unique, `<meta name="description">` présente, `<link rel="canonical">` correct.
- [ ] `<html lang="fr">` présent.
- [ ] JSON-LD : `Organization` (toutes pages) + `BlogPosting` (articles) — tester avec
      [Rich Results Test](https://search.google.com/test/rich-results).

## 3. Google Search Console (GSC)
- [ ] Ajouter et valider la propriété du domaine.
- [ ] Soumettre le sitemap : `https://VOTRE-DOMAINE.com/api/sitemap.xml`.
- [ ] Demander l'indexation des pages clés (Accueil, Offres, Blog, articles).
- [ ] (Optionnel) Bing Webmaster Tools : même sitemap.

## 4. Aperçus réseaux sociaux (Open Graph / Twitter)
- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) → coller l'URL,
      cliquer **« Scrape Again »** pour rafraîchir le cache. Vérifier titre/description/image.
- [ ] [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) → vérifier l'aperçu.
- [ ] Tester un **article** (doit afficher sa propre image) et une **page** (image de marque `og-image.jpg`).
- [ ] Twitter/X : carte `summary_large_image` correcte.

## 5. Contenu & qualité
- [ ] Aucune page importante en `noindex` par erreur.
- [ ] Pas de titres/descriptions dupliqués (déjà vérifié : 9 pages + 3 articles tous uniques).
- [ ] Images avec attribut `alt` pertinent.
- [ ] Liens internes « Pour aller plus loin » fonctionnels (déjà corrigés vers les bons slugs).

## 6. Performance & Core Web Vitals (bonus SEO)
- [ ] Lancer [PageSpeed Insights](https://pagespeed.web.dev/) sur Accueil + un article.
- [ ] Vérifier LCP < 2,5 s, CLS < 0,1 (images dimensionnées, polices préchargées).

## 7. Limite connue (rappel)
- Métadonnées injectées **côté client** : parfait pour Google (exécute le JS).
  Pour un aperçu social impeccable même sans JS → envisager un prérendu (react-snap) ou SSR plus tard.
  Aujourd'hui, l'image OG par défaut + les OG/Twitter dans `index.html` couvrent le cas « sans JS ».

---
### Récap de ce qui est déjà en place ✅
- Titles uniques (50-60 car.) + meta descriptions (140-160 car.) sur toutes les pages.
- Open Graph + Twitter Cards + canonical (composant `Seo`).
- JSON-LD `Organization` + `BlogPosting`.
- Sitemap **dynamique** `/api/sitemap.xml` (inclut auto chaque nouvel article).
- `robots.txt` (Allow /, Disallow /admin, Sitemap).
- Image OG de marque 1200×630 (`/og-image.jpg`).
- `lang="fr"`.
