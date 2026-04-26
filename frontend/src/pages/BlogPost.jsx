import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import axios from 'axios';
import { globalCTA } from '../content';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Convertisseur Markdown → HTML minimal (sans dépendance externe)
const parseMarkdown = (text) => {
  if (!text) return '';
  return text
    // Titres h3 avant h2 pour éviter les collisions
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    // Gras et italique
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Liens
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Listes à puces
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>(\n|$))+/g, '<ul>$&</ul>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Séparateurs
    .replace(/^---$/gm, '<hr />')
    // Paragraphes : double saut de ligne
    .split(/\n{2,}/)
    .map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<(h[123]|ul|ol|blockquote|hr)/.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, ' ')}</p>`;
    })
    .join('\n');
};

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API}/blog/posts/${id}`);
        setPost(response.data);
        const relatedResponse = await axios.get(`${API}/blog/posts?limit=3`);
        setRelatedPosts((relatedResponse.data.posts || []).filter(p => p.id !== id));
      } catch (err) {
        console.error("Erreur lors du chargement de l'article:", err);
        setError('Article non trouvé');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // --- État chargement ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9F6F0' }}>
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-10 w-10 border-b-2 mx-auto mb-4"
            style={{ borderColor: '#5A7161' }}
          />
          <p className="text-sm" style={{ color: '#5E6C60' }}>Chargement de l'article…</p>
        </div>
      </div>
    );
  }

  // --- État erreur ---
  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9F6F0' }}>
        <div className="text-center max-w-sm px-6">
          <h1 className="font-heading font-medium text-3xl mb-4" style={{ color: '#2C352D' }}>
            Article non trouvé
          </h1>
          <p className="text-sm mb-8" style={{ color: '#5E6C60' }}>
            Cet article n'existe pas ou a été supprimé.
          </p>
          <Link to="/blog">
            <button
              className="inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold"
              style={{ border: '1px solid #E2DFD8', color: '#2C352D', backgroundColor: '#FFFFFF' }}
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F6F0' }}>

      {/* ================================================================
          EN-TÊTE ARTICLE
      ================================================================ */}
      <div className="pt-16 pb-12" style={{ backgroundColor: '#F4F0E8' }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Retour */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-opacity hover:opacity-70"
            style={{ color: '#5A7161' }}
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux articles
          </Link>

          {/* Catégorie */}
          {post.category && (
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-5"
              style={{ backgroundColor: 'rgba(158,126,74,0.12)', color: '#9E7E4A' }}
            >
              {post.category}
            </span>
          )}

          {/* Titre */}
          <h1
            className="font-heading font-medium mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: '1.15', color: '#2C352D' }}
          >
            {post.title}
          </h1>

          {/* Méta */}
          <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: '#5E6C60' }}>
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            )}
            {post.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              5 min de lecture
            </span>
          </div>
        </div>
      </div>

      {/* ================================================================
          IMAGE À LA UNE
      ================================================================ */}
      {post.image && (
        <div className="mx-auto max-w-4xl px-6 lg:px-8 -mt-6 mb-14">
          <div className="w-full overflow-hidden rounded-3xl" style={{ boxShadow: '0 8px 24px rgba(90,113,97,0.10)' }}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full object-cover"
              style={{ maxHeight: '480px' }}
            />
          </div>
        </div>
      )}

      {/* ================================================================
          CONTENU DE L'ARTICLE
          Affiché depuis post.content saisi en admin
      ================================================================ */}
      <article className="mx-auto max-w-3xl px-6 lg:px-8 pb-20">

        {/* Extrait / chapeau */}
        {post.excerpt && (
          <p
            className="text-xl leading-relaxed mb-10 pb-10"
            style={{ color: '#5E6C60', borderBottom: '1px solid #E2DFD8' }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Contenu principal saisi en admin */}
        {post.content ? (
          <div
            className="prose-blog leading-relaxed"
            style={{ color: '#2C352D' }}
            dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
          />
        ) : (
          <p style={{ color: '#5E6C60' }}>Contenu de l'article non disponible.</p>
        )}

        {/* ================================================================
            CTA inline bas d'article
        ================================================================ */}
        <div
          className="mt-16 p-8 rounded-3xl"
          style={{ backgroundColor: '#F4F0E8', border: '1px solid #E2DFD8' }}
        >
          <h3 className="font-heading font-medium text-2xl mb-3" style={{ color: '#2C352D' }}>
            Vous souhaitez simplifier votre gestion des rendez-vous ?
          </h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#5E6C60' }}>
            Découvrez comment Espace Agenda peut transformer votre quotidien professionnel.
          </p>
          <Link to="/contact">
            <button
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#5A7161', color: '#FFFFFF' }}
              data-testid="blogpost-inline-cta"
            >
              Demander l'installation
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </article>

      {/* ================================================================
          ARTICLES CONNEXES
      ================================================================ */}
      {relatedPosts.length > 0 && (
        <section className="py-20" style={{ backgroundColor: '#F4F0E8' }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-heading font-medium text-3xl mb-10" style={{ color: '#2C352D' }}>
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 block"
                  style={{ border: '1px solid #E2DFD8', backgroundColor: '#FFFFFF' }}
                  data-testid={`related-post-${relatedPost.id}`}
                >
                  {relatedPost.image && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    {relatedPost.category && (
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full inline-block mb-3"
                        style={{ backgroundColor: 'rgba(158,126,74,0.10)', color: '#9E7E4A' }}
                      >
                        {relatedPost.category}
                      </span>
                    )}
                    <h3
                      className="font-heading font-medium text-lg leading-snug line-clamp-2 transition-colors"
                      style={{ color: '#2C352D' }}
                    >
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
            <Link to="/contact">
              <Button
                size="lg"
                className="rounded-full font-medium px-8"
                style={{ backgroundColor: '#F9F6F0', color: '#2C352D' }}
                data-testid="blogpost-final-cta"
              >
                {globalCTA.primary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
