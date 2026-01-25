import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Home = () => {
  const { ref: heroRef, inView: heroInView } = useScrollAnimation();
  const { ref: benefitsRef, inView: benefitsInView } = useScrollAnimation();
  const { ref: processRef, inView: processInView } = useScrollAnimation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="relative z-10 py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div ref={heroRef} className={`mx-auto max-w-3xl text-center transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl font-bold font-heading tracking-tight text-foreground sm:text-6xl">
                Votre solution de prise de rendez-vous{' '}
                <span className="text-primary">en marque blanche</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Offrez à vos clients une expérience de réservation en ligne fluide et professionnelle, entièrement personnalisée à votre image. Gagnez du temps, réduisez les absences et concentrez-vous sur l'essentiel : votre métier.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary-hover text-white font-medium rounded-sm shadow-md hover:shadow-lg transition-all duration-300">
                    Demander l'installation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/solution">
                  <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-sm transition-all duration-300">
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
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Pourquoi choisir Espace Agenda ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Une solution pensée pour les praticiens et professionnels de l'accompagnement
            </p>
          </div>

          <div ref={benefitsRef} className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                icon: Clock,
                title: 'Gain de temps immédiat',
                description: 'Fini les appels téléphoniques pour planifier les rendez-vous. Vos clients réservent en ligne 24h/24, vous gérez tout depuis un seul outil.',
                image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
                delay: 'delay-100'
              },
              {
                icon: Shield,
                title: '100% votre marque',
                description: 'Solution entièrement en marque blanche : votre logo, vos couleurs, votre identité. Aucune mention du fournisseur technique.',
                image: 'https://images.pexels.com/photos/9064708/pexels-photo-9064708.jpeg?w=800&q=80',
                delay: 'delay-200'
              },
              {
                icon: Zap,
                title: 'Installation et accompagnement',
                description: 'Nous installons, configurons et vous formons. Support humain inclus pour vous accompagner au quotidien.',
                image: 'https://images.pexels.com/photos/6129653/pexels-photo-6129653.jpeg?w=800&q=80',
                delay: 'delay-300'
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index} 
                  className={`border-border hover:border-primary transition-all duration-500 hover:shadow-lg overflow-hidden group ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${benefit.delay}`}
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={benefit.image} 
                      alt={benefit.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold font-heading text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Comment ça fonctionne ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Trois étapes simples pour démarrer
            </p>
          </div>

          <div ref={processRef} className="mx-auto mt-16 max-w-5xl">
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
              ].map((item, index) => (
                <div 
                  key={item.step} 
                  className={`relative group transition-all duration-500 ${processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Image with subtle overlay and badge */}
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-6 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Subtle overlay only at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    {/* Badge positioned at top left */}
                    <div className="absolute top-4 left-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold font-heading shadow-lg">
                        {item.step}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold font-heading text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-heading tracking-tight sm:text-4xl">
              Prêt à simplifier votre gestion des rendez-vous ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Demandez l'installation de votre solution personnalisée et bénéficiez d'un accompagnement complet.
            </p>
            <div className="mt-10">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-secondary hover:bg-gray-100 font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-sm">
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
