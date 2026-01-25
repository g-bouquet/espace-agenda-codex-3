import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { blogPosts } from '../mock';

const Blog = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-sky-50 to-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Ressources et{' '}
              <span className="text-amber-700">conseils pratiques</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Découvrez nos articles pour optimiser votre gestion des rendez-vous et améliorer votre organisation professionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="border-neutral-200 hover:border-amber-700 transition-all duration-300 hover:shadow-lg overflow-hidden group">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
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
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="link" className="p-0 h-auto text-amber-700 hover:text-amber-800">
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
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Card className="border-amber-700 border-2">
            <CardContent className="pt-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-amber-100 text-amber-700 mx-auto mb-6">
                <Calendar className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Restez informé de nos actualités
              </h2>
              <p className="text-neutral-600 mb-8">
                Recevez nos derniers articles et conseils directement dans votre boîte mail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                />
                <Button className="bg-amber-700 hover:bg-amber-800 text-white whitespace-nowrap">
                  S'inscrire
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sky-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Prêt à transformer votre gestion des rendez-vous ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-sky-100">
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