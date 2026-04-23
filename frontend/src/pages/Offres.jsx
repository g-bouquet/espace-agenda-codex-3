import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { offers, faqsOffres, globalCTA } from '../content';
import HeroSection from '../components/HeroSection';

const Offres = () => {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Des offres simples, adaptées à"
        titleHighlight="votre pratique"
        description="Installation guidée, accompagnement humain, support réactif. Tarifs TTC. France."
        backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80"
        ctaText={globalCTA.primary}
        ctaLink="/contact"
        showCta={true}
      />

      {/* Offres principales */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl mb-4">
              Nos offres
            </h2>
            <p className="text-lg text-gray-700">
              Choisissez la formule adaptée à votre activité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {offers.filter(o => !o.isBanner).map((offer) => (
              <Card 
                key={offer.id} 
                className={`relative border-2 hover:shadow-xl transition-all duration-300 ${
                  offer.highlight 
                    ? 'border-primary shadow-lg scale-105' 
                    : 'border-border'
                }`}
              >
                {offer.highlight && offer.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white px-6 py-1 text-sm">
                      {offer.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="flex-grow">
                  <h3 className="text-2xl font-bold font-heading text-foreground">{offer.name}</h3>
                  <p className="mt-2 text-gray-700 text-sm">{offer.description}</p>
                  <div className="mt-6">
                    <span className="text-3xl font-bold font-heading text-foreground">{offer.price}</span>
                    {offer.installation && (
                      <p className="mt-2 text-sm text-gray-600">Installation : {offer.installation}</p>
                    )}
                    {offer.sms && (
                      <p className="mt-1 text-xs text-gray-600">{offer.sms}</p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {offer.features.slice(0, 8).map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                    {offer.features.length > 8 && (
                      <li className="text-sm text-primary font-medium">
                        + {offer.features.length - 8} autres fonctionnalités
                      </li>
                    )}
                  </ul>

                  <Link to="/contact">
                    <Button 
                      className={`w-full ${
                        offer.highlight
                          ? 'bg-primary hover:bg-primary-hover text-white'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                      }`}
                    >
                      {globalCTA.primary}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sur mesure en bandeau */}
          {offers.filter(o => o.isBanner).map((offer) => (
            <Card key={offer.id} className="mt-12 border-2 border-primary bg-gradient-to-r from-[#F4F0E8] to-[#F9F6F0]">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-foreground mb-2">{offer.name}</h3>
                    <p className="text-gray-700 text-sm mb-4">{offer.description}</p>
                    <p className="text-2xl font-bold text-primary">{offer.price}</p>
                  </div>
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-2 gap-3">
                      {offer.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link to="/contact?subject=sur-mesure">
                        <Button className="bg-primary hover:bg-primary-hover text-white">
                          Décrire mon besoin
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Additional info */}
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-gray-700">
              Toutes nos offres incluent l'installation, la personnalisation complète, la formation et le support technique.
            </p>
          </div>
        </div>
      </section>

      {/* Tableau comparatif */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Comparatif détaillé
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground"></th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">Essentiel</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground bg-primary/5">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">Prime</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Page de réservation personnalisée', ess: true, pro: true, prem: true },
                  { label: 'Sous-domaine personnalisé', ess: false, pro: true, prem: true },
                  { label: 'Rappels email + WhatsApp', ess: true, pro: true, prem: true },
                  { label: 'Rappels SMS', ess: 'Option 0,09€/SMS', pro: '50 inclus', prem: '50 inclus' },
                  { label: 'Espace client', ess: true, pro: true, prem: true },
                  { label: 'Facturation', ess: true, pro: true, prem: true },
                  { label: 'Calendrier + sync (Google, Outlook, Apple)', ess: true, pro: true, prem: true },
                  { label: 'Paiements & acomptes en ligne', ess: false, pro: true, prem: true },
                  { label: 'Fiche client personnalisée', ess: false, pro: true, prem: true },
                  { label: 'Notes internes', ess: false, pro: true, prem: true },
                  { label: 'Évaluations et avis', ess: false, pro: true, prem: true },
                  { label: 'RDV récurrents', ess: false, pro: true, prem: true },
                  { label: 'Réservations de groupe', ess: false, pro: true, prem: true },
                  { label: 'Coupons', ess: false, pro: true, prem: true },
                  { label: 'Google Analytics / Tag Manager', ess: false, pro: true, prem: true },
                  { label: 'Chatbot', ess: false, pro: false, prem: true },
                  { label: 'Gestion de ressources', ess: false, pro: false, prem: true },
                  { label: 'Bundles', ess: false, pro: false, prem: true },
                  { label: 'Plusieurs emplacements', ess: false, pro: false, prem: true },
                  { label: 'API / Zapier / Webhooks', ess: false, pro: false, prem: true },
                  { label: 'Support', ess: 'Standard', pro: 'Renforcé', prem: 'Prioritaire' },
                  { label: 'Support téléphonique', ess: false, pro: true, prem: true }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-border hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{row.label}</td>
                    <td className="py-4 px-4 text-center">
                      {row.ess === true ? <Check className="h-5 w-5 text-primary mx-auto" /> : row.ess === false ? <X className="h-5 w-5 text-gray-300 mx-auto" /> : <span className="text-xs text-gray-600">{row.ess}</span>}
                    </td>
                    <td className="py-4 px-4 text-center bg-primary/5">
                      {row.pro === true ? <Check className="h-5 w-5 text-primary mx-auto" /> : row.pro === false ? <X className="h-5 w-5 text-gray-300 mx-auto" /> : <span className="text-xs text-gray-600">{row.pro}</span>}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.prem === true ? <Check className="h-5 w-5 text-primary mx-auto" /> : row.prem === false ? <X className="h-5 w-5 text-gray-300 mx-auto" /> : <span className="text-xs text-gray-600">{row.prem}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Questions fréquentes
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqsOffres.map((faq) => (
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

      {/* CTA final */}
      <section className="py-20 bg-secondary text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-heading tracking-tight sm:text-4xl">
              Prêt à choisir votre offre ?
            </h2>
            <p className="mt-6 text-lg leading-8" style={{ color: 'rgba(249,246,240,0.75)' }}>
              Discutons de vos besoins pour vous guider vers l'offre la plus adaptée.
            </p>
            <div className="mt-10">
              <Link to="/contact">
                <Button size="lg" className="rounded-full font-medium px-8" style={{ backgroundColor: '#F9F6F0', color: '#2C352D' }}>
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

export default Offres;
