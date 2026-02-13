import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import HeroSection from '../components/HeroSection';

const Exemples = () => {
  const useCases = [
    {
      icon: Heart,
      title: 'Psychologues, thérapeutes, praticiens de l\'accompagnement',
      description: 'Gestion des consultations, questionnaires pré-séance, espace client sécurisé pour les documents confidentiels.',
      features: ['Prise de rendez-vous 24h/24', 'Rappels automatiques', 'Lien visio envoyé automatiquement (si vous faites de la visio)'],
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80'
    },
    {
      icon: Calendar,
      title: 'Ostéopathes & mieux-être corporel',
      description: 'Réservation en ligne pour ostéopathes, praticiens en bien-être corporel. Gestion des disponibilités flexibles.',
      features: ['Types de consultations multiples', 'Rappels automatiques', 'Conformité RGPD'],
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80'
    },
    {
      icon: Users,
      title: 'Coachs & consultants',
      description: 'Planification de séances individuelles ou de groupe, gestion des programmes d\'accompagnement sur plusieurs semaines.',
      features: ['Séances récurrentes', 'Paiements par forfait (selon offre)', 'Suivi personnalisé'],
      image: 'https://images.pexels.com/photos/3958426/pexels-photo-3958426.jpeg?w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        title="À quoi ça ressemble côté client ?"
        titleHighlight="(et côté praticien)"
        description="Une expérience de réservation claire et rassurante, sur mobile comme sur ordinateur."
        ctaText="Voir des exemples"
        backgroundImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80"
      />

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Des solutions pour chaque métier
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Quelle que soit votre spécialité, Espace Agenda s'adapte à vos besoins
            </p>
          </div>

          <div className="space-y-12">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <Card key={index} className="border-border hover:border-primary transition-all duration-300 hover:shadow-lg overflow-hidden">
                  <CardContent className="pt-0 p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                      {/* Image Section */}
                      <div className="lg:col-span-1">
                        <div className="aspect-square lg:aspect-auto lg:h-full overflow-hidden">
                          <img 
                            src={useCase.image} 
                            alt={useCase.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="lg:col-span-2 p-8">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-foreground mb-3">{useCase.title}</h3>
                            <p className="text-lg text-muted-foreground mb-6">{useCase.description}</p>
                          </div>
                        </div>
                        
                        <div className="bg-muted rounded-lg p-6">
                          <h4 className="font-semibold text-foreground mb-4">Fonctionnalités clés</h4>
                          <ul className="space-y-2">
                            {useCase.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                <span className="text-primary mt-1">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Les bénéfices concrets
            </h2>
          </div>

          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Moins d\'appels et de messages pour caler un créneau',
                description: 'Fini les allers-retours téléphoniques pour planifier ou déplacer des rendez-vous.'
              },
              {
                title: 'Moins d\'oublis grâce aux rappels automatiques',
                description: 'Les rappels automatiques diminuent considérablement les oublis et absences.'
              },
              {
                title: 'Disponibilité 24h/24',
                description: 'Vos clients réservent à tout moment, même en dehors de vos horaires d\'ouverture.'
              },
              {
                title: 'Une expérience client claire et professionnelle',
                description: 'Une plateforme moderne et intuitive qui valorise votre image professionnelle.'
              }
            ].map((benefit, index) => (
              <Card key={index} className="border-border">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold font-heading text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl mb-8">
              Nos engagements
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Installation guidée',
                description: 'Nous installons et configurons tout pour vous. Aucune compétence technique requise.'
              },
              {
                title: 'Support humain',
                description: 'Une question ? Notre équipe est disponible par email et téléphone pour vous accompagner.'
              },
              {
                title: 'Paramétrage adapté',
                description: 'Nous adaptons la plateforme à votre pratique, vos horaires et vos règles spécifiques.'
              },
              {
                title: 'Aucune complexité technique',
                description: 'Interface simple et intuitive. Formation de 30 minutes et vous êtes opérationnel·le.'
              }
            ].map((item, index) => (
              <Card key={index} className="border-border">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold font-heading text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-heading tracking-tight sm:text-4xl">
              Prêt à simplifier votre quotidien ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Rejoignez les professionnels qui ont choisi Espace Agenda pour gérer leurs rendez-vous en toute sérénité.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-sky-900 hover:bg-neutral-100">
                  Démarrer mon installation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/exemples">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Voir des exemples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exemples;