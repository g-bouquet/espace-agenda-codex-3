import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import HeroSection from '../components/HeroSection';
import { globalCTA, professionsGrouped, faqsExemples } from '../content';

const Exemples = () => {

  const demos = [
    {
      id: 'therapist',
      label: 'Thérapeute & accompagnement',
      title: 'Harmonie Thérapie',
      description: 'Page de réservation pour une thérapeute proposant hypnose thérapeutique et accompagnement. Présentation des services, réservation en ligne, personnalisation complète à son identité.',
      url: 'https://harmonietherapeute.wlbookings.com/',
      urlDisplay: 'harmonietherapeute.wlbookings.com',
      image: '/harmonietherapeute.jpg',
      imageAlt: 'Interface de réservation Harmonie Thérapie sur tablette — service Hypnose thérapeutique à 90€',
      tags: ['Psychologie & accompagnement', 'Mini-site dédié', 'Rappels automatiques']
    },
    {
      id: 'osteo',
      label: 'Ostéopathie & thérapies manuelles',
      title: 'CalmeOstéo',
      description: "Page de réservation pour un cabinet d'ostéopathie. Plusieurs types de consultations, disponibilités flexibles, interface claire pour les patients de tous âges.",
      url: 'https://calmeosteo.wlbookings.com',
      urlDisplay: 'calmeosteo.wlbookings.com',
      image: '/calmeosteo.jpg',
      imageAlt: 'Interface de réservation CalmeOstéo sur tablette — liste des prestations avec tarifs',
      tags: ['Corps & thérapies manuelles', 'Mini-site dédié', 'Multi-types de consultations']
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        title="Voyez ce que vos clients"
        titleHighlight="verront en réservant"
        description="Deux exemples réels de pages de réservation — testez-les comme si vous étiez un patient."
        ctaText={globalCTA.primary}
        backgroundImage="https://images.unsplash.com/photo-1544027993-37dbfe43562a?crop=entropy&cs=srgb&fm=jpg&q=85"
        ctaLink="/contact"
        showCta={true}
      />

      {/* ================================================================
          DÉMOS — deux exemples réels avec captures
      ================================================================ */}
      <section className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="label-tag mb-4 block" style={{ color: '#9E7E4A' }}>Exemples réels</span>
            <h2 className="font-heading font-medium text-4xl sm:text-5xl mb-4" style={{ color: '#2C352D' }}>
              Des pages de réservation<br />prêtes à l'emploi
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#5E6C60' }}>
              Ces deux démos sont des pages réelles — cliquez sur le bouton pour les parcourir comme le ferait un de vos clients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {demos.map((demo) => (
              <div
                key={demo.id}
                className="rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1px solid #E2DFD8', boxShadow: '0 2px 8px rgba(90,113,97,0.06)' }}
                data-testid={`demo-card-${demo.id}`}
              >
                {/* Capture d'écran réelle */}
                <div className="w-full overflow-hidden" style={{ height: '260px', backgroundColor: '#F4F0E8' }}>
                  <img
                    src={demo.image}
                    alt={demo.imageAlt}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Contenu */}
                <div className="p-8">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4"
                    style={{ backgroundColor: 'rgba(158,126,74,0.10)', color: '#9E7E4A' }}
                  >
                    {demo.label}
                  </span>

                  <h3 className="font-heading font-medium text-2xl mb-2" style={{ color: '#2C352D' }}>
                    {demo.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#5E6C60' }}>
                    {demo.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {demo.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: 'rgba(90,113,97,0.08)',
                          color: '#5A7161',
                          border: '1px solid rgba(90,113,97,0.15)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-sm rounded-full px-6 py-3 transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: '#5A7161', color: '#FFFFFF' }}
                    data-testid={`demo-link-${demo.id}`}
                  >
                    Voir la démo en ligne
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA démo personnalisée */}
          <div className="mt-16 text-center">
            <p className="mb-4" style={{ color: '#5E6C60' }}>
              Vous voulez voir à quoi ressemblerait votre page à vous ?
            </p>
            <Link to="/contact">
              <button
                className="inline-flex items-center gap-2 font-semibold text-sm rounded-full px-8 py-3 transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#5A7161', color: '#FFFFFF' }}
                data-testid="exemples-demo-cta"
              >
                Demander une démo à mon nom
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROFESSIONS — grille harmonisée 3+2
          Ligne 1 : 3 colonnes / Ligne 2 : 2 colonnes centrées
      ================================================================ */}
      <section className="py-24" style={{ backgroundColor: '#F4F0E8' }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="label-tag mb-3 block" style={{ color: '#9E7E4A' }}>Professions concernées</span>
            <h2 className="font-heading font-medium text-4xl sm:text-5xl mb-4" style={{ color: '#2C352D' }}>
              Et bien d'autres professions
            </h2>
            <p className="text-lg" style={{ color: '#5E6C60' }}>
              Espace Agenda s'adapte à votre pratique, quelle qu'elle soit
            </p>
          </div>

          {/* Ligne 1 : 3 premières catégories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {professionsGrouped.slice(0, 3).map((group, gi) => (
              <div
                key={gi}
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2DFD8' }}
              >
                <p className="label-tag mb-4" style={{ color: '#9E7E4A' }}>{group.category}</p>
                <ul className="space-y-2">
                  {group.professions.map((prof, pi) => (
                    <li key={pi} className="flex items-center gap-2 text-sm" style={{ color: '#2C352D' }}>
                      <span
                        className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: '#5A7161' }}
                      />
                      {prof}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Ligne 2 : 2 dernières catégories, centrées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {professionsGrouped.slice(3).map((group, gi) => (
              <div
                key={gi}
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2DFD8' }}
              >
                <p className="label-tag mb-4" style={{ color: '#9E7E4A' }}>{group.category}</p>
                <ul className="space-y-2">
                  {group.professions.map((prof, pi) => (
                    <li key={pi} className="flex items-center gap-2 text-sm" style={{ color: '#2C352D' }}>
                      <span
                        className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: '#5A7161' }}
                      />
                      {prof}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="mb-5" style={{ color: '#5E6C60' }}>
              Votre métier n'est pas dans la liste ? Aucun problème !
            </p>
            <Link to="/contact">
              <button
                className="inline-flex items-center gap-2 font-semibold text-sm rounded-full px-8 py-3 transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#5A7161', color: '#FFFFFF' }}
                data-testid="exemples-profession-cta"
              >
                Discuter de mon cas
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          FAQ
      ================================================================ */}
      <section className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="label-tag mb-4 block" style={{ color: '#9E7E4A' }}>Questions</span>
            <h2 className="font-heading font-medium text-4xl sm:text-5xl mb-4" style={{ color: '#2C352D' }}>
              Questions fréquentes
            </h2>
            <p className="text-lg" style={{ color: '#5E6C60' }}>
              Tout ce que vous voulez savoir sur la compatibilité avec votre métier
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqsExemples.map((faq) => (
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
        </div>
      </section>

      {/* ================================================================
          CTA FINAL
      ================================================================ */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#2C352D' }}>
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(90,113,97,0.6) 0%, transparent 60%)' }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading font-medium text-4xl sm:text-5xl mb-6" style={{ color: '#F9F6F0' }}>
              Prêt à créer votre page<br />de réservation ?
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(249,246,240,0.75)' }}>
              Installation, personnalisation, formation — nous gérons tout. Vous n'avez qu'à accueillir vos clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-full font-medium px-8"
                  style={{ backgroundColor: '#F9F6F0', color: '#2C352D' }}
                  data-testid="exemples-final-cta"
                >
                  {globalCTA.primary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/offres">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8"
                  style={{ borderColor: 'rgba(249,246,240,0.3)', color: '#F9F6F0' }}
                >
                  Voir les offres
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
