from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid


class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    subject: str = Field(..., min_length=1)
    profession: Optional[str] = Field(None, max_length=100)
    message: str = Field(..., min_length=10, max_length=2000)
    status: str = Field(default="new")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Jean Dupont",
                "email": "jean@example.com",
                "phone": "0612345678",
                "subject": "installation",
                "message": "Je souhaite installer la solution..."
            }
        }


class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    subject: str = Field(..., min_length=1)
    profession: Optional[str] = Field(None, max_length=100)
    message: str = Field(..., min_length=10, max_length=2000)
    gdprConsent: Optional[bool] = Field(default=False)


class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    name: Optional[str] = Field(None, max_length=100)
    status: str = Field(default="active")
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "email": "contact@exemple.fr",
                "name": "Jean Dupont"
            }
        }


class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr
    name: Optional[str] = Field(None, max_length=100)


class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = Field(..., min_length=5, max_length=200)
    slug: str
    excerpt: str = Field(..., min_length=20, max_length=500)
    content: str = Field(..., min_length=50)
    author: str = Field(default="Équipe Espace Agenda")
    date: datetime = Field(default_factory=datetime.utcnow)
    category: str
    image: str
    published: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Comment choisir une solution de prise de rendez-vous",
                "excerpt": "Découvrez les critères essentiels...",
                "content": "Contenu complet de l'article...",
                "category": "Conseils",
                "image": "https://example.com/image.jpg"
            }
        }


class BlogPostCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    excerpt: str = Field(..., min_length=20, max_length=500)
    content: str = Field(..., min_length=50)
    author: Optional[str] = Field(default="Équipe Espace Agenda")
    category: str
    image: str
    published: Optional[bool] = Field(default=True)


class BlogPostUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=5, max_length=200)
    excerpt: Optional[str] = Field(None, min_length=20, max_length=500)
    content: Optional[str] = Field(None, min_length=50)
    author: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None
    published: Optional[bool] = None
