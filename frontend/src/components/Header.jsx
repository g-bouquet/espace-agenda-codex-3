import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'Solution', path: '/solution' },
    { name: 'Offres', path: '/offres' },
    { name: 'Exemples', path: '/exemples' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-[15px] px-6 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center transition-transform duration-300 hover:scale-105">
            <img 
              src="/logo-espace-agenda.png" 
              alt="Espace Agenda" 
              className="h-[60px] w-auto"
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-medium transition-all duration-300 hover:text-primary relative group ${
                isActive(item.path) ? 'text-primary' : 'text-gray-700'
              }`}
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/contact">
            <Button className="bg-primary hover:bg-primary-hover text-white font-medium px-6 rounded-sm shadow-sm hover:shadow-md transition-all duration-300">
              Planifier un échange (15 min)
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white animate-fade-in">
          <div className="space-y-1 px-6 pb-6 pt-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-sm">
                Demander l'installation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;