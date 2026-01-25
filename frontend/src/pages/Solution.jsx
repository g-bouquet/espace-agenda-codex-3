import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Globe, Bell, CreditCard, Users, Shield, Settings, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { faqs } from '../mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Solution = () => {
  const { ref: heroRef, inView: heroInView } = useScrollAnimation();
  const { ref: featuresRef, inView: featuresInView } = useScrollAnimation();
  const features = [
    {
      icon: Globe,
      title: 'Site de réservation personnalisé',
      description: 'Votre propre site de prise de rendez-vous aux couleurs de votre marque, accessible 24h/24. Vos clients réservent en quelques clics, en toute autonomie.'
    },
    {
      icon: Calendar,
      title: 'Agenda intelligent',
      description: 'Gérez vos disponibilités en temps réel. Synchronisation automatique de vos rendez-vous et blocage intelligent des créneaux déjà réservés.'
    },
    {
      icon: Bell,
      title: 'Rappels automatiques',
      description: 'Réduisez les absences grâce aux notifications automatiques par email et SMS. Vos clients reçoivent des rappels avant chaque rendez-vous.'
    },
    {
      icon: CreditCard,
      title: 'Paiements en ligne',
      description: 'Acceptez les paiements et acomptes directement lors de la réservation. Transactions sécurisées et suivi automatique des encaissements.'
    },
    {
      icon: Users,
      title: 'Espace client dédié',
      description: 'Chaque client dispose d\'un espace personnel pour consulter son historique, ses prochains rendez-vous et accéder à ses documents.'
    },
    {
      icon: Shield,
      title: 'Données sécurisées',
      description: 'Conformité RGPD garantie, hébergement sécurisé et sauvegarde automatique de toutes vos données professionnelles.'
    },
    {
      icon: Settings,
      title: 'Personnalisation complète',
      description: 'Adaptez la plateforme à vos besoins : durée des consultations, types de services, questionnaires personnalisés et bien plus.'
    },
    {
      icon: BarChart3,
      title: 'Statistiques et suivi',
      description: 'Tableau de bord complet pour suivre votre activité : taux de remplissage, revenus, clients réguliers et analyses détaillées.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div ref={heroRef} className={`mx-auto max-w-3xl text-center transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl font-bold font-heading font-heading tracking-tight text-foreground sm:text-5xl">
              Une solution complète pour{' '}
              <span className="text-primary">gérer vos rendez-vous</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Espace Agenda est bien plus qu'un simple agenda en ligne. C'est une plateforme complète, installée et personnalisée pour vous, qui vous fait gagner un temps précieux au quotidien.
            </p>
            <div className="mt-10">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-white font-medium rounded-sm shadow-md hover:shadow-lg transition-all duration-300">
                  Demander l'installation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Comment ça marche ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Trois étapes simples pour démarrer avec votre nouvelle plateforme
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Échange et personnalisation',
                description: 'Nous discutons de vos besoins et configurons votre plateforme selon votre identité visuelle.'
              },
              {
                step: '2',
                title: 'Installation et formation',
                description: 'Nous installons la solution et vous formons à son utilisation pour une prise en main optimale.'
              },
              {
                step: '3',
                title: 'Accompagnement continu',
                description: 'Vous bénéficiez d\'un support humain et d\'évolutions régulières de votre plateforme.'
              }
            ].map((item) => (
              <Card key={item.step} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-white text-2xl font-bold font-heading mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold font-heading text-foreground">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Ce que vous obtenez
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Une plateforme complète et personnalisée pour votre activité
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                icon: Globe,
                title: 'Site de réservation personnalisé',
                description: 'Votre propre site de prise de rendez-vous aux couleurs de votre marque, accessible 24h/24. Vos clients réservent en quelques clics, en toute autonomie.',
                image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80'
              },
              {
                icon: Calendar,
                title: 'Agenda intelligent',
                description: 'Gérez vos disponibilités en temps réel. Synchronisation automatique de vos rendez-vous et blocage intelligent des créneaux déjà réservés.',
                image: 'https://images.unsplash.com/photo-1649433391719-2e784576d044?w=600&q=80'
              },
              {
                icon: Bell,
                title: 'Rappels automatiques',
                description: 'Réduisez les absences grâce aux notifications automatiques par email et SMS. Vos clients reçoivent des rappels avant chaque rendez-vous.',
                image: 'https://images.unsplash.com/photo-1659428167876-a5a52756f421?w=600&q=80'
              },
              {
                icon: CreditCard,
                title: 'Paiements en ligne',
                description: 'Acceptez les paiements et acomptes directement lors de la réservation. Transactions sécurisées et suivi automatique des encaissements.',
                image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80'
              },
              {
                icon: Users,
                title: 'Espace client dédié',
                description: 'Chaque client dispose d\'un espace personnel pour consulter son historique, ses prochains rendez-vous et accéder à ses documents.',
                image: 'https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?w=600&q=80'
              },
              {
                icon: Shield,
                title: 'Données sécurisées',
                description: 'Conformité RGPD garantie, hébergement sécurisé et sauvegarde automatique de toutes vos données professionnelles.',
                image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=600&q=80'
              },
              {
                icon: Settings,
                title: 'Personnalisation complète',
                description: 'Adaptez la plateforme à vos besoins : durée des consultations, types de services, questionnaires personnalisés et bien plus.',
                image: 'https://images.unsplash.com/photo-1649433391719-2e784576d044?w=600&q=80'
              },
              {
                icon: BarChart3,
                title: 'Statistiques et suivi',
                description: 'Tableau de bord complet pour suivre votre activité : taux de remplissage, revenus, clients réguliers et analyses détaillées.',
                image: 'https://images.unsplash.com/photo-1649433391719-2e784576d044?w=600&q=80'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border hover:border-primary transition-all duration-300 overflow-hidden group">
                  <div className="aspect-video w-full overflow-hidden bg-neutral-100">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                        <p className="mt-2 text-muted-foreground">{feature.description}</p>
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
                <h3 className="text-2xl font-semibold text-foreground mb-4">Personnalisation complète</h3>
                <p className="text-lg text-muted-foreground">
                  Votre plateforme reflète votre identité professionnelle : logo, couleurs, nom de domaine personnalisé. Vos clients ne voient que votre marque, sans aucune mention du fournisseur technique.
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
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="bg-white border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
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
              Prêt à démarrer ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Demandez l'installation de votre plateforme personnalisée et découvrez comment Espace Agenda peut transformer votre gestion des rendez-vous.
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

export default Solution;