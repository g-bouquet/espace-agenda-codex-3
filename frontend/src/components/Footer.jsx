import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4 transition-opacity hover:opacity-80">
              <span className="text-2xl font-bold font-heading">Espace Agenda</span>
            </Link>
            <p className="text-blue-100 text-sm max-w-md">
              La solution de prise de rendez-vous en ligne 100% en marque blanche, pensée pour les praticiens et professionnels de l'accompagnement.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold font-heading mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <Link to="/solution" className="hover:text-white transition-colors duration-300">
                  Solution
                </Link>
              </li>
              <li>
                <Link to="/offres" className="hover:text-white transition-colors duration-300">
                  Offres
                </Link>
              </li>
              <li>
                <Link to="/exemples" className="hover:text-white transition-colors duration-300">
                  Exemples
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors duration-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold font-heading mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-blue-100">
              <li className="flex items-center gap-2 transition-colors hover:text-white">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@espaceagenda.fr" className="hover:text-white transition-colors duration-300">
                  contact@espaceagenda.fr
                </a>
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-white">
                <Phone className="h-4 w-4" />
                <a href="tel:+33123456789" className="hover:text-white transition-colors duration-300">
                  01 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-100">
            <p>© 2025 Espace Agenda. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link to="/mentions-legales" className="hover:text-white transition-colors duration-300">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="hover:text-white transition-colors duration-300">
                Politique de confidentialité
              </Link>
              <Link to="/admin/login" className="hover:text-white transition-colors duration-300 opacity-50 hover:opacity-100">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;