import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { offers, faqsOffres } from '../mock';
import HeroSection from '../components/HeroSection';

const Offres = () => {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Des offres simples, adaptées à"
        titleHighlight="votre pratique"
        description="On installe, on configure, puis on vous accompagne. Tarifs TTC. France."
        backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80"
        ctaText="Planifier un échange (15 min)"
        ctaLink="/contact"
        showCta={true}
      />

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4 max-w-6xl mx-auto">
            {offers.map((offer) => (
              <Card 
                key={offer.id} 
                className={`relative border-border flex flex-col ${
                  offer.highlight ? 'border-primary border-2 shadow-lg' : ''
                } ${offer.isCustom ? 'lg:col-span-2 xl:col-span-1' : ''}`}
              >
                {offer.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white px-6 py-1 text-sm">
                      Recommandé
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="flex-grow">
                  <h3 className="text-2xl font-bold font-heading text-foreground">{offer.name}</h3>
                  <p className="mt-2 text-muted-foreground text-sm">{offer.description}</p>
                  <div className="mt-6">
                    <span className="text-3xl font-bold font-heading text-foreground">{offer.price}</span>
                    {offer.installation && (
                      <p className="mt-2 text-sm text-muted-foreground">Installation : {offer.installation}</p>
                    )}
                    {offer.sms && (
                      <p className="mt-1 text-xs text-muted-foreground">{offer.sms}</p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {offer.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={offer.isCustom ? "/contact?subject=sur-mesure" : "/contact"}>
                    <Button 
                      className={`w-full ${
                        offer.highlight
                          ? 'bg-primary hover:bg-primary-hover text-white'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                      }`}
                    >
                      {offer.isCustom ? 'Décrire mon besoin' : 'Planifier un échange (15 min)'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional info */}
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              Toutes nos offres incluent l'installation, la personnalisation complète, la formation et le support technique.
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
                title: 'Nom de domaine personnalisé (option)',
                description: 'Mise en place + maintenance de votre nom de domaine (ex: reservation.votrecabinet.fr)'
              },
              {
                title: 'SMS supplémentaires',
                description: '0,09€ / SMS (activation/désactivation possible selon l\'offre)'
              },
              {
                title: 'Intégration sur votre site',
                description: 'Lien, bouton ou intégration complète : on vous conseille la solution la plus simple'
              },
              {
                title: 'Cabinet / multi-praticiens',
                description: 'Configuration multi-praticiens avec réglages avancés (sur devis)'
              }
            ].map((option, index) => (
              <Card key={index} className="border-border">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{option.title}</h3>
                  <p className="text-muted-foreground text-sm">{option.description}</p>
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

      {/* Tableau comparatif */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Comparatif rapide
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground"></th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">Essentiel</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground bg-primary/5">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Rappels email', ess: true, pro: true, prem: true },
                  { label: 'Rappels SMS', ess: false, pro: '0,09€/SMS', prem: '0,09€/SMS' },
                  { label: 'Paiements & acomptes', ess: false, pro: true, prem: true },
                  { label: 'Fiche client & notes', ess: false, pro: true, prem: true },
                  { label: 'Support prioritaire', ess: false, pro: false, prem: true }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-4 px-4 text-foreground font-medium">{row.label}</td>
                    <td className="py-4 px-4 text-center">
                      {row.ess === true ? <Check className="h-5 w-5 text-primary mx-auto" /> : row.ess === false ? '—' : <span className="text-xs text-muted-foreground">{row.ess}</span>}
                    </td>
                    <td className="py-4 px-4 text-center bg-primary/5">
                      {row.pro === true ? <Check className="h-5 w-5 text-primary mx-auto" /> : row.pro === false ? '—' : <span className="text-xs text-muted-foreground">{row.pro}</span>}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.prem === true ? <Check className="h-5 w-5 text-primary mx-auto" /> : row.prem === false ? '—' : <span className="text-xs text-muted-foreground">{row.prem}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Offres */}
      <section className="py-20 bg-muted">
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
              Une question sur nos offres ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Notre équipe est à votre disposition pour vous conseiller et vous aider à choisir la formule la plus adaptée.
            </p>
            <div className="mt-10">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-sky-900 hover:bg-neutral-100">
                  Planifier un échange (15 min)
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
