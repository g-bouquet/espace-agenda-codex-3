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
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Espace Agenda s'adapte à{' '}
              <span className="text-amber-700">votre activité</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Découvrez comment des professionnels de l'accompagnement utilisent Espace Agenda pour simplifier leur quotidien et offrir une meilleure expérience à leurs clients.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Des solutions pour chaque métier
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Quelle que soit votre spécialité, Espace Agenda s'adapte à vos besoins
            </p>
          </div>

          <div className="space-y-12">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <Card key={index} className="border-neutral-200 hover:border-amber-700 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-3">{useCase.title}</h3>
                            <p className="text-lg text-neutral-600 mb-6">{useCase.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-1">
                        <div className="bg-neutral-50 rounded-lg p-6">
                          <h4 className="font-semibold text-neutral-900 mb-4">Fonctionnalités clés</h4>
                          <ul className="space-y-2">
                            {useCase.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-neutral-600">
                                <span className="text-amber-700 mt-1">•</span>
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
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
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
              <Card key={index} className="border-neutral-200">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">{benefit.title}</h3>
                  <p className="text-neutral-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial placeholder */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl text-neutral-600 italic mb-6">
              "Espace Agenda a transformé ma gestion quotidienne. Je gagne un temps précieux que je peux désormais consacrer entièrement à mes patients. La plateforme est intuitive et mes clients apprécient la simplicité de la réservation en ligne."
            </p>
            <p className="font-semibold text-neutral-900">Marie L.</p>
            <p className="text-neutral-600">Psychologue</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sky-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Prêt à simplifier votre quotidien ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-sky-100">
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