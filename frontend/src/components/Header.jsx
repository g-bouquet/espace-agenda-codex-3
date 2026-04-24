import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { globalCTA } from '../content';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'Solution', path: '/solution' },
    { name: 'Offres', path: '/offres' },
    { name: 'Aperçu', path: '/exemples' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'header-glass shadow-warm-sm'
          : 'bg-background/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between py-4 px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center">
            <img
              src="/logo-espace-agenda.png"
              alt="Espace Agenda"
              className="h-14 w-auto"
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                isActive(item.path) ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {item.name}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300 ${
                  isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/contact">
            <Button
              className="rounded-full bg-primary hover:bg-primary-hover text-white font-medium px-6 shadow-warm-sm"
              data-testid="header-cta-button"
            >
              {globalCTA.primary}
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-md">
          <div className="space-y-1 px-6 pb-8 pt-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-4 rounded-full bg-primary hover:bg-primary-hover text-white font-medium">
                {globalCTA.primary}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
