#!/usr/bin/env python3
"""
Backend API Tests for Espace Agenda
Tests all backend endpoints including Contact API, Blog API, and CMS functionality
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Configuration
BACKEND_URL = "https://rendezvous-pro-3.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.created_posts = []  # Track created posts for cleanup
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        if response_data and not success:
            print(f"   Response: {response_data}")
    
    async def test_contact_api_valid_data(self):
        """Test POST /api/contact with valid data"""
        test_name = "Contact API - Valid Data"
        
        contact_data = {
            "name": "Marie Dubois",
            "email": "marie.dubois@example.com",
            "phone": "0123456789",
            "subject": "Demande d'information sur la solution",
            "message": "Bonjour, je souhaiterais avoir plus d'informations sur votre solution de prise de rendez-vous en ligne. Pouvez-vous me contacter pour une démonstration ?"
        }
        
        try:
            async with self.session.post(f"{API_BASE}/contact", json=contact_data) as response:
                response_data = await response.json()
                
                if response.status == 200:
                    # Check response structure
                    required_fields = ["success", "message", "id"]
                    if all(field in response_data for field in required_fields):
                        if response_data["success"] is True and response_data["id"]:
                            self.log_test(test_name, True, f"Contact created with ID: {response_data['id']}", response_data)
                            return response_data["id"]
                        else:
                            self.log_test(test_name, False, "Response success field is not True or ID is missing", response_data)
                    else:
                        self.log_test(test_name, False, f"Missing required fields in response: {required_fields}", response_data)
                else:
                    self.log_test(test_name, False, f"HTTP {response.status}", response_data)
                    
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
        
        return None
    
    async def test_contact_api_invalid_email(self):
        """Test POST /api/contact with invalid email"""
        test_name = "Contact API - Invalid Email"
        
        contact_data = {
            "name": "Test User",
            "email": "invalid-email",
            "phone": "0123456789",
            "subject": "Test",
            "message": "This is a test message with invalid email format."
        }
        
        try:
            async with self.session.post(f"{API_BASE}/contact", json=contact_data) as response:
                response_data = await response.json()
                
                if response.status == 422:  # Validation error expected
                    self.log_test(test_name, True, "Correctly rejected invalid email", response_data)
                else:
                    self.log_test(test_name, False, f"Expected 422 validation error, got {response.status}", response_data)
                    
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    async def test_contact_api_missing_fields(self):
        """Test POST /api/contact with missing required fields"""
        test_name = "Contact API - Missing Fields"
        
        contact_data = {
            "name": "Test User",
            "email": "test@example.com"
            # Missing subject and message
        }
        
        try:
            async with self.session.post(f"{API_BASE}/contact", json=contact_data) as response:
                response_data = await response.json()
                
                if response.status == 422:  # Validation error expected
                    self.log_test(test_name, True, "Correctly rejected missing fields", response_data)
                else:
                    self.log_test(test_name, False, f"Expected 422 validation error, got {response.status}", response_data)
                    
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    async def test_blog_posts_list(self):
        """Test GET /api/blog/posts"""
        test_name = "Blog API - Get Posts List"
        
        try:
            async with self.session.get(f"{API_BASE}/blog/posts") as response:
                response_data = await response.json()
                
                if response.status == 200:
                    if "posts" in response_data and "total" in response_data:
                        posts = response_data["posts"]
                        if isinstance(posts, list):
                            self.log_test(test_name, True, f"Retrieved {len(posts)} posts, total: {response_data['total']}", {"posts_count": len(posts), "total": response_data["total"]})
                            return posts
                        else:
                            self.log_test(test_name, False, "Posts field is not a list", response_data)
                    else:
                        self.log_test(test_name, False, "Missing 'posts' or 'total' field in response", response_data)
                else:
                    self.log_test(test_name, False, f"HTTP {response.status}", response_data)
                    
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
        
        return []
    
    async def test_blog_post_by_id(self, post_id: str):
        """Test GET /api/blog/posts/{id}"""
        test_name = f"Blog API - Get Post by ID ({post_id})"
        
        try:
            async with self.session.get(f"{API_BASE}/blog/posts/{post_id}") as response:
                response_data = await response.json()
                
                if response.status == 200:
                    required_fields = ["id", "title", "content", "author", "category"]
                    if all(field in response_data for field in required_fields):
                        if response_data["id"] == post_id:
                            self.log_test(test_name, True, f"Retrieved post: {response_data['title']}", {"title": response_data["title"], "category": response_data["category"]})
                            return response_data
                        else:
                            self.log_test(test_name, False, f"ID mismatch: expected {post_id}, got {response_data.get('id')}", response_data)
                    else:
                        self.log_test(test_name, False, f"Missing required fields: {required_fields}", response_data)
                else:
                    self.log_test(test_name, False, f"HTTP {response.status}", response_data)
                    
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
        
        return None
    
    async def test_blog_post_not_found(self):
        """Test GET /api/blog/posts/999 (non-existent)"""
        test_name = "Blog API - Post Not Found"
        
        try:
            async with self.session.get(f"{API_BASE}/blog/posts/999") as response:
                response_data = await response.json()
                
                if response.status == 404:
                    self.log_test(test_name, True, "Correctly returned 404 for non-existent post", response_data)
                else:
                    self.log_test(test_name, False, f"Expected 404, got {response.status}", response_data)
                    
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    async def test_blog_categories(self):
        """Test GET /api/blog/categories"""
        test_name = "Blog API - Get Categories"
        
        try:
            async with self.session.get(f"{API_BASE}/blog/categories") as response:
                response_data = await response.json()
                
                if response.status == 200:
                    if "categories" in response_data:
                        categories = response_data["categories"]
                        if isinstance(categories, list):
                            self.log_test(test_name, True, f"Retrieved {len(categories)} categories", {"categories": categories})
                            return categories
                        else:
                            self.log_test(test_name, False, "Categories field is not a list", response_data)
                    else:
                        self.log_test(test_name, False, "Missing 'categories' field in response", response_data)
                else:
                    self.log_test(test_name, False, f"HTTP {response.status}", response_data)
                    
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
        
        return []
    
    async def test_create_blog_post(self):
        """Test POST /api/blog/posts (CMS Create)"""
        test_name = "CMS - Create Blog Post"
        
        post_data = {
            "title": "Guide complet pour optimiser vos rendez-vous clients",
            "excerpt": "Découvrez les meilleures pratiques pour gérer efficacement vos rendez-vous et améliorer l'expérience client avec notre solution Espace Agenda.",
            "content": "Dans le monde professionnel d'aujourd'hui, la gestion efficace des rendez-vous est cruciale pour le succès de votre entreprise. Que vous soyez un professionnel de santé, un consultant ou un prestataire de services, optimiser votre système de prise de rendez-vous peut transformer votre activité. Notre solution Espace Agenda vous offre tous les outils nécessaires pour automatiser et améliorer ce processus. Grâce à notre interface intuitive, vos clients peuvent réserver leurs créneaux en ligne 24h/24, réduisant ainsi les appels téléphoniques et les erreurs de planification. De plus, notre système de rappels automatiques diminue significativement le taux de no-show, optimisant ainsi votre chiffre d'affaires.",
            "author": "Équipe Espace Agenda",
            "category": "Conseils",
            "image": "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "published": True
        }
        
        try:
            async with self.session.post(f"{API_BASE}/blog/posts", json=post_data) as response:
                response_data = await response.json()
                
                if response.status == 200:
                    if response_data.get("success") and "post" in response_data:
                        created_post = response_data["post"]
                        post_id = created_post.get("id")
                        if post_id:
                            self.created_posts.append(post_id)
                            self.log_test(test_name, True, f"Created post with ID: {post_id}", {"id": post_id, "title": created_post.get("title")})
                            return post_id
                        else:
                            self.log_test(test_name, False, "No ID in created post", response_data)
                    else:
                        self.log_test(test_name, False, "Success field is False or missing post data", response_data)
                else:
                    self.log_test(test_name, False, f"HTTP {response.status}", response_data)
                    
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
        
        return None
    
    async def test_update_blog_post(self, post_id: str):
        """Test PUT /api/blog/posts/{id} (CMS Update)"""
        test_name = f"CMS - Update Blog Post ({post_id})"
        
        update_data = {
            "title": "Guide complet pour optimiser vos rendez-vous clients - Version mise à jour",
            "excerpt": "Version mise à jour de notre guide pour optimiser la gestion de vos rendez-vous avec Espace Agenda.",
            "category": "Guides"
        }
        
        try:
            async with self.session.put(f"{API_BASE}/blog/posts/{post_id}", json=update_data) as response:
                response_data = await response.json()
                
                if response.status == 200:
                    if response_data.get("success") and "post" in response_data:
                        updated_post = response_data["post"]
                        if updated_post.get("title") == update_data["title"]:
                            self.log_test(test_name, True, f"Updated post title and category", {"new_title": updated_post.get("title"), "new_category": updated_post.get("category")})
                            return True
                        else:
                            self.log_test(test_name, False, "Title was not updated correctly", response_data)
                    else:
                        self.log_test(test_name, False, "Success field is False or missing post data", response_data)
                else:
                    self.log_test(test_name, False, f"HTTP {response.status}", response_data)
                    
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    async def test_delete_blog_post(self, post_id: str):
        """Test DELETE /api/blog/posts/{id} (CMS Delete)"""
        test_name = f"CMS - Delete Blog Post ({post_id})"
        
        try:
            async with self.session.delete(f"{API_BASE}/blog/posts/{post_id}") as response:
                response_data = await response.json()
                
                if response.status == 200:
                    if response_data.get("success"):
                        self.log_test(test_name, True, f"Successfully deleted post", response_data)
                        # Remove from our tracking list
                        if post_id in self.created_posts:
                            self.created_posts.remove(post_id)
                        return True
                    else:
                        self.log_test(test_name, False, "Success field is False", response_data)
                else:
                    self.log_test(test_name, False, f"HTTP {response.status}", response_data)
                    
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    async def cleanup_created_posts(self):
        """Clean up any posts created during testing"""
        for post_id in self.created_posts.copy():
            await self.test_delete_blog_post(post_id)
    
    def print_summary(self):
        """Print test summary"""
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print("\n" + "="*60)
        print("BACKEND API TEST SUMMARY")
        print("="*60)
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"❌ {result['test']}: {result['details']}")
        
        print("\n" + "="*60)

async def main():
    """Run all backend tests"""
    print("Starting Espace Agenda Backend API Tests...")
    print(f"Testing against: {API_BASE}")
    print("="*60)
    
    async with BackendTester() as tester:
        # Test Contact API
        print("\n🔍 Testing Contact API...")
        contact_id = await tester.test_contact_api_valid_data()
        await tester.test_contact_api_invalid_email()
        await tester.test_contact_api_missing_fields()
        
        # Test Blog API
        print("\n🔍 Testing Blog API...")
        posts = await tester.test_blog_posts_list()
        
        # Test specific post if any exist
        if posts and len(posts) > 0:
            first_post_id = posts[0].get("id")
            if first_post_id:
                await tester.test_blog_post_by_id(first_post_id)
        
        await tester.test_blog_post_not_found()
        await tester.test_blog_categories()
        
        # Test CMS functionality
        print("\n🔍 Testing CMS (Create/Update/Delete)...")
        created_post_id = await tester.test_create_blog_post()
        
        if created_post_id:
            await tester.test_update_blog_post(created_post_id)
            await tester.test_delete_blog_post(created_post_id)
        
        # Cleanup any remaining test posts
        await tester.cleanup_created_posts()
        
        # Print summary
        tester.print_summary()
        
        return tester.test_results

if __name__ == "__main__":
    asyncio.run(main())