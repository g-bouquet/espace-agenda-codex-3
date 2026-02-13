import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Zap, Check, Smartphone, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useInView } from 'react-intersection-observer';
import { faqs } from '../mock';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  
  // Animation hooks avec observer actif
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { ref: benefitsRef, inView: benefitsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { ref: processRef, inView: processInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image and Parallax */}
      <section className="relative overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=80" 
            alt="Accompagnement professionnel"
            className="w-full h-full object-cover scale-110"
          />
          {/* Overlay gradient pour la lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/80"></div>
        </div>
        
        <div className="relative z-10 py-20 lg:py-32 w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div 
              ref={heroRef} 
              className={`mx-auto max-w-3xl text-center transition-all duration-1000 ease-out ${
                heroInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h1 className="text-4xl font-bold font-heading tracking-tight text-foreground sm:text-6xl">
                La prise de rendez-vous{' '}
                <span className="text-primary">à votre nom</span> — simple pour vous, fluide pour vos clients
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Une page de réservation claire, des rappels automatiques, et un espace client si besoin. Nous installons et configurons pour votre pratique, puis nous restons disponibles.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4">
                <div className="flex items-center justify-center gap-x-6">
                  <Link to="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary-hover text-white font-medium rounded-sm shadow-md hover:shadow-lg transition-all duration-300">
                      Planifier un échange (15 min)
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/exemples">
                    <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-sm transition-all duration-300">
                      Voir un exemple
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Installation guidée • Support humain • Paramétrage adapté à votre pratique
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Pourquoi les praticiens choisissent Espace Agenda
            </h2>
          </div>

          <div ref={benefitsRef} className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                icon: Clock,
                title: 'Moins d\'allers-retours, moins d\'oublis',
                description: 'Vos clients réservent en ligne quand ils le souhaitent, et reçoivent des rappels automatiques. Vous n\'avez plus à gérer les confirmations.',
                image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
                delay: 100
              },
              {
                icon: Shield,
                title: 'À votre nom, à votre image',
                description: 'Votre logo, vos couleurs, votre identité. Vos clients ne voient que vous, sans mention d\'un outil tiers.',
                image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
                delay: 200
              },
              {
                icon: Zap,
                title: 'Clé en main (vraiment)',
                description: 'Vous ne passez pas vos soirées à paramétrer : on le fait, on teste, on met en ligne.',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
                delay: 300
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index} 
                  className={`border-border hover:border-primary transition-all duration-500 hover:shadow-lg overflow-hidden group ${
                    benefitsInView 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: benefitsInView ? `${benefit.delay}ms` : '0ms'
                  }}
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={benefit.image} 
                      alt={benefit.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold font-heading text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pour qui Section */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl mb-6">
              Pour qui ?
            </h2>
            <p className="text-lg text-foreground mb-4">
              Pensé pour les praticiens indépendants : psychologues/psychopraticiens, bien-être, coaching.
            </p>
            <p className="text-sm text-muted-foreground">
              Moins adapté si vous cherchez un outil 100% autonome sans accompagnement.
            </p>
          </div>
        </div>
      </section>

      {/* Côté client Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl mb-6">
                Côté client : une réservation simple et rassurante
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Vos clients choisissent un créneau en quelques secondes. Ils reçoivent une confirmation et des rappels (email, SMS selon l'offre).
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Smartphone, text: 'Mobile et ordinateur' },
                  { icon: Shield, text: 'Messages à votre nom' },
                  { icon: Calendar, text: 'Annuler / déplacer facilement' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-foreground font-medium">{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative max-w-sm">
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80" 
                  alt="Interface mobile de réservation"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Côté praticien Section */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative max-w-sm">
                <img 
                  src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80" 
                  alt="Interface praticien"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl mb-6">
                Côté praticien : tout est cadré
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Vous gardez la main sur vos règles : durées, motifs, indisponibilités, acompte, notes internes (selon l'offre).
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Calendar, text: 'Agenda & disponibilité' },
                  { icon: Shield, text: 'Historique client' },
                  { icon: Check, text: 'Rappels & paiements (selon l\'offre)' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-foreground font-medium">{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Offres aperçu Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl mb-4">
              Offres (aperçu)
            </h2>
            <p className="text-lg text-muted-foreground">
              À partir de 29€/mois TTC
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {[
              { name: 'Essentiel', price: '29€/mois TTC', desc: 'Réservation + rappels email' },
              { name: 'Pro', price: '45€/mois TTC', desc: 'Essentiel + paiements + fiche client', highlight: true },
              { name: 'Premium', price: '79€/mois TTC', desc: 'Pro + paramétrage avancé' }
            ].map((offer, index) => (
              <Card key={index} className={`border-border ${offer.highlight ? 'border-primary border-2 shadow-lg' : ''}`}>
                <CardContent className="pt-6 text-center">
                  {offer.highlight && (
                    <div className="mb-4">
                      <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Recommandé
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold font-heading text-foreground mb-2">{offer.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-3">{offer.price}</p>
                  <p className="text-sm text-muted-foreground">{offer.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/offres">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white font-medium rounded-sm shadow-md hover:shadow-lg transition-all duration-300 mb-3">
                Comparer les offres
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              On vous aide à choisir en 10 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Comment ça fonctionne ?
            </h2>
          </div>

          <div ref={processRef} className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Cadrage (15–30 min) + formulaire de besoins',
                  description: 'Vous nous parlez de votre pratique, de vos horaires et de vos règles. Nous remplissons ensemble le formulaire de besoins.',
                  image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80'
                },
                {
                  step: '2',
                  title: 'Installation + paramétrage + intégration',
                  description: 'Nous installons votre plateforme, la paramétrons selon vos besoins et l\'intégrons sur votre site si vous en avez déjà un.',
                  image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80'
                },
                {
                  step: '3',
                  title: 'Mini-formation (30 min) + support illimité',
                  description: 'Nous vous formons à l\'utilisation en 30 minutes. Ensuite, notre support humain reste disponible pour toutes vos questions.',
                  image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80'
                }
              ].map((item, index) => (
                <div 
                  key={item.step} 
                  className={`relative group transition-all duration-700 ease-out ${
                    processInView 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: processInView ? `${index * 150}ms` : '0ms'
                  }}
                >
                  {/* Image with subtle overlay and badge */}
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-6 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Subtle overlay only at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    {/* Badge positioned at top left */}
                    <div className="absolute top-4 left-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold font-heading shadow-lg">
                        {item.step}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold font-heading text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ courte Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Questions fréquentes
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.slice(0, 5).map((faq) => (
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

          <div className="text-center mt-8">
            <Link to="/solution">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Voir toutes les questions
                <ArrowRight className="ml-2 h-4 w-4" />
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
              Prêt à passer à une prise de rendez-vous plus sereine ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Dites-nous votre pratique, vos horaires et vos règles : on prépare une version prête à l'emploi.
            </p>
            <div className="mt-10">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-secondary hover:bg-gray-100 font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-sm">
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

export default Home;
