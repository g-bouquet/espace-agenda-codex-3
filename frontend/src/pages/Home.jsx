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
                title: 'On installe, vous utilisez — support inclus',
                description: 'Nous installons, paramétrons et vous formons (30 min). Support humain illimité pour toutes vos questions.',
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
                  Démarrer mon installation
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
