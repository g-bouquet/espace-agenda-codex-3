import Hero from '@/components/Hero';
import Faq from '@/components/Faq';
import PricingCard from '@/components/PricingCard';
import Link from 'next/link';
import { siteConfig, professions, features, offers, faqGeneral } from '@/content/site';

export default function Home() {
  return (
    <>
      <Hero
        title="Gestion des rendez-vous :"
        titleHighlight="simple pour vous, fluide pour vos clients"
        description="Pour les praticiens et indépendants : page de réservation personnalisée à votre identité, rappels et support réactif. Nous installons et configurons pour votre pratique, puis nous restons disponibles."
        primaryCta={{ text: siteConfig.cta.primary, href: '/contact' }}
        secondaryCta={{ text: siteConfig.cta.secondary.examples, href: '/exemples' }}
      />

      {/* Conçu pour qui */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Conçu pour qui ?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Particulièrement adapté aux pratiques en cabinet et aux indépendants.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {professions.map((profession, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:border-primary transition-colors"
              >
                <h3 className="font-semibold text-gray-900">{profession}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce que vous obtenez */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Ce que vous obtenez</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos offres */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Trois formules simples</h2>
            <p className="text-lg text-gray-600">Des offres adaptées à votre activité</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {offers.map((offer) => (
              <PricingCard key={offer.id} {...offer} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/offres"
              className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md font-semibold transition-colors"
            >
              {siteConfig.cta.secondary.pricing}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Questions fréquentes</h2>
          </div>
          <Faq items={faqGeneral.slice(0, 6)} />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Prêt à simplifier votre gestion des rendez-vous ?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Nous sommes à votre écoute pour vous accompagner dans la mise en place de votre solution.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-md font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            {siteConfig.cta.primary}
          </Link>
        </div>
      </section>
    </>
  );
}
