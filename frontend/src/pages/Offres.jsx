import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { offers } from '../mock';
import HeroSection from '../components/HeroSection';

const Offres = () => {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Des offres adaptées à"
        titleHighlight="vos besoins"
        description="Choisissez la formule qui correspond à votre activité. Toutes nos offres incluent l'installation, la formation et le support."
        backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80"
      />

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {offers.map((offer) => (
              <Card 
                key={offer.id} 
                className={`relative border-border ${
                  offer.highlight ? 'border-primary border-2 shadow-lg' : ''
                }`}
              >
                {offer.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white px-6 py-1 text-sm">
                      Le plus populaire
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <h3 className="text-2xl font-bold font-heading text-foreground">{offer.name}</h3>
                  <p className="mt-2 text-muted-foreground">{offer.description}</p>
                  <div className="mt-6">
                    <span className="text-4xl font-bold font-heading text-foreground">{offer.price}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-4 mb-8">
                    {offer.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact">
                    <Button 
                      className={`w-full ${
                        offer.highlight
                          ? 'bg-primary hover:bg-primary-hover text-white'
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
            <p className="text-lg text-muted-foreground">
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
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Options disponibles
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
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
              <Card key={index} className="border-border">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{option.title}</h3>
                  <p className="text-muted-foreground">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Besoin d'une configuration spécifique ? Contactez-nous pour un devis personnalisé.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white font-medium rounded-sm shadow-md hover:shadow-lg transition-all duration-300">
                Discuter de mon projet
                <ArrowRight className="ml-2 h-5 w-5" />
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
              Une question sur nos offres ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
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