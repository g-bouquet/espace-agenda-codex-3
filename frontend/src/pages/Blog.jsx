import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import axios from 'axios';
import HeroSection from '../components/HeroSection';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API}/blog/posts`);
        setPosts(response.data.posts);
      } catch (err) {
        console.error('Erreur lors du chargement des articles:', err);
        setError("Erreur lors du chargement des articles");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Réessayer</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection
        title="Conseils pour une prise de rendez-vous"
        titleHighlight="plus sereine"
        description="Découvrez nos articles pour optimiser votre gestion des rendez-vous et améliorer votre organisation professionnelle."
        showCta={false}
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
      />

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="border-border hover:border-primary transition-all duration-300 hover:shadow-lg overflow-hidden group">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10">
                      {post.category}
                    </Badge>
                    <span className="text-sm text-neutral-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold font-heading text-foreground mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="link" className="p-0 h-auto text-primary hover:text-amber-800">
                      Lire l'article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Card className="border-primary border-2">
            <CardContent className="pt-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-6">
                <Calendar className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold font-heading text-foreground mb-4">
                Restez informé de nos actualités
              </h2>
              <p className="text-muted-foreground mb-8">
                Recevez nos derniers articles et conseils directement dans votre boîte mail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                />
                <Button className="bg-primary hover:bg-primary-hover text-white whitespace-nowrap">
                  S'inscrire
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-heading tracking-tight sm:text-4xl">
              Prêt à transformer votre gestion des rendez-vous ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Demandez l'installation de votre plateforme personnalisée et gagnez en efficacité dès aujourd'hui.
            </p>
            <div className="mt-10">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-sky-900 hover:bg-neutral-100">
                  Demander l'installation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;