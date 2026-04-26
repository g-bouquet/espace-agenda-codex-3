import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, Leaf } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const HeroSection = ({
  title,
  titleHighlight,
  description,
  ctaText = "Planifier un échange (15 min)",
  ctaLink = "/contact",
  showCta = true,
  backgroundImage = "https://images.unsplash.com/photo-1773858375548-3919c0fe1ca0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
}) => {
  const [scrollY, setScrollY] = useState(0);
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[560px] lg:min-h-[660px] flex items-center">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: 'transform 0.1s linear'
        }}
      >
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-[120%] object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        {/* Warm sand overlay — not cold/white */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(249,246,240,0.94) 0%, rgba(244,240,232,0.88) 50%, rgba(249,246,240,0.80) 100%)'
        }} />
      </div>

      {/* Decorative organic shape */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 z-0 opacity-10 hidden lg:block"
        style={{
          background: 'radial-gradient(ellipse at right center, #5A7161 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 py-24 lg:py-32 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            ref={heroRef}
            className={`max-w-3xl transition-all duration-1000 ease-out ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Overline avec icône feuille */}
            <div className="flex items-center gap-2 mb-5">
              <Leaf className="h-4 w-4 flex-shrink-0" style={{ color: '#5A7161' }} />
              <span className="label-tag" style={{ color: '#5A7161' }}>
                Réservation en ligne pour praticiens
              </span>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight mb-6"
              style={{ color: '#2C352D', lineHeight: '1.1' }}>
              {title}{' '}
              {titleHighlight && (
                <em className="not-italic" style={{ color: '#5A7161' }}>{titleHighlight}</em>
              )}
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: '#5E6C60' }}>
              {description}
            </p>

            {showCta && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={ctaLink}>
                  <Button
                    size="lg"
                    className="rounded-full bg-primary hover:bg-primary-hover text-white shadow-warm-md font-medium px-8"
                    data-testid="hero-cta-button"
                  >
                    {ctaText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/offres">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 font-medium"
                    style={{ borderColor: '#9E7E4A', color: '#9E7E4A' }}
                  >
                    Voir les offres
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
