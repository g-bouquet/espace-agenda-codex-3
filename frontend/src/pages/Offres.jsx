import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { offers, faqsOffres, globalCTA } from '../content';
import HeroSection from '../components/HeroSection';

const Offres = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const mainOffers = offers.filter(o => !o.isBanner);
  const bannerOffer = offers.find(o => o.isBanner);

  return (
    <div className="min-h-screen">
      <HeroSection
        title="Des offres simples, adaptées à"
        titleHighlight="votre pratique"
        description="Installation guidée, accompagnement humain, support réactif. Tarifs TTC. France."
        backgroundImage="https://images.unsplash.com/photo-1683056242525-9e0e9883a42e?crop=entropy&cs=srgb&fm=jpg&q=85"
        ctaText={globalCTA.primary}
        ctaLink="/contact"
        showCta={true}
      />

      {/* ================================================================
          OFFRES PRINCIPALES
      ================================================================ */}
      <section className="py-20" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <span className="label-tag mb-4 block" style={{ color: '#C27A62' }}>Nos formules</span>
            <h2 className="font-heading font-medium text-4xl sm:text-5xl mb-4" style={{ color: '#2C352D' }}>
              Choisissez votre formule
            </h2>
            <p className="text-lg" style={{ color: '#5E6C60' }}>
              Installation, personnalisation et support humain inclus dans toutes les offres.
            </p>
          </div>

          {/* Toggle mensuel / annuel */}
          <div className="flex flex-col items-center gap-3 mb-14">
            <div className="flex items-center gap-4">
              <span
                className="text-sm font-medium"
                style={{ color: isAnnual ? '#5E6C60' : '#2C352D' }}
              >
                Mensuel
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none"
                style={{ backgroundColor: isAnnual ? '#5A7161' : '#E2DFD8' }}
                aria-label="Basculer entre facturation mensuelle et annuelle"
                data-testid="offres-billing-toggle"
              >
                <span
                  className="inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300"
                  style={{ transform: isAnnual ? 'translateX(24px)' : 'translateX(4px)' }}
                />
              </button>
              <span
                className="text-sm font-medium"
                style={{ color: isAnnual ? '#2C352D' : '#5E6C60' }}
              >
                Annuel
              </span>
            </div>
            <div className="h-6 flex items-center justify-center">
              {isAnnual && (
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(194,122,98,0.12)', color: '#C27A62' }}
                  data-testid="offres-annual-badge"
                >
                  2 mois offerts
                </span>
              )}
            </div>
          </div>

          {/* Grille des 3 offres */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mainOffers.map((offer) => (
              <div
                key={offer.id}
                className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                  offer.highlight ? 'scale-105' : ''
                }`}
                style={{
                  backgroundColor: offer.highlight ? '#5A7161' : '#FFFFFF',
                  border: offer.highlight ? 'none' : '1px solid #E2DFD8',
                  boxShadow: offer.highlight
                    ? '0 16px 40px rgba(90,113,97,0.25)'
                    : '0 2px 8px rgba(90,113,97,0.06)'
                }}
                data-testid={`offer-card-${offer.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {/* Badge "Le plus choisi" */}
                {offer.highlight && offer.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="text-xs font-semibold px-4 py-1 rounded-full"
                      style={{ backgroundColor: '#C27A62', color: '#FFFFFF' }}
                    >
                      {offer.badge}
                    </span>
                  </div>
                )}

                {/* Nom + description */}
                <h3
                  className="font-heading font-medium text-2xl mb-1"
                  style={{ color: offer.highlight ? '#F9F6F0' : '#2C352D' }}
                >
                  {offer.name}
                </h3>
                <p
                  className="text-sm mb-5 leading-relaxed"
                  style={{ color: offer.highlight ? 'rgba(249,246,240,0.75)' : '#5E6C60' }}
                >
                  {offer.description}
                </p>

                {/* Bloc prix */}
                <div className="mb-2 min-h-[72px]">
                  {isAnnual && offer.priceAnnual ? (
                    <div
                      className="text-3xl font-bold font-heading"
                      style={{ color: offer.highlight ? '#F9F6F0' : '#5A7161' }}
                      data-testid={`offer-price-${offer.id}`}
                    >
                      {offer.priceAnnual}
                    </div>
                  ) : (
                    <div
                      className="text-3xl font-bold font-heading"
                      style={{ color: offer.highlight ? '#F9F6F0' : '#5A7161' }}
                      data-testid={`offer-price-${offer.id}`}
                    >
                      {offer.price}
                    </div>
                  )}
                  {offer.installation && (
                    <p
                      className="mt-1 text-xs"
                      style={{ color: offer.highlight ? 'rgba(249,246,240,0.6)' : '#5E6C60' }}
                    >
                      + {offer.installation} (installation, une fois)
                    </p>
                  )}
                  {offer.sms && (
                    <p
                      className="mt-1 text-xs font-medium"
                      style={{ color: offer.highlight ? 'rgba(249,246,240,0.8)' : '#5A7161' }}
                    >
                      {offer.sms}
                    </p>
                  )}
                </div>

                {/* Liste des features */}
                <ul className="space-y-2.5 mb-8 mt-4 flex-1">
                  {offer.features.slice(0, 8).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span
                        className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5"
                        style={{
                          backgroundColor: offer.highlight
                            ? 'rgba(249,246,240,0.2)'
                            : 'rgba(90,113,97,0.12)',
                          color: offer.highlight ? '#F9F6F0' : '#5A7161'
                        }}
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: offer.highlight ? 'rgba(249,246,240,0.9)' : '#5E6C60' }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                  {offer.features.length > 8 && (
                    <li
                      className="text-sm font-medium"
                      style={{ color: offer.highlight ? 'rgba(249,246,240,0.8)' : '#5A7161' }}
                    >
                      + {offer.features.length - 8} autres fonctionnalités incluses
                    </li>
                  )}
                </ul>

                {/* CTA */}
                <Link to="/contact">
                  <button
                    className="w-full py-3 rounded-full text-sm font-semibold transition-all duration-200"
                    style={{
                      backgroundColor: offer.highlight ? '#F9F6F0' : '#5A7161',
                      color: offer.highlight ? '#2C352D' : '#FFFFFF'
                    }}
                    data-testid={`offer-cta-${offer.id}`}
                  >
                    {globalCTA.primary} →
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Bandeau Sur mesure */}
          {bannerOffer && (
            <div
              className="mt-12 rounded-3xl p-8"
              style={{ backgroundColor: '#F4F0E8', border: '1px solid #E2DFD8' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div>
                  <span className="label-tag mb-2 block" style={{ color: '#C27A62' }}>Sur mesure</span>
                  <h3 className="font-heading font-medium text-2xl mb-2" style={{ color: '#2C352D' }}>
                    {bannerOffer.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#5E6C60' }}>{bannerOffer.description}</p>
                  <p className="font-heading font-medium text-2xl" style={{ color: '#5A7161' }}>
                    {bannerOffer.price}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bannerOffer.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div
                          className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5"
                          style={{ backgroundColor: 'rgba(90,113,97,0.12)', color: '#5A7161' }}
                        >
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm" style={{ color: '#5E6C60' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link to="/contact?subject=sur-mesure">
                      <button
                        className="py-3 px-8 rounded-full text-sm font-semibold transition-all duration-200"
                        style={{ backgroundColor: '#5A7161', color: '#FFFFFF' }}
                        data-testid="offer-sur-mesure-cta"
                      >
                        Décrire mon besoin →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mention bas de section */}
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-sm" style={{ color: '#5E6C60' }}>
              Toutes nos offres incluent l'installation, la personnalisation complète, la formation et le support technique.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          TABLEAU COMPARATIF
      ================================================================ */}
      <section className="py-20" style={{ backgroundColor: '#F4F0E8' }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="label-tag mb-4 block" style={{ color: '#C27A62' }}>Détail</span>
            <h2 className="font-heading font-medium text-4xl sm:text-5xl" style={{ color: '#2C352D' }}>
              Comparatif complet
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-2xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(90,113,97,0.06)' }}>
              <thead>
                <tr>
                  <th className="text-left py-4 px-5 text-sm font-medium" style={{ backgroundColor: '#F4F0E8', color: '#5E6C60', width: '40%' }}></th>
                  <th className="text-center py-4 px-4 text-sm font-semibold" style={{ backgroundColor: '#F4F0E8', color: '#2C352D' }}>Essentiel</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold" style={{ backgroundColor: 'rgba(90,113,97,0.08)', color: '#2C352D' }}>Pro</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold" style={{ backgroundColor: '#F4F0E8', color: '#2C352D' }}>Intégral</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Page de réservation personnalisée', ess: true, pro: true, prem: true },
                  { label: 'Sous-domaine personnalisé', ess: false, pro: true, prem: true },
                  { label: 'Rappels email + WhatsApp', ess: true, pro: true, prem: true },
                  { label: 'Rappels SMS', ess: 'Option 0,09€/SMS', pro: '50 inclus', prem: '100 inclus' },
                  { label: 'Espace client', ess: true, pro: true, prem: true },
                  { label: 'Facturation intégrée', ess: true, pro: true, prem: true },
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
                  <tr
                    key={index}
                    style={{
                      borderBottom: '1px solid #E2DFD8',
                      backgroundColor: index % 2 === 0 ? '#FFFFFF' : 'rgba(249,246,240,0.5)'
                    }}
                  >
                    <td className="py-3.5 px-5 text-sm font-medium" style={{ color: '#2C352D' }}>{row.label}</td>
                    <td className="py-3.5 px-4 text-center">
                      {row.ess === true
                        ? <svg className="h-5 w-5 mx-auto" fill="none" stroke="#5A7161" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        : row.ess === false
                        ? <svg className="h-5 w-5 mx-auto" fill="none" stroke="#D1CFC9" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        : <span className="text-xs" style={{ color: '#5E6C60' }}>{row.ess}</span>}
                    </td>
                    <td className="py-3.5 px-4 text-center" style={{ backgroundColor: 'rgba(90,113,97,0.05)' }}>
                      {row.pro === true
                        ? <svg className="h-5 w-5 mx-auto" fill="none" stroke="#5A7161" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        : row.pro === false
                        ? <svg className="h-5 w-5 mx-auto" fill="none" stroke="#D1CFC9" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        : <span className="text-xs" style={{ color: '#5E6C60' }}>{row.pro}</span>}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.prem === true
                        ? <svg className="h-5 w-5 mx-auto" fill="none" stroke="#5A7161" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        : row.prem === false
                        ? <svg className="h-5 w-5 mx-auto" fill="none" stroke="#D1CFC9" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        : <span className="text-xs" style={{ color: '#5E6C60' }}>{row.prem}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================================================================
          FAQ
      ================================================================ */}
      <section className="py-20" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="label-tag mb-4 block" style={{ color: '#C27A62' }}>Questions</span>
            <h2 className="font-heading font-medium text-4xl sm:text-5xl" style={{ color: '#2C352D' }}>
              Questions fréquentes
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqsOffres.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="rounded-2xl px-6"
                style={{ backgroundColor: '#F4F0E8', border: '1px solid #E2DFD8' }}
              >
                <AccordionTrigger
                  className="text-left font-semibold py-5 hover:no-underline"
                  style={{ color: '#2C352D' }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 leading-relaxed" style={{ color: '#5E6C60' }}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center">
            <p className="text-sm mb-4" style={{ color: '#5E6C60' }}>
              Une question spécifique à votre pratique ?
            </p>
            <Link to="/contact">
              <button
                className="py-3 px-8 rounded-full text-sm font-semibold"
                style={{ backgroundColor: '#5A7161', color: '#FFFFFF' }}
                data-testid="offres-faq-contact-cta"
              >
                Posez-la nous directement →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA FINAL
      ================================================================ */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#2C352D' }}>
        <div className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(90,113,97,0.6) 0%, transparent 60%)' }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading font-medium text-4xl sm:text-5xl mb-6" style={{ color: '#F9F6F0' }}>
              Vous hésitez entre deux offres ?
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(249,246,240,0.75)' }}>
              Échangeons 20 minutes. Vous nous décrivez votre pratique, nous vous conseillons la formule la plus adaptée — sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-full font-medium px-8"
                  style={{ backgroundColor: '#F9F6F0', color: '#2C352D' }}
                  data-testid="offres-final-cta"
                >
                  {globalCTA.primary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/solution">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8"
                  style={{ borderColor: 'rgba(249,246,240,0.3)', color: '#F9F6F0' }}
                >
                  Voir la solution
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
