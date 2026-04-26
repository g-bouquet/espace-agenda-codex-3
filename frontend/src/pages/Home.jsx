import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Zap, Check, Smartphone, Calendar, Leaf, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useInView } from 'react-intersection-observer';
import { heroHome, whatYouGet, professionsGrouped, offers, howItWorks, faqs, globalCTA } from '../content';

// Images wellness sélectionnées
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1773858375548-3919c0fe1ca0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920',
  benefitOne: 'https://images.pexels.com/photos/36729385/pexels-photo-36729385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  benefitTwo: 'https://images.unsplash.com/photo-1683056242525-9e0e9883a42e?crop=entropy&cs=srgb&fm=jpg&q=85',
  benefitThree: 'https://images.unsplash.com/photo-1765447041709-9f1efbc81606?crop=entropy&cs=srgb&fm=jpg&q=85',
  sideClient: 'https://images.unsplash.com/photo-1456426531648-850ec2f5a462?crop=entropy&cs=srgb&fm=jpg&q=85',
  sidePractitioner: 'https://images.pexels.com/photos/3958426/pexels-photo-3958426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  divider: 'https://images.pexels.com/photos/29347337/pexels-photo-29347337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
};

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isAnnualHome, setIsAnnualHome] = useState(false);

  const { ref: benefitsRef, inView: benefitsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: audienceRef, inView: audienceInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: processRef, inView: processInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: pricingRef, inView: pricingInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F6F0' }}>

      {/* ================================================================
          HERO SECTION — forêt, lumière douce, palette sable chaud
      ================================================================ */}
      <section className="relative overflow-hidden min-h-[660px] lg:min-h-[760px] flex items-center">
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.28}px)`, transition: 'transform 0.1s linear' }}
        >
          <img
            src={IMAGES.hero}
            alt=""
            className="w-full h-[120%] object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(120deg, rgba(249,246,240,0.96) 0%, rgba(244,240,232,0.90) 55%, rgba(249,246,240,0.70) 100%)'
          }} />
        </div>

        {/* Organic accent shape */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-10 blur-3xl hidden lg:block"
          style={{ background: '#5A7161' }} />

        <div className="relative z-10 py-24 lg:py-36 w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div
              ref={heroRef}
              className={`max-w-2xl lg:max-w-3xl transition-all duration-1000 ease-out ${
                heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="h-4 w-4" style={{ color: '#5A7161' }} />
                <span className="label-tag" style={{ color: '#5A7161' }}>
                  Réservation en ligne pour praticiens
                </span>
              </div>
              <h1 className="font-heading font-medium mb-6"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', lineHeight: '1.08', color: '#2C352D' }}>
                {heroHome.h1.split(':')[0]}
                <br />
                <em className="not-italic" style={{ color: '#5A7161' }}>
                  {heroHome.h1.split(':')[1]}
                </em>
              </h1>
              <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: '#5E6C60' }}>
                {heroHome.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="rounded-full text-white font-medium px-8"
                    style={{ backgroundColor: '#5A7161' }}
                    data-testid="home-hero-primary-cta"
                  >
                    {heroHome.ctaPrimary}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to={heroHome.ctaSecondaryLink}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 font-medium"
                    style={{ borderColor: '#E2DFD8', color: '#2C352D' }}
                  >
                    {heroHome.ctaSecondary}
                  </Button>
                </Link>
              </div>
              <p className="mt-5 text-sm" style={{ color: '#5E6C60' }}>
                Installation en 7 jours · Facturation incluse dès 29€/mois · Aucun engagement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          BÉNÉFICES — 3 cartes avec images wellness
      ================================================================ */}
      <section className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-medium text-4xl sm:text-5xl mb-4" style={{ color: '#2C352D' }}>
              Pourquoi les praticiens choisissent<br />
              <em className="not-italic" style={{ color: '#5A7161' }}>Espace Agenda</em>
            </h2>
          </div>

          <div ref={benefitsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Moins de gestion, plus de présence',
                description: 'Vos clients réservent en ligne quand ils le souhaitent et reçoivent des rappels automatiques. Vous consacrez votre énergie à l\'essentiel.',
                image: IMAGES.benefitOne,
                delay: 0
              },
              {
                icon: Shield,
                title: 'À votre nom, à votre image',
                description: 'Votre logo, vos couleurs, votre domaine. Vos clients ne voient que vous — aucune mention d\'un outil tiers.',
                image: IMAGES.benefitTwo,
                delay: 120
              },
              {
                icon: Zap,
                title: 'Clé en main, vraiment',
                description: 'Vous ne passez pas vos soirées à configurer. Nous installons, paramétrons et mettons en ligne. Vous n\'avez qu\'à accueillir.',
                image: IMAGES.benefitThree,
                delay: 240
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className={`group overflow-hidden rounded-3xl border transition-all duration-700 ${
                    benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: `${benefit.delay}ms`,
                    borderColor: '#E2DFD8',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(90,113,97,0.06)'
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden img-hover-zoom rounded-t-3xl">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full mb-5 transition-colors duration-300 group-hover:scale-110"
                      style={{ backgroundColor: 'rgba(90,113,97,0.1)', color: '#5A7161' }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading font-medium text-2xl mb-3" style={{ color: '#2C352D' }}>
                      {benefit.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: '#5E6C60' }}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          TÉMOIGNAGE — preuve sociale praticien
      ================================================================ */}
      <section className="py-16" style={{ backgroundColor: '#F4F0E8' }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div
            className="rounded-3xl p-10 relative"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2DFD8', boxShadow: '0 2px 8px rgba(90,113,97,0.06)' }}
          >
            <div
              className="absolute -top-4 left-10 h-8 w-8 flex items-center justify-center rounded-full"
              style={{ backgroundColor: '#5A7161' }}
            >
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <blockquote className="font-heading font-medium text-xl sm:text-2xl leading-relaxed mb-6" style={{ color: '#2C352D' }}>
              "Gain de temps réel au quotidien. La facturation intégrée et les paiements en ligne à l'avance ont changé ma façon de travailler. La flexibilité pour créer mes types de séances et gérer mon planning est exactement ce dont j'avais besoin."
            </blockquote>
            <div className="flex items-center gap-4">
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center font-heading font-medium text-lg text-white flex-shrink-0"
                style={{ backgroundColor: '#5A7161' }}
              >
                G
              </div>
              <div>
                <p className="font-semibold" style={{ color: '#2C352D' }}>Guillaume</p>
                <p className="text-sm" style={{ color: '#5E6C60' }}>Psychopraticien · Gironde</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SÉPARATEUR NATURE — bande paysage immersive
      ================================================================ */}
      <div className="relative h-64 overflow-hidden" style={{ margin: '0' }}>
        <img
          src={IMAGES.divider}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 50%', filter: 'saturate(0.8) brightness(0.85)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'rgba(249,246,240,0.55)' }}>
          <div className="text-center px-6">
            <p className="font-heading text-2xl sm:text-3xl font-medium" style={{ color: '#2C352D' }}>
              "Moins de gestion, plus de présence."
            </p>
          </div>
        </div>
      </div>

      {/* ================================================================
          POUR QUI — audiences
      ================================================================ */}
      <section className="py-24" style={{ backgroundColor: '#F4F0E8' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div ref={audienceRef} className={`transition-all duration-700 ${audienceInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <span className="label-tag mb-4 block" style={{ color: '#9E7E4A' }}>Pour qui ?</span>
              <h2 className="font-heading font-medium text-4xl sm:text-5xl mb-6" style={{ color: '#2C352D' }}>
                Fait pour les praticiens<br />de l'accompagnement
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: '#5E6C60' }}>
                Particulièrement adapté aux professions du soin, du bien-être et de l'accompagnement humain :
              </p>
              <div className="space-y-6">
                {professionsGrouped.map((group, gi) => (
                  <div key={gi}>
                    <p className="label-tag mb-3" style={{ color: '#9E7E4A' }}>{group.category}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.professions.map((p, pi) => (
                        <span key={pi} className="text-sm px-3 py-1 rounded-full font-medium"
                          style={{ backgroundColor: 'rgba(90,113,97,0.08)', color: '#2C352D', border: '1px solid rgba(90,113,97,0.15)' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl p-10" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2DFD8', boxShadow: '0 8px 24px rgba(90,113,97,0.10)' }}>
                <h3 className="font-heading font-medium text-2xl mb-6" style={{ color: '#2C352D' }}>
                  Ce que vous obtenez
                </h3>
                <ul className="space-y-4">
                  {whatYouGet.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: 'rgba(90,113,97,0.12)', color: '#5A7161' }}>
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="leading-snug" style={{ color: '#2C352D' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/exemples" className="inline-flex items-center gap-2 mt-5 font-medium transition-colors text-sm" style={{ color: '#5A7161' }}>
                Voir tous les métiers concernés <ArrowRight className="h-4 w-4" />
              </Link>
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 blur-xl"
                style={{ backgroundColor: '#9E7E4A' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CÔTÉ CLIENT & PRATICIEN — deux colonnes avec images
      ================================================================ */}
      <section className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
          {/* Côté client */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="label-tag mb-4 block" style={{ color: '#9E7E4A' }}>Pour vos clients</span>
              <h2 className="font-heading font-medium text-4xl sm:text-5xl mb-6" style={{ color: '#2C352D' }}>
                Une réservation simple<br />et rassurante
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: '#5E6C60' }}>
                Vos clients choisissent un créneau en quelques secondes. Ils reçoivent une confirmation et des rappels (email, SMS selon l'offre).
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Smartphone, text: 'Mobile et ordinateur, sans application à installer' },
                  { icon: Shield, text: 'Messages et pages à votre nom uniquement' },
                  { icon: Calendar, text: 'Annuler ou déplacer facilement, en autonomie' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: 'rgba(90,113,97,0.10)', color: '#5A7161' }}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium" style={{ color: '#2C352D' }}>{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden img-hover-zoom shadow-warm-lg">
              <img
                src={IMAGES.sideClient}
                alt="Client en séance de bien-être"
                className="w-full h-80 lg:h-96 object-cover"
              />
            </div>
          </div>

          {/* Côté praticien */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 rounded-3xl overflow-hidden img-hover-zoom shadow-warm-lg">
              <img
                src={IMAGES.sidePractitioner}
                alt="Praticienne en consultation"
                className="w-full h-80 lg:h-96 object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="label-tag mb-4 block" style={{ color: '#9E7E4A' }}>Pour vous</span>
              <h2 className="font-heading font-medium text-4xl sm:text-5xl mb-6" style={{ color: '#2C352D' }}>
                Tout est cadré,<br />vous gardez la main
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: '#5E6C60' }}>
                Vous gérez vos règles : durées, motifs, indisponibilités, acomptes et notes internes (selon l'offre).
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Calendar, text: 'Agenda et disponibilités en temps réel' },
                  { icon: Shield, text: 'Historique client complet et confidentiel' },
                  { icon: Check, text: 'Rappels et paiements automatisés (selon l\'offre)' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: 'rgba(90,113,97,0.10)', color: '#5A7161' }}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium" style={{ color: '#2C352D' }}>{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          OFFRES APERÇU
      ================================================================ */}
      <section className="py-24" style={{ backgroundColor: '#F4F0E8' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="label-tag mb-4 block" style={{ color: '#9E7E4A' }}>Nos formules</span>
            <h2 className="font-heading font-medium text-4xl sm:text-5xl mb-4" style={{ color: '#2C352D' }}>
              À partir de 29€ / mois TTC
            </h2>
          </div>

          {/* Toggle mensuel / annuel */}
          <div className="flex flex-col items-center gap-3 mb-12">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium" style={{ color: isAnnualHome ? '#5E6C60' : '#2C352D' }}>
                Mensuel
              </span>
              <button
                onClick={() => setIsAnnualHome(!isAnnualHome)}
                className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none"
                style={{ backgroundColor: isAnnualHome ? '#5A7161' : '#E2DFD8' }}
                aria-label="Basculer entre facturation mensuelle et annuelle"
                data-testid="home-billing-toggle"
              >
                <span
                  className="inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300"
                  style={{ transform: isAnnualHome ? 'translateX(24px)' : 'translateX(4px)' }}
                />
              </button>
              <span className="text-sm font-medium" style={{ color: isAnnualHome ? '#2C352D' : '#5E6C60' }}>
                Annuel
              </span>
            </div>
            <div className="h-6 flex items-center justify-center">
              {isAnnualHome && (
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(158,126,74,0.12)', color: '#9E7E4A' }}
                  data-testid="home-annual-badge"
                >
                  2 mois offerts
                </span>
              )}
            </div>
          </div>

          <div ref={pricingRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {offers.slice(0, 3).map((offer, index) => (
              <div
                key={offer.id}
                className={`rounded-3xl p-8 transition-all duration-700 flex flex-col ${
                  pricingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${offer.highlight ? 'ring-2 scale-105' : ''}`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  backgroundColor: offer.highlight ? '#5A7161' : '#FFFFFF',
                  color: offer.highlight ? '#FFFFFF' : '#2C352D',
                  border: offer.highlight ? 'none' : '1px solid #E2DFD8',
                  boxShadow: offer.highlight ? '0 16px 40px rgba(90,113,97,0.25)' : '0 2px 8px rgba(90,113,97,0.06)',
                  ringColor: '#5A7161'
                }}
              >
                {offer.highlight && offer.badge && (
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block self-start"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }}
                  >
                    {offer.badge}
                  </span>
                )}
                <h3 className="font-heading font-medium text-2xl mb-1">{offer.name}</h3>

                {/* Prix selon toggle */}
                <div className="my-3 min-h-[56px]">
                  {isAnnualHome && offer.priceAnnual ? (
                    <p className="text-2xl font-bold" style={{ color: offer.highlight ? '#FFFFFF' : '#5A7161' }}>
                      {offer.priceAnnual}
                    </p>
                  ) : (
                    <p className="text-3xl font-bold" style={{ color: offer.highlight ? '#FFFFFF' : '#5A7161' }}>
                      {offer.price}
                    </p>
                  )}
                  <p className="text-xs mt-1" style={{ color: offer.highlight ? 'rgba(255,255,255,0.7)' : '#5E6C60' }}>
                    + {offer.installation} (installation)
                  </p>
                </div>

                <p className="text-sm leading-relaxed flex-1" style={{ color: offer.highlight ? 'rgba(255,255,255,0.85)' : '#5E6C60' }}>
                  {offer.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/offres">
              <Button
                size="lg"
                className="rounded-full text-white font-medium px-8"
                style={{ backgroundColor: '#5A7161' }}
                data-testid="home-compare-offers-btn"
              >
                Comparer toutes les offres
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-3 text-sm" style={{ color: '#5E6C60' }}>
              Installation guidée + support humain inclus dans toutes les offres
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          COMMENT ÇA MARCHE
      ================================================================ */}
      <section className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="label-tag mb-4 block" style={{ color: '#9E7E4A' }}>Le processus</span>
            <h2 className="font-heading font-medium text-4xl sm:text-5xl" style={{ color: '#2C352D' }}>
              Comment ça fonctionne ?
            </h2>
          </div>

          <div ref={processRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={item.step}
                className={`group rounded-3xl p-8 transition-all duration-700 hover:-translate-y-2 ${
                  processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  backgroundColor: '#F4F0E8',
                  border: '1px solid #E2DFD8'
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-white text-xl font-bold font-heading shadow-warm-sm mb-6"
                  style={{ backgroundColor: '#5A7161' }}>
                  {item.step}
                </div>
                <h3 className="font-heading font-medium text-xl mb-3" style={{ color: '#2C352D' }}>
                  {item.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#5E6C60' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          FAQ
      ================================================================ */}
      <section className="py-24" style={{ backgroundColor: '#F4F0E8' }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-medium text-4xl sm:text-5xl" style={{ color: '#2C352D' }}>
              Questions fréquentes
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.slice(0, 6).map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="rounded-2xl px-6"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2DFD8' }}
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

          <div className="text-center mt-10">
            <Link to="/solution#faq">
              <Button
                variant="outline"
                className="rounded-full px-8 font-medium"
                style={{ borderColor: '#5A7161', color: '#5A7161' }}
                data-testid="see-all-faq-btn"
              >
                Voir toutes les questions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA FINAL — fond forêt profond
      ================================================================ */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#2C352D' }}>
        {/* Organic subtle glow */}
        <div className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(90,113,97,0.6) 0%, transparent 60%)' }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading font-medium text-4xl sm:text-5xl mb-6" style={{ color: '#F9F6F0' }}>
              Votre agenda en ligne,<br />prêt en 7 jours.
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(249,246,240,0.75)' }}>
              Échangeons 20 minutes. Vous expliquez votre pratique, nous vous montrons à quoi ressemblera votre page. Sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-full font-medium px-8"
                  style={{ backgroundColor: '#F9F6F0', color: '#2C352D' }}
                  data-testid="home-final-cta-button"
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

export default Home;
