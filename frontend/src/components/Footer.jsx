import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { contactInfo, globalCTA } from '../content';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    try {
      const res = await axios.post(`${API}/newsletter/subscribe`, { email: newsletterEmail });
      if (res.data.success) {
        toast.success(res.data.message);
        setNewsletterEmail('');
      }
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setNewsletterLoading(false);
    }
  };

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
              Prise de rendez-vous en ligne à votre nom, pensée pour les praticiens de l'accompagnement.
            </p>
            <div className="mt-4">
              <Link to="/contact">
                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  {globalCTA.primary}
                </Button>
              </Link>
            </div>
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
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors duration-300">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-white">
                <Phone className="h-4 w-4" />
                <a href={`tel:+33${contactInfo.phone.replace(/\s/g, '').substring(1)}`} className="hover:text-white transition-colors duration-300">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-white">
                <MapPin className="h-4 w-4" />
                <span>{contactInfo.locationShort}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 pt-8 border-t border-blue-900/50">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-6">
            <p className="text-blue-100 text-sm font-medium">Restez informé des actualités Espace Agenda :</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="votre@email.fr"
                required
                className="flex-1 md:w-64 h-9 rounded-sm bg-white/10 border border-white/20 text-white placeholder-blue-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/40"
                data-testid="newsletter-email-input"
              />
              <Button
                type="submit"
                size="sm"
                disabled={newsletterLoading}
                className="bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-sm"
                data-testid="newsletter-subscribe-btn"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-100">
            <p>© 2026 Espace Agenda. Tous droits réservés.</p>
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
