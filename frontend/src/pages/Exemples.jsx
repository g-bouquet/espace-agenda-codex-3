import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Exemples = () => {
  const useCases = [
    {
      icon: Heart,
      title: 'Thérapeutes et psychologues',
      description: 'Gestion des consultations, questionnaires pré-séance, espace client sécurisé pour les documents confidentiels.',
      features: ['Prise de rendez-vous 24h/24', 'Rappels automatiques', 'Téléconsultation intégrée'],
      image: 'https://images.unsplash.com/photo-1758273241090-b7d744465ce6?w=800&q=80'
    },
    {
      icon: Users,
      title: 'Coachs et consultants',
      description: 'Planification de séances individuelles ou de groupe, gestion des programmes d\'accompagnement sur plusieurs semaines.',
      features: ['Séances récurrentes', 'Paiements par forfait', 'Suivi personnalisé'],
      image: 'https://images.pexels.com/photos/3958426/pexels-photo-3958426.jpeg?w=800&q=80'
    },
    {
      icon: Calendar,
      title: 'Praticiens de santé',
      description: 'Réservation en ligne pour ostéopathes, infirmiers, diététiciens. Gestion des urgences et disponibilités flexibles.',
      features: ['Types de consultations multiples', 'Gestion des urgences', 'Conformité RGPD'],
      image: 'https://images.unsplash.com/photo-1758691461957-474a7686e388?w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-sky-50 to-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold font-heading tracking-tight text-foreground sm:text-5xl">
              Espace Agenda s'adapte à{' '}
              <span className="text-primary">votre activité</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Découvrez comment des professionnels de l'accompagnement utilisent Espace Agenda pour simplifier leur quotidien et offrir une meilleure expérience à leurs clients.
            </p>
          </div>
        </div>
      </section>

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
                title: 'Jusqu\'\u00e0 10h gagnées par semaine',
                description: 'Fini les allers-retours téléphoniques pour planifier ou déplacer des rendez-vous.'
              },
              {
                title: 'Réduction des absences de 30%',
                description: 'Les rappels automatiques diminuent considérablement les oublis et absences.'
              },
              {
                title: 'Disponibilité 24h/24',
                description: 'Vos clients réservent à tout moment, même en dehors de vos horaires d\'ouverture.'
              },
              {
                title: 'Meilleure expérience client',
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

      {/* Testimonial */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/8730045/pexels-photo-8730045.jpeg?w=800&q=80" 
                  alt="Témoignage client satisfait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="lg:pl-8">
                <p className="text-2xl text-muted-foreground italic mb-8 leading-relaxed">
                  "Espace Agenda a transformé ma gestion quotidienne. Je gagne un temps précieux que je peux désormais consacrer entièrement à mes patients. La plateforme est intuitive et mes clients apprécient la simplicité de la réservation en ligne."
                </p>
                <div>
                  <p className="font-semibold text-foreground text-lg">Marie L.</p>
                  <p className="text-muted-foreground">Psychologue</p>
                </div>
              </div>
            </div>
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
                  Demander l'installation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/solution">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Découvrir toutes les fonctionnalités
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