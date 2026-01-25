import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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
        
        // Charger aussi les articles connexes
        const relatedResponse = await axios.get(`${API}/blog/posts?limit=3`);
        setRelatedPosts(relatedResponse.data.posts.filter(p => p.id !== id));
      } catch (err) {
        console.error('Erreur lors du chargement de l\'article:', err);
        setError("Article non trouvé");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-heading text-foreground mb-4">Article non trouvé</h1>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-sky-50 to-white py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Button>
          </Link>

          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 mb-4">
            {post.category}
          </Badge>

          <h1 className="text-4xl font-bold font-heading tracking-tight text-foreground sm:text-5xl mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.date).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>5 min de lecture</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 -mt-8 mb-12">
        <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 lg:px-8 pb-20">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            {post.excerpt}
          </p>

          <div className="text-muted-foreground leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold font-heading text-foreground mt-12 mb-4">Introduction</h2>
            <p>
              La gestion des rendez-vous est un défi quotidien pour de nombreux professionnels de l'accompagnement. 
              Entre les appels téléphoniques incessants, les annulations de dernière minute et la coordination des emplois du temps, 
              il est facile de perdre un temps précieux qui pourrait être consacré à votre activité principale.
            </p>

            <h2 className="text-2xl font-bold font-heading text-foreground mt-12 mb-4">Les enjeux d'une bonne gestion</h2>
            <p>
              Une solution de prise de rendez-vous efficace doit répondre à plusieurs critères essentiels : 
              simplicité d'utilisation, fiabilité, personnalisation et respect de la confidentialité. 
              C'est pourquoi il est crucial de bien choisir l'outil qui vous accompagnera au quotidien.
            </p>

            <h2 className="text-2xl font-bold font-heading text-foreground mt-12 mb-4">Les critères de sélection</h2>
            <p>
              Lors du choix d'une plateforme de réservation, plusieurs éléments doivent être pris en compte : 
              la facilité de prise en main, les fonctionnalités proposées, la qualité du support client, 
              et bien sûr, la possibilité de personnaliser l'outil à votre image professionnelle.
            </p>

            <h2 className="text-2xl font-bold font-heading text-foreground mt-12 mb-4">Conclusion</h2>
            <p>
              Investir dans une solution de prise de rendez-vous adaptée, c'est investir dans votre sérénité et celle de vos clients. 
              Une plateforme bien choisie vous permettra de gagner du temps, de réduire les absences et d'offrir une expérience moderne et professionnelle.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="text-xl font-bold text-foreground mb-3">
            Vous souhaitez simplifier votre gestion des rendez-vous ?
          </h3>
          <p className="text-muted-foreground mb-6">
            Découvrez comment Espace Agenda peut transformer votre quotidien professionnel.
          </p>
          <Link to="/contact">
            <Button className="bg-primary hover:bg-primary-hover text-white">
              Demander l'installation
            </Button>
          </Link>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-heading text-foreground mb-8">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.slice(0, 3).map((relatedPost) => (
              <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="group">
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {relatedPost.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;