import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const HeroSection = ({ 
  title, 
  titleHighlight, 
  description, 
  ctaText = "Demander l'installation",
  ctaLink = "/contact",
  showCta = true,
  backgroundImage = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1920&q=80"
}) => {
  const [scrollY, setScrollY] = useState(0);
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img 
          src={backgroundImage} 
          alt="Hero background"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/80"></div>
      </div>

      <div className="relative z-10 py-20 lg:py-28 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div 
            ref={heroRef} 
            className={`mx-auto max-w-3xl text-center transition-all duration-1000 ease-out ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-4xl font-bold font-heading tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}{' '}
              {titleHighlight && <span className="text-primary">{titleHighlight}</span>}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {description}
            </p>
            {showCta && (
              <div className="mt-10">
                <Link to={ctaLink}>
                  <Button size="lg" className="bg-primary hover:bg-primary-hover text-white font-medium rounded-sm shadow-md hover:shadow-lg transition-all duration-300">
                    {ctaText}
                    <ArrowRight className="ml-2 h-5 w-5" />
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
