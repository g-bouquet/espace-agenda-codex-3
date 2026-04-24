"""
Backend tests for Espace Agenda V3
Tests: Contact API, Newsletter API, Blog API
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    BASE_URL = "https://espace-agenda-v3.preview.emergentagent.com"

# ============================================================================
# HEALTH CHECK
# ============================================================================

class TestHealth:
    """Basic health check"""

    def test_api_root(self):
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data


# ============================================================================
# NEWSLETTER ENDPOINTS
# ============================================================================

class TestNewsletter:
    """Newsletter subscription tests"""

    TEST_EMAIL = "test_newsletter_testemail@example.com"

    def test_subscribe_newsletter(self):
        """POST /api/newsletter/subscribe - basic subscription"""
        response = requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={
            "email": self.TEST_EMAIL,
            "name": "Test User"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "message" in data

    def test_subscribe_newsletter_duplicate(self):
        """POST /api/newsletter/subscribe - duplicate returns success with message"""
        # Subscribe first
        requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={"email": self.TEST_EMAIL})
        # Subscribe again
        response = requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={
            "email": self.TEST_EMAIL
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True

    def test_subscribe_newsletter_invalid_email(self):
        """POST /api/newsletter/subscribe - invalid email returns 422"""
        response = requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={
            "email": "not-an-email"
        })
        assert response.status_code == 422

    def test_get_newsletter_subscribers(self):
        """GET /api/newsletter/subscribers - returns list"""
        response = requests.get(f"{BASE_URL}/api/newsletter/subscribers")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

    def test_get_newsletter_subscribers_contains_test_email(self):
        """GET /api/newsletter/subscribers - subscribed email appears in list"""
        # Ensure subscribed
        requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={"email": self.TEST_EMAIL})
        response = requests.get(f"{BASE_URL}/api/newsletter/subscribers")
        assert response.status_code == 200
        data = response.json()
        emails = [s["email"] for s in data]
        assert self.TEST_EMAIL in emails

    def test_subscriber_has_required_fields(self):
        """GET /api/newsletter/subscribers - subscriber has id, email, status, subscribed_at"""
        requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={"email": self.TEST_EMAIL})
        response = requests.get(f"{BASE_URL}/api/newsletter/subscribers")
        assert response.status_code == 200
        data = response.json()
        if data:
            subscriber = data[0]
            assert "id" in subscriber
            assert "email" in subscriber
            assert "status" in subscriber
            assert "subscribed_at" in subscriber

    def test_unsubscribe_newsletter(self):
        """DELETE /api/newsletter/subscribers/{email}"""
        # Ensure subscribed
        requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={"email": self.TEST_EMAIL})
        # Unsubscribe
        response = requests.delete(
            f"{BASE_URL}/api/newsletter/subscribers/{requests.utils.quote(self.TEST_EMAIL)}"
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True

    def test_reactivate_after_unsubscribe(self):
        """POST /api/newsletter/subscribe - reactivate after unsubscribe"""
        # Unsubscribe first
        requests.delete(
            f"{BASE_URL}/api/newsletter/subscribers/{requests.utils.quote(self.TEST_EMAIL)}"
        )
        # Resubscribe
        response = requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={
            "email": self.TEST_EMAIL
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True


# ============================================================================
# CONTACT ENDPOINTS
# ============================================================================

class TestContact:
    """Contact form submission tests"""

    def test_submit_contact(self):
        """POST /api/contact - basic submission"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Jean Dupont",
            "email": "test_contact@example.com",
            "phone": "0611016054",
            "subject": "installation",
            "profession": "Psychologue",
            "message": "Je souhaite démarrer avec votre solution de réservation.",
            "gdprConsent": True
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "id" in data
        assert isinstance(data["id"], str)

    def test_submit_contact_with_profession(self):
        """POST /api/contact - profession field is accepted"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Marie Curie",
            "email": "test_profession@example.com",
            "subject": "offre",
            "profession": "Ostéopathe",
            "message": "Je veux en savoir plus sur l'offre Pro pour mon cabinet.",
            "gdprConsent": True
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True

    def test_submit_contact_missing_required_fields(self):
        """POST /api/contact - missing required fields returns 422"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "Test"
            # Missing email, subject, message
        })
        assert response.status_code == 422

    def test_submit_contact_short_message(self):
        """POST /api/contact - message too short returns 422"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "Jean Dupont",
            "email": "test@example.com",
            "subject": "autre",
            "message": "Bonjour"  # too short (< 10 chars)
        })
        assert response.status_code == 422

    def test_get_contacts(self):
        """GET /api/contacts - returns list of contacts"""
        response = requests.get(f"{BASE_URL}/api/contacts")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

    def test_contact_persisted_in_db(self):
        """Create contact and verify it appears in GET /api/contacts"""
        unique_email = "test_persist_contact@example.com"
        create_response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Persistence Check",
            "email": unique_email,
            "subject": "installation",
            "message": "Test de persistance en base de données.",
            "gdprConsent": True
        })
        assert create_response.status_code == 200
        created = create_response.json()
        assert created["success"] is True
        contact_id = created["id"]

        # Verify it appears in list
        list_response = requests.get(f"{BASE_URL}/api/contacts")
        assert list_response.status_code == 200
        contacts = list_response.json()
        contact_ids = [c["id"] for c in contacts]
        assert contact_id in contact_ids


# ============================================================================
# BLOG ENDPOINTS
# ============================================================================

class TestBlog:
    """Blog API tests"""

    def test_get_blog_posts(self):
        """GET /api/blog/posts - returns dict with posts and total"""
        response = requests.get(f"{BASE_URL}/api/blog/posts")
        assert response.status_code == 200
        data = response.json()
        assert "posts" in data
        assert "total" in data
        assert isinstance(data["posts"], list)
        assert isinstance(data["total"], int)

    def test_get_blog_categories(self):
        """GET /api/blog/categories - returns categories"""
        response = requests.get(f"{BASE_URL}/api/blog/categories")
        assert response.status_code == 200
        data = response.json()
        assert "categories" in data
        assert isinstance(data["categories"], list)

    def test_get_nonexistent_blog_post(self):
        """GET /api/blog/posts/{id} - 404 for nonexistent post"""
        response = requests.get(f"{BASE_URL}/api/blog/posts/nonexistent-id")
        assert response.status_code == 404

    def test_create_blog_post(self):
        """POST /api/blog/posts - create a new blog post"""
        response = requests.post(f"{BASE_URL}/api/blog/posts", json={
            "title": "TEST_Article de test automatique",
            "excerpt": "Ceci est un article de test créé automatiquement pour les tests backend.",
            "content": "Contenu complet de l'article de test. Ce texte doit faire plus de 50 caractères pour passer la validation.",
            "category": "Tests",
            "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "post" in data
        post = data["post"]
        assert "id" in post
        assert post["title"] == "TEST_Article de test automatique"
        assert "slug" in post

        # Cleanup
        post_id = post["id"]
        requests.delete(f"{BASE_URL}/api/blog/posts/{post_id}")

    def test_create_and_get_blog_post(self):
        """Create a blog post, then GET it by ID"""
        # Create
        create_response = requests.post(f"{BASE_URL}/api/blog/posts", json={
            "title": "TEST_Vérification persistance article",
            "excerpt": "Test de persistance pour vérifier que l'article est bien enregistré en base de données.",
            "content": "Contenu du test de persistance. Ce texte doit faire plus de 50 caractères pour passer la validation.",
            "category": "Tests",
            "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"
        })
        assert create_response.status_code == 200
        post_id = create_response.json()["post"]["id"]

        # GET
        get_response = requests.get(f"{BASE_URL}/api/blog/posts/{post_id}")
        assert get_response.status_code == 200
        post = get_response.json()
        assert post["id"] == post_id
        assert post["title"] == "TEST_Vérification persistance article"

        # Cleanup
        requests.delete(f"{BASE_URL}/api/blog/posts/{post_id}")

    def test_update_blog_post(self):
        """Create a post, update it, verify change"""
        # Create
        create_response = requests.post(f"{BASE_URL}/api/blog/posts", json={
            "title": "TEST_Article avant mise à jour",
            "excerpt": "Excerpt de l'article avant la mise à jour. Ce texte est suffisamment long pour passer la validation.",
            "content": "Contenu de l'article avant la mise à jour. Ce texte doit faire plus de 50 caractères.",
            "category": "Tests",
            "image": "https://example.com/image.jpg"
        })
        assert create_response.status_code == 200
        post_id = create_response.json()["post"]["id"]

        # Update
        update_response = requests.put(f"{BASE_URL}/api/blog/posts/{post_id}", json={
            "title": "TEST_Article après mise à jour"
        })
        assert update_response.status_code == 200

        # Verify
        get_response = requests.get(f"{BASE_URL}/api/blog/posts/{post_id}")
        assert get_response.status_code == 200
        assert get_response.json()["title"] == "TEST_Article après mise à jour"

        # Cleanup
        requests.delete(f"{BASE_URL}/api/blog/posts/{post_id}")

    def test_delete_blog_post(self):
        """Create a post, delete it, verify 404"""
        # Create
        create_response = requests.post(f"{BASE_URL}/api/blog/posts", json={
            "title": "TEST_Article à supprimer",
            "excerpt": "Cet article va être supprimé pour vérifier la fonctionnalité de suppression.",
            "content": "Contenu de l'article à supprimer. Ce texte doit faire plus de 50 caractères.",
            "category": "Tests",
            "image": "https://example.com/image.jpg"
        })
        assert create_response.status_code == 200
        post_id = create_response.json()["post"]["id"]

        # Delete
        delete_response = requests.delete(f"{BASE_URL}/api/blog/posts/{post_id}")
        assert delete_response.status_code == 200

        # Verify 404
        get_response = requests.get(f"{BASE_URL}/api/blog/posts/{post_id}")
        assert get_response.status_code == 404
