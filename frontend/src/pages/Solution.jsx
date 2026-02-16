import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Globe, Bell, CreditCard, Users, Shield, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { faqs, globalCTA } from '../content';
import { useInView } from 'react-intersection-observer';
import HeroSection from '../components/HeroSection';

const Solution = () => {
  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const features = [
    {
      icon: Globe,
      title: 'Page de réservation à votre nom',
      description: 'Votre propre page de prise de rendez-vous aux couleurs de votre marque, accessible 24h/24. Mini-site inclus ou intégration sur votre site existant.'
    },
    {
      icon: Calendar,
      title: 'Calendrier intelligent + synchronisation',
      description: 'Gérez vos disponibilités en temps réel. Synchronisation automatique avec Google Agenda et Outlook. Blocage des indisponibilités.'
    },
    {
      icon: Bell,
      title: 'Rappels automatiques (email + SMS + WhatsApp selon offre)',
      description: 'Réduisez les absences grâce aux rappels automatiques par email, SMS (selon offre) et WhatsApp. Vos clients sont prévenus avant chaque rendez-vous.'
    },
    {
      icon: CreditCard,
      title: 'Paiements & acomptes (selon offre)',
      description: 'Acceptez les paiements et acomptes en ligne. Transactions sécurisées et suivi automatique des encaissements.'
    },
    {
      icon: Users,
      title: 'Fiche client personnalisée',
      description: 'Historique des rendez-vous, notes internes privées, champs personnalisés adaptés à votre pratique. Import / export des données.'
    },
    {
      icon: Shield,
      title: 'Sécurité & RGPD',
      description: 'Conformité RGPD garantie, hébergement sécurisé et sauvegarde automatique. Gestion des consentements et des droits clients.'
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        title="Tout ce qu'il faut pour gérer vos rendez-vous —"
        titleHighlight="à votre nom"
        description="Plateforme installée et configurée pour votre pratique : réservation en ligne, rappels (email + SMS + WhatsApp selon offre), paiements et support humain."
        backgroundImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&q=80"
        ctaText={globalCTA.primary}
      />

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Comment ça marche ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              En 3 étapes simples, vous disposez de votre plateforme de réservation personnalisée
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Cadrage (15-30 min)',
                  description: 'Nous discutons de vos besoins, horaires et règles. Formulaire détaillé pour tout paramétrer.'
                },
                {
                  step: '2',
                  title: 'Installation + paramétrage',
                  description: 'Nous installons et configurons votre plateforme selon vos besoins. Intégration sur votre site si nécessaire.'
                },
                {
                  step: '3',
                  title: 'Formation (30 min) + support',
                  description: 'Mini-formation pour une prise en main rapide. Support humain illimité par la suite.'
                }
              ].map((item) => (
                <Card key={item.step} className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold font-heading shadow-md mb-6">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold font-heading text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Fonctionnalités clés
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tout ce dont vous avez besoin pour gérer vos rendez-vous efficacement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className={`border-border hover:border-primary transition-all duration-500 hover:shadow-lg ${
                    featuresInView 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: featuresInView ? `${index * 80}ms` : '0ms'
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                        <p className="mt-2 text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Espace Agenda */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Pourquoi Espace Agenda ?
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Installation clé en main</h3>
                <p className="text-lg text-muted-foreground">
                  Pas besoin de compétences techniques. Nous installons et configurons tout pour vous. Vous n'avez qu'à vous concentrer sur votre métier, nous nous occupons du reste.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Personnalisé à votre image</h3>
                <p className="text-lg text-muted-foreground">
                  Votre plateforme reflète votre identité professionnelle : logo, couleurs, nom de domaine personnalisé (option). Vos clients ne voient que vous, sans mention d'un outil tiers.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Support humain inclus</h3>
                <p className="text-lg text-muted-foreground">
                  Une question ? Un besoin d'évolution ? Notre équipe est là pour vous accompagner. Support par email et téléphone inclus dans toutes nos offres.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Questions fréquentes
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.slice(0, 6).map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="bg-white border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-heading tracking-tight sm:text-4xl">
              Prêt à simplifier votre gestion ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Discutons de votre pratique et trouvons ensemble la solution la plus adaptée.
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

export default Solution;
