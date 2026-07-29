import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Edit, Trash2, Plus } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog/posts?published=false`);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Erreur chargement articles:', error);
      toast.error('Erreur lors du chargement des articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }

    try {
      await axios.delete(`${API}/blog/posts/${id}`);
      toast.success('Article supprimé avec succès');
      fetchPosts();
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast.error('Erreur lors de la suppression');
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
              <Link to="/gestion-x7k9p2/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">Gestion des articles</h1>
                <p className="text-sm text-neutral-600">{posts.length} article(s)</p>
              </div>
            </div>
            <Link to="/gestion-x7k9p2/posts/new">
              <Button className="bg-amber-700 hover:bg-amber-800">
                <Plus className="h-4 w-4 mr-2" />
                Nouvel article
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Posts List */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-neutral-600 mb-4">Aucun article pour le moment</p>
              <Link to="/gestion-x7k9p2/posts/new">
                <Button className="bg-amber-700 hover:bg-amber-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer le premier article
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-lg overflow-hidden bg-neutral-100">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-neutral-900">
                              {post.title}
                            </h3>
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                              {post.category}
                            </Badge>
                            {post.published ? (
                              <Badge className="bg-green-100 text-green-700">Publié</Badge>
                            ) : (
                              <Badge variant="secondary">Brouillon</Badge>
                            )}
                          </div>
                          <p className="text-neutral-600 line-clamp-2 mb-3">{post.excerpt}</p>
                          <div className="flex items-center gap-4 text-sm text-neutral-500">
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>
                              {new Date(post.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/gestion-x7k9p2/posts/edit/${post.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:border-red-600"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPosts;