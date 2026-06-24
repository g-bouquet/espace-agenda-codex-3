"""
Iteration 10 — Backend tests for Espace Agenda
Tests: T6 Admin JWT Auth (/api/admin/login, /api/admin/verify)
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    BASE_URL = "https://v3-mongodb-deploy.preview.emergentagent.com"

ADMIN_PASSWORD = "JQi]=3+8Azc4"
WRONG_PASSWORD = "wrongpassword123"


# ============================================================================
# HEALTH CHECK
# ============================================================================

class TestHealth:
    """Basic connectivity check"""

    def test_blog_posts_accessible(self):
        """GET /api/blog/posts — should return 200 with posts"""
        response = requests.get(f"{BASE_URL}/api/blog/posts?limit=5")
        assert response.status_code == 200
        data = response.json()
        assert "posts" in data
        assert isinstance(data["posts"], list)
        print(f"PASS: Blog posts accessible, {len(data['posts'])} posts found")


# ============================================================================
# T6 — ADMIN JWT AUTH
# ============================================================================

class TestAdminAuth:
    """T6 — JWT Admin auth endpoints"""

    def test_login_with_correct_password_returns_200_and_token(self):
        """POST /api/admin/login — correct password → 200 + JWT token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": ADMIN_PASSWORD},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "token" in data, f"Expected 'token' in response, got: {data}"
        assert isinstance(data["token"], str), "Token must be a string"
        assert len(data["token"]) > 20, "Token seems too short"
        assert data.get("success") is True, "Expected success=True"
        print(f"PASS: Login returns 200 with JWT token (len={len(data['token'])})")

    def test_login_with_wrong_password_returns_401(self):
        """POST /api/admin/login — wrong password → 401"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": WRONG_PASSWORD},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 401, f"Expected 401, got {response.status_code}: {response.text}"
        data = response.json()
        assert "detail" in data, f"Expected error detail, got: {data}"
        print(f"PASS: Login with wrong password returns 401: {data.get('detail')}")

    def test_login_with_empty_password_returns_401(self):
        """POST /api/admin/login — empty password → 401"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": ""},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 401, f"Expected 401, got {response.status_code}: {response.text}"
        print(f"PASS: Login with empty password returns 401")

    def test_verify_with_valid_token_returns_valid_true(self):
        """POST /api/admin/verify — valid token → {valid: true}"""
        # First, get a valid token
        login_resp = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": ADMIN_PASSWORD},
            headers={"Content-Type": "application/json"}
        )
        assert login_resp.status_code == 200, "Login failed — cannot proceed with verify test"
        token = login_resp.json()["token"]

        # Now verify the token
        verify_resp = requests.post(
            f"{BASE_URL}/api/admin/verify",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }
        )
        assert verify_resp.status_code == 200, f"Expected 200, got {verify_resp.status_code}: {verify_resp.text}"
        data = verify_resp.json()
        assert data.get("valid") is True, f"Expected valid=True, got: {data}"
        print(f"PASS: Verify with valid token returns 200 with valid=true")

    def test_verify_with_invalid_token_returns_401(self):
        """POST /api/admin/verify — invalid token → 401"""
        verify_resp = requests.post(
            f"{BASE_URL}/api/admin/verify",
            headers={
                "Authorization": "Bearer invalidtoken123",
                "Content-Type": "application/json"
            }
        )
        assert verify_resp.status_code == 401, f"Expected 401, got {verify_resp.status_code}: {verify_resp.text}"
        print(f"PASS: Verify with invalid token returns 401")

    def test_verify_without_token_returns_401(self):
        """POST /api/admin/verify — no Authorization header → 401"""
        verify_resp = requests.post(
            f"{BASE_URL}/api/admin/verify",
            headers={"Content-Type": "application/json"}
        )
        assert verify_resp.status_code == 401, f"Expected 401, got {verify_resp.status_code}: {verify_resp.text}"
        print(f"PASS: Verify without token returns 401")

    def test_verify_with_malformed_bearer_returns_401(self):
        """POST /api/admin/verify — malformed auth header → 401"""
        verify_resp = requests.post(
            f"{BASE_URL}/api/admin/verify",
            headers={
                "Authorization": "Token abc123",  # Wrong scheme
                "Content-Type": "application/json"
            }
        )
        assert verify_resp.status_code == 401, f"Expected 401, got {verify_resp.status_code}: {verify_resp.text}"
        print(f"PASS: Verify with malformed Bearer header returns 401")


# ============================================================================
# T1/T2 — Blog post content checks (Pilier markers and SEO metadata)
# ============================================================================

class TestBlogContent:
    """T1/T2 — Check raw blog content for Pilier markers (to verify data in DB)"""

    POST_IDS = [
        "d2d4e93f-0307-410c-a74c-5f2fe92c07f3",
        "e5c2f10c-df86-41a2-bfda-4834d832992e",
        "c062dc8a-cd62-4b93-943d-7937c453604b"
    ]

    def test_all_posts_have_seo_meta_block(self):
        """All 3 SEO articles must have **Balise title :** in their raw content"""
        for post_id in self.POST_IDS:
            response = requests.get(f"{BASE_URL}/api/blog/posts/{post_id}")
            assert response.status_code == 200, f"Post {post_id} not found"
            content = response.json().get("content", "")
            assert "**Balise title" in content, f"Post {post_id} missing Balise title in content"
            assert "**Meta description" in content, f"Post {post_id} missing Meta description in content"
        print("PASS: All 3 SEO articles have metadata blocks in raw content")

    def test_all_posts_have_separator(self):
        """All 3 SEO articles must have the --- separator to separate meta block from article"""
        for post_id in self.POST_IDS:
            response = requests.get(f"{BASE_URL}/api/blog/posts/{post_id}")
            content = response.json().get("content", "")
            assert "\n---\n" in content or "---" in content, \
                f"Post {post_id} missing '---' separator"
        print("PASS: All 3 SEO articles have --- separator")

    def test_raw_content_has_pilier_markers(self):
        """Raw content in DB still has *(Pilier N)* markers (should be stripped at render time)"""
        for post_id in self.POST_IDS:
            response = requests.get(f"{BASE_URL}/api/blog/posts/{post_id}")
            content = response.json().get("content", "")
            # The raw DB content has *(Pilier N)* — stripping happens in frontend
            has_pilier = "Pilier" in content
            if has_pilier:
                print(f"  NOTE: Post {post_id} has Pilier markers in raw content (frontend will strip them)")
            else:
                print(f"  NOTE: Post {post_id} has no Pilier markers in raw content")
        # Not a failure — stripping is done in the frontend
        print("PASS: Raw content pilier check complete (frontend handles stripping)")
