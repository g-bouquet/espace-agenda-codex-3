import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, Heart, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import HeroSection from '../components/HeroSection';
import { globalCTA, targetAudiences } from '../content';

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
        title="À quoi ça ressemble côté client"
        titleHighlight="et côté praticien ?"
        description="Une expérience de réservation claire et rassurante, sur mobile comme sur ordinateur."
        ctaText="Voir un exemple"
        backgroundImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80"
      />

      {/* Demos Section */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl mb-4">
              Démos en ligne
            </h2>
            <p className="text-lg text-gray-700">
              Découvrez comment fonctionne une page de réservation Espace Agenda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg mb-6 flex items-center justify-center">
                  <Heart className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Mini-site de réservation</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Exemple de mini-site complet pour une thérapeute. Page de présentation, services, réservation en ligne.
                </p>
                <a 
                  href="https://harmonietherapeute.wlbookings.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
                >
                  Voir la démo
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="aspect-video bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg mb-6 flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Intégration sur site existant</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Exemple d'intégration de la réservation directement sur un site WordPress ou autre.
                </p>
                <span className="inline-flex items-center gap-2 text-gray-500 text-sm">
                  Démo prochainement disponible
                </span>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-6">
              Vous voulez tester avec vos propres paramètres ?
            </p>
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary-hover text-white">
                Demander une démo personnalisée
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
            <p className="mt-4 text-lg text-gray-700">
              Nos clients utilisent Espace Agenda dans de nombreux domaines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <Card key={index} className="border-border hover:border-primary transition-all duration-300 hover:shadow-lg overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-neutral-100">
                    <img 
                      src={useCase.image} 
                      alt={useCase.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex gap-4 mb-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{useCase.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">{useCase.description}</p>
                    <ul className="space-y-2">
                      {useCase.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-primary mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plus d'exemples de professions */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl mb-4">
              Et bien d'autres professions
            </h2>
            <p className="text-lg text-gray-700">
              Espace Agenda s'adapte à votre pratique, quelle qu'elle soit
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
            {targetAudiences.map((profession, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-md px-3 py-2 text-center text-sm text-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                {profession}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-6">
              Votre métier n'est pas dans la liste ? Aucun problème !
            </p>
            <Link to="/contact">
              <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
                Discuter de mon cas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-heading tracking-tight sm:text-4xl">
              Prêt à créer votre page de réservation ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Nous vous accompagnons de A à Z : installation, personnalisation, formation.
            </p>
            <div className="mt-10">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-sky-900 hover:bg-neutral-100">
                  {globalCTA.primary}
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

export default Exemples;
