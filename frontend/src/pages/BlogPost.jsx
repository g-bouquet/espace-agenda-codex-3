import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { blogPosts } from '../mock';

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Article non trouvé</h1>
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

          <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 mb-4">
            {post.category}
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-neutral-600">
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
          <p className="text-xl text-neutral-600 mb-8">
            {post.excerpt}
          </p>

          <div className="text-neutral-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">Introduction</h2>
            <p>
              La gestion des rendez-vous est un défi quotidien pour de nombreux professionnels de l'accompagnement. 
              Entre les appels téléphoniques incessants, les annulations de dernière minute et la coordination des emplois du temps, 
              il est facile de perdre un temps précieux qui pourrait être consacré à votre activité principale.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">Les enjeux d'une bonne gestion</h2>
            <p>
              Une solution de prise de rendez-vous efficace doit répondre à plusieurs critères essentiels : 
              simplicité d'utilisation, fiabilité, personnalisation et respect de la confidentialité. 
              C'est pourquoi il est crucial de bien choisir l'outil qui vous accompagnera au quotidien.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">Les critères de sélection</h2>
            <p>
              Lors du choix d'une plateforme de réservation, plusieurs éléments doivent être pris en compte : 
              la facilité de prise en main, les fonctionnalités proposées, la qualité du support client, 
              et bien sûr, la possibilité de personnaliser l'outil à votre image professionnelle.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">Conclusion</h2>
            <p>
              Investir dans une solution de prise de rendez-vous adaptée, c'est investir dans votre sérénité et celle de vos clients. 
              Une plateforme bien choisie vous permettra de gagner du temps, de réduire les absences et d'offrir une expérience moderne et professionnelle.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="text-xl font-bold text-neutral-900 mb-3">
            Vous souhaitez simplifier votre gestion des rendez-vous ?
          </h3>
          <p className="text-neutral-600 mb-6">
            Découvrez comment Espace Agenda peut transformer votre quotidien professionnel.
          </p>
          <Link to="/contact">
            <Button className="bg-amber-700 hover:bg-amber-800 text-white">
              Demander l'installation
            </Button>
          </Link>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.filter(p => p.id !== id).slice(0, 3).map((relatedPost) => (
              <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="group">
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-amber-700 transition-colors line-clamp-2">
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