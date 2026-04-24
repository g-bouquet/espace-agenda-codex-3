import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import { globalCTA } from '../content';

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
        setPosts(response.data.posts || []);
      } catch (err) {
        console.error('Erreur lors du chargement des articles:', err);
        setError('Erreur lors du chargement des articles');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // --- État chargement ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9F6F0' }}>
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-10 w-10 border-b-2 mx-auto mb-4"
            style={{ borderColor: '#5A7161' }}
          />
          <p className="text-sm" style={{ color: '#5E6C60' }}>Chargement des articles…</p>
        </div>
      </div>
    );
  }

  // --- État erreur ---
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9F6F0' }}>
        <div className="text-center max-w-sm px-6">
          <p className="mb-6 text-sm" style={{ color: '#5E6C60' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full px-6 py-2 text-sm font-semibold"
            style={{ backgroundColor: '#5A7161', color: '#FFFFFF' }}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection
        title="Ressources pour les praticiens"
        titleHighlight="qui gèrent mieux leur temps"
        description="Conseils pratiques sur la gestion des rendez-vous, l'organisation et l'expérience client."
        showCta={false}
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
      />

      {/* ================================================================
          LISTE DES ARTICLES
      ================================================================ */}
      <section className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* État vide — aucun article publié */}
          {posts.length === 0 ? (
            <div className="text-center py-24 max-w-lg mx-auto">
              <div
                className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'rgba(90,113,97,0.10)' }}
              >
                <Calendar className="h-8 w-8" style={{ color: '#5A7161' }} />
              </div>
              <h2 className="font-heading font-medium text-3xl mb-4" style={{ color: '#2C352D' }}>
                Les articles arrivent bientôt
              </h2>
              <p className="text-base mb-8" style={{ color: '#5E6C60' }}>
                Nous préparons des ressources utiles pour vous aider à mieux gérer vos rendez-vous et votre pratique.
              </p>
              <Link to="/contact">
                <button
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold"
                  style={{ backgroundColor: '#5A7161', color: '#FFFFFF' }}
                  data-testid="blog-empty-contact-cta"
                >
                  Nous contacter
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  style={{
                    border: '1px solid #E2DFD8',
                    boxShadow: '0 2px 8px rgba(90,113,97,0.06)',
                    backgroundColor: '#FFFFFF'
                  }}
                  data-testid={`blog-post-card-${post.id}`}
                >
                  {/* Image */}
                  {post.image && (
                    <div className="aspect-video w-full overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Contenu */}
                  <div className="p-7 flex flex-col flex-1">
                    {/* Catégorie + date */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      {post.category && (
                        <span
                          className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ backgroundColor: 'rgba(194,122,98,0.10)', color: '#C27A62' }}
                        >
                          {post.category}
                        </span>
                      )}
                      {post.date && (
                        <span className="flex items-center gap-1 text-xs" style={{ color: '#5E6C60' }}>
                          <Clock className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      )}
                    </div>

                    {/* Titre */}
                    <h2
                      className="font-heading font-medium text-xl mb-3 line-clamp-2 flex-shrink-0"
                      style={{ color: '#2C352D' }}
                    >
                      {post.title}
                    </h2>

                    {/* Extrait */}
                    {post.excerpt && (
                      <p className="text-sm leading-relaxed mb-6 line-clamp-3 flex-1" style={{ color: '#5E6C60' }}>
                        {post.excerpt}
                      </p>
                    )}

                    {/* Lien lire l'article */}
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold mt-auto transition-opacity hover:opacity-75"
                      style={{ color: '#5A7161' }}
                      data-testid={`blog-read-link-${post.id}`}
                    >
                      Lire l'article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          CTA FINAL
      ================================================================ */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#2C352D' }}>
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(90,113,97,0.6) 0%, transparent 60%)' }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading font-medium text-4xl sm:text-5xl mb-6" style={{ color: '#F9F6F0' }}>
              Votre agenda en ligne,<br />prêt en 7 jours.
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(249,246,240,0.75)' }}>
              Échangeons 20 minutes. Vous expliquez votre pratique, nous vous montrons à quoi ressemblera votre page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-full font-medium px-8"
                  style={{ backgroundColor: '#F9F6F0', color: '#2C352D' }}
                  data-testid="blog-final-cta"
                >
                  {globalCTA.primary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/offres">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8"
                  style={{ borderColor: 'rgba(249,246,240,0.3)', color: '#F9F6F0' }}
                >
                  Voir les offres
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
