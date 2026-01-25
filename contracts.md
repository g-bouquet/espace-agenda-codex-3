# API Contracts - Espace Agenda

## Vue d'ensemble

Ce document définit les contrats entre le frontend et le backend pour assurer une intégration fluide.

---

## 1. FORMULAIRE DE CONTACT

### Frontend actuel (mock)
- **Fichier**: `/app/frontend/src/pages/Contact.jsx`
- **État actuel**: Mock data - toast de succès après 1 seconde
- **Données collectées**:
  ```javascript
  {
    name: string,
    email: string,
    phone: string (optional),
    subject: string,
    message: string
  }
  ```

### Backend à implémenter

#### Model MongoDB: `ContactSubmission`
```python
{
  id: ObjectId,
  name: str,
  email: str,
  phone: str (optional),
  subject: str,
  message: str,
  created_at: datetime,
  status: str (new, read, replied)
}
```

#### API Endpoint: `POST /api/contact`
**Request:**
```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "0612345678",
  "subject": "installation",
  "message": "Je souhaite installer la solution..."
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
  "id": "contact_id"
}
```

**Response Error (400/500):**
```json
{
  "success": false,
  "error": "Message d'erreur"
}
```

#### Fonctionnalités email
- Envoi d'email de notification à `contact@espaceagenda.fr` avec les détails du contact
- Envoi d'email de confirmation automatique au client
- Format HTML professionnel

#### API Endpoint: `GET /api/contacts` (Admin - future)
Liste tous les messages de contact reçus.

---

## 2. BLOG & CMS

### Frontend actuel (mock)
- **Fichier mock**: `/app/frontend/src/mock.js`
- **Mock data**: 3 articles de blog
- **Pages**:
  - `/app/frontend/src/pages/Blog.jsx` - Liste des articles
  - `/app/frontend/src/pages/BlogPost.jsx` - Article individuel

### Structure mock actuelle:
```javascript
{
  id: string,
  title: string,
  excerpt: string,
  content: string,
  author: string,
  date: string (ISO),
  category: string,
  image: string (URL)
}
```

### Backend à implémenter

#### Model MongoDB: `BlogPost`
```python
{
  id: ObjectId,
  title: str,
  slug: str (auto-généré depuis title),
  excerpt: str,
  content: str,
  author: str,
  date: datetime,
  category: str,
  image: str (URL),
  published: bool,
  created_at: datetime,
  updated_at: datetime
}
```

#### API Endpoints

##### `GET /api/blog/posts`
Liste tous les articles publiés (published=true)

**Query params:**
- `limit` (int, default: 10)
- `skip` (int, default: 0)
- `category` (string, optional)

**Response:**
```json
{
  "posts": [
    {
      "id": "post_id",
      "title": "Titre de l'article",
      "slug": "titre-de-l-article",
      "excerpt": "Résumé...",
      "author": "Équipe Espace Agenda",
      "date": "2025-01-15T00:00:00Z",
      "category": "Conseils",
      "image": "https://..."
    }
  ],
  "total": 3
}
```

##### `GET /api/blog/posts/:id`
Récupère un article spécifique par ID

**Response:**
```json
{
  "id": "post_id",
  "title": "Titre complet",
  "slug": "titre-de-l-article",
  "excerpt": "Résumé...",
  "content": "Contenu complet de l'article en markdown ou HTML...",
  "author": "Équipe Espace Agenda",
  "date": "2025-01-15T00:00:00Z",
  "category": "Conseils",
  "image": "https://..."
}
```

##### `POST /api/blog/posts` (CMS - Admin)
Créer un nouvel article

**Request:**
```json
{
  "title": "Nouveau titre",
  "excerpt": "Résumé de l'article",
  "content": "Contenu complet...",
  "author": "Équipe Espace Agenda",
  "category": "Conseils",
  "image": "https://...",
  "published": true
}
```

**Response:**
```json
{
  "success": true,
  "post": { ... },
  "message": "Article créé avec succès"
}
```

##### `PUT /api/blog/posts/:id` (CMS - Admin)
Mettre à jour un article existant

##### `DELETE /api/blog/posts/:id` (CMS - Admin)
Supprimer un article

##### `GET /api/blog/categories`
Liste toutes les catégories uniques

**Response:**
```json
{
  "categories": ["Conseils", "Avantages", "Personnalisation"]
}
```

---

## 3. INTÉGRATION FRONTEND

### Étapes d'intégration

#### Contact.jsx
1. Remplacer le mock `setTimeout` par un appel API réel
2. Utiliser `axios` pour `POST /api/contact`
3. Gérer les erreurs de validation et serveur
4. Afficher les messages de succès/erreur via toast

**Code à modifier:**
```javascript
// AVANT (mock)
setTimeout(() => {
  toast({ title: "Message envoyé !", ... });
  setFormData({ ... });
  setIsSubmitting(false);
}, 1000);

// APRÈS (réel)
try {
  const response = await axios.post(`${API}/contact`, formData);
  if (response.data.success) {
    toast({ title: "Message envoyé !", ... });
    setFormData({ ... });
  }
} catch (error) {
  toast({ 
    title: "Erreur", 
    description: error.response?.data?.error || "Une erreur est survenue",
    variant: "destructive"
  });
} finally {
  setIsSubmitting(false);
}
```

#### Blog.jsx
1. Remplacer `import { blogPosts } from '../mock'`
2. Utiliser `useEffect` pour charger les articles via API
3. Gérer les états de chargement et erreurs

**Code à ajouter:**
```javascript
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog/posts`);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Erreur chargement articles:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchPosts();
}, []);
```

#### BlogPost.jsx
1. Charger l'article via API selon l'ID dans l'URL
2. Gérer le cas "article non trouvé"
3. Parser le contenu (markdown ou HTML)

---

## 4. SÉCURITÉ & VALIDATION

### Backend
- Validation Pydantic pour tous les inputs
- Rate limiting sur les endpoints publics (contact)
- Sanitization du contenu HTML pour le blog
- CORS configuré correctement

### Frontend
- Validation des formulaires côté client
- Affichage des erreurs utilisateur-friendly
- Protection contre les doubles soumissions

---

## 5. VARIABLES D'ENVIRONNEMENT

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017/
DB_NAME=espace_agenda
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=contact@espaceagenda.fr
SMTP_PASSWORD=xxxxx
CONTACT_EMAIL=contact@espaceagenda.fr
```

---

## 6. ORDRE D'IMPLÉMENTATION

1. ✅ Models MongoDB (ContactSubmission, BlogPost)
2. ✅ API Contact - POST endpoint
3. ✅ Configuration email (SMTP)
4. ✅ API Blog - GET endpoints (liste + détail)
5. ✅ API Blog - CMS endpoints (POST, PUT, DELETE)
6. ✅ Intégration frontend Contact
7. ✅ Intégration frontend Blog
8. ✅ Tests complets backend
9. ✅ Tests complets frontend intégré

---

## 7. NOTES IMPORTANTES

- **Pas d'authentification** pour l'instant sur les endpoints CMS (à implémenter plus tard)
- **Images blog**: URLs externes pour l'instant (pas d'upload de fichiers)
- **Newsletter**: Pas implémenté dans cette phase (juste UI)
- **Mock data**: Sera complètement remplacé par les appels API réels
