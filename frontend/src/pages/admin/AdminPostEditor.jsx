import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminPostEditor = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: '',
    author: 'Équipe Espace Agenda',
    published: true
  });

  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API}/blog/posts/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Erreur chargement article:', error);
      toast.error('Erreur lors du chargement de l\'article');
      navigate('/gestion-x7k9p2/posts');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEditing) {
        await axios.put(`${API}/blog/posts/${id}`, formData);
        toast.success('Article mis à jour avec succès');
      } else {
        await axios.post(`${API}/blog/posts`, formData);
        toast.success('Article créé avec succès');
      }
      navigate('/gestion-x7k9p2/posts');
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/gestion-x7k9p2/posts">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-neutral-900">
                {isEditing ? 'Modifier l\'article' : 'Nouvel article'}
              </h1>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-amber-700 hover:bg-amber-800"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </div>
      </header>

      {/* Editor */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-900 mb-2">
                  Titre de l'article *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                  placeholder="Titre accrocheur..."
                />
              </div>

              {/* Category & Author */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-neutral-900 mb-2">
                    Catégorie *
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                    placeholder="Conseils, Avantages..."
                  />
                </div>
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-neutral-900 mb-2">
                    Auteur
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-neutral-900 mb-2">
                  URL de l'image *
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image && (
                  <div className="mt-3">
                    <img
                      src={formData.image}
                      alt="Aperçu"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-neutral-900 mb-2">
                  Résumé / Extrait *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="flex w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 resize-none"
                  placeholder="Un court résumé de l'article (max 500 caractères)..."
                  maxLength={500}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {formData.excerpt.length}/500 caractères
                </p>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-neutral-900 mb-2">
                  Contenu de l'article *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={20}
                  className="flex w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 resize-y font-mono"
                  placeholder="Contenu complet de l'article (Markdown supporté)..."
                />
              </div>

              {/* Published Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-neutral-300 text-amber-700 focus:ring-amber-700"
                />
                <label htmlFor="published" className="text-sm font-medium text-neutral-900">
                  Publier l'article immédiatement
                </label>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPostEditor;