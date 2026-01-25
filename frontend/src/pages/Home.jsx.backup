import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=80" 
            alt="Espace professionnel moderne"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white"></div>
        </div>
        
        <div className="relative z-10 py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
                Votre solution de prise de rendez-vous{' '}
                <span className="text-amber-700">en marque blanche</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-neutral-600">
                Offrez à vos clients une expérience de réservation en ligne fluide et professionnelle, entièrement personnalisée à votre image. Gagnez du temps, réduisez les absences et concentrez-vous sur l'essentiel : votre métier.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/contact">
                  <Button size="lg" className="bg-amber-700 hover:bg-amber-800 text-white">
                    Demander l'installation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/solution">
                  <Button size="lg" variant="outline">
                    Découvrir la solution
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Pourquoi choisir Espace Agenda ?
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Une solution pensée pour les praticiens et professionnels de l'accompagnement
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="border-neutral-200 hover:border-amber-700 transition-all duration-300 hover:shadow-lg overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" 
                  alt="Professionnel de santé"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-700 mb-6">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Gain de temps immédiat
                </h3>
                <p className="mt-3 text-neutral-600">
                  Fini les appels téléphoniques pour planifier les rendez-vous. Vos clients réservent en ligne 24h/24, vous gérez tout depuis un seul outil.
                </p>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 hover:border-amber-700 transition-all duration-300 hover:shadow-lg overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/9064708/pexels-photo-9064708.jpeg?w=800&q=80" 
                  alt="Consultation professionnelle"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-sky-800 mb-6">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">
                  100% votre marque
                </h3>
                <p className="mt-3 text-neutral-600">
                  Solution entièrement en marque blanche : votre logo, vos couleurs, votre identité. Aucune mention du fournisseur technique.
                </p>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 hover:border-amber-700 transition-all duration-300 hover:shadow-lg overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/6129653/pexels-photo-6129653.jpeg?w=800&q=80" 
                  alt="Accompagnement professionnel"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-700 mb-6">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Installation et accompagnement
                </h3>
                <p className="mt-3 text-neutral-600">
                  Nous installons, configurons et vous formons. Support humain inclus pour vous accompagner au quotidien.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Comment ça fonctionne ?
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Trois étapes simples pour démarrer
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Échange et personnalisation',
                  description: 'Nous discutons de vos besoins et configurons votre plateforme selon votre identité visuelle.',
                  image: 'https://images.unsplash.com/photo-1758518729706-b1810dd39cc6?w=600&q=80'
                },
                {
                  step: '2',
                  title: 'Installation et formation',
                  description: 'Nous installons la solution et vous formons à son utilisation pour une prise en main optimale.',
                  image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80'
                },
                {
                  step: '3',
                  title: 'Accompagnement continu',
                  description: 'Vous bénéficiez d\'un support humain et d\'évolutions régulières de votre plateforme.',
                  image: 'https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?w=600&q=80'
                }
              ].map((item) => (
                <div key={item.step} className="relative group">
                  {/* Image with subtle overlay and badge */}
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-6">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Subtle overlay only at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 via-transparent to-transparent"></div>
                    {/* Badge positioned at top left */}
                    <div className="absolute top-4 left-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-700 text-white text-xl font-bold shadow-lg">
                        {item.step}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                  <p className="text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sky-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Prêt à simplifier votre gestion des rendez-vous ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-sky-100">
              Demandez l'installation de votre solution personnalisée et bénéficiez d'un accompagnement complet.
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

export default Home;