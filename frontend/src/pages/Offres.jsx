import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { offers } from '../mock';

const Offres = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-sky-50 to-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Des offres adaptées à{' '}
              <span className="text-amber-700">vos besoins</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Choisissez la formule qui correspond à votre activité. Toutes nos offres incluent l'installation, la formation et le support.
            </p>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {offers.map((offer) => (
              <Card 
                key={offer.id} 
                className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                  offer.highlight 
                    ? 'border-amber-700 shadow-lg' 
                    : 'border-neutral-200 hover:border-amber-700'
                }`}
              >
                {offer.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-amber-700 text-white px-4 py-1 text-sm font-semibold">
                      Recommandé
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <h3 className="text-2xl font-bold text-neutral-900">{offer.name}</h3>
                  <p className="mt-2 text-neutral-600">{offer.description}</p>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-neutral-900">{offer.price}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-4 mb-8">
                    {offer.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-amber-700 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact">
                    <Button 
                      className={`w-full ${
                        offer.highlight
                          ? 'bg-amber-700 hover:bg-amber-800 text-white'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                      }`}
                    >
                      Demander un devis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional info */}
          <div className="mt-16 text-center">
            <p className="text-lg text-neutral-600">
              Toutes nos offres incluent l'installation, la personnalisation complète, 
              la formation et le support technique.
            </p>
            <p className="mt-4 text-neutral-500">
              Des options supplémentaires sont disponibles selon vos besoins spécifiques.
            </p>
          </div>
        </div>
      </section>

      {/* Options Section */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Options disponibles
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Personnalisez votre offre avec des fonctionnalités supplémentaires
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Nom de domaine personnalisé',
                description: 'Utilisez votre propre nom de domaine (ex: reservation.votrecabinet.fr)'
              },
              {
                title: 'Questionnaires avancés',
                description: 'Création de formulaires personnalisés pour collecter des informations spécifiques'
              },
              {
                title: 'Intégrations tierces',
                description: 'Connexion avec vos outils existants (comptabilité, CRM, etc.)'
              },
              {
                title: 'Multi-praticiens',
                description: 'Gérez les agendas de plusieurs professionnels sur une même plateforme'
              },
              {
                title: 'Visioconférence intégrée',
                description: 'Proposez des consultations à distance directement depuis la plateforme'
              },
              {
                title: 'Application mobile',
                description: 'Application mobile personnalisée pour iOS et Android'
              }
            ].map((option, index) => (
              <Card key={index} className="border-neutral-200">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{option.title}</h3>
                  <p className="text-neutral-600">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-neutral-600 mb-6">
              Besoin d'une configuration spécifique ? Contactez-nous pour un devis personnalisé.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-amber-700 hover:bg-amber-800 text-white">
                Discuter de mon projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sky-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Une question sur nos offres ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-sky-100">
              Notre équipe est à votre disposition pour vous conseiller et vous aider à choisir la formule la plus adaptée.
            </p>
            <div className="mt-10">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-sky-900 hover:bg-neutral-100">
                  Nous contacter
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

export default Offres;