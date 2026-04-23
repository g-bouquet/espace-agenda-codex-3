import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
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
    <footer style={{ backgroundColor: '#2C352D', color: '#F9F6F0' }}>
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <span className="font-heading text-2xl font-medium" style={{ color: '#F9F6F0' }}>
                Espace Agenda
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-md mb-5" style={{ color: 'rgba(249,246,240,0.65)' }}>
              Prise de rendez-vous en ligne à votre nom, pensée pour les praticiens de l'accompagnement.
            </p>
            <Link to="/contact">
              <button
                className="rounded-full text-sm font-medium px-5 py-2 transition-colors duration-200"
                style={{ border: '1px solid rgba(249,246,240,0.25)', color: '#F9F6F0', backgroundColor: 'rgba(249,246,240,0.1)' }}
              >
                {globalCTA.primary}
              </button>
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm mb-5 tracking-wide" style={{ color: '#F9F6F0' }}>Navigation</h3>
            <ul className="space-y-3">
              {[
                { label: 'Solution', to: '/solution' },
                { label: 'Offres', to: '/offres' },
                { label: 'Exemples', to: '/exemples' },
                { label: 'Blog', to: '/blog' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm transition-opacity duration-200 hover:opacity-100"
                    style={{ color: 'rgba(249,246,240,0.65)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-5 tracking-wide" style={{ color: '#F9F6F0' }}>Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: 'rgba(249,246,240,0.5)' }} />
                <a href={`mailto:${contactInfo.email}`} className="text-sm hover:opacity-100 transition-opacity"
                  style={{ color: 'rgba(249,246,240,0.65)' }}>
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" style={{ color: 'rgba(249,246,240,0.5)' }} />
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-sm hover:opacity-100 transition-opacity"
                  style={{ color: 'rgba(249,246,240,0.65)' }}>
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: 'rgba(249,246,240,0.5)' }} />
                <span className="text-sm" style={{ color: 'rgba(249,246,240,0.65)' }}>{contactInfo.locationShort}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(249,246,240,0.12)' }}>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-8">
            <p className="text-sm font-medium" style={{ color: 'rgba(249,246,240,0.75)' }}>
              Restez informé des actualités Espace Agenda :
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="votre@email.fr"
                required
                className="flex-1 md:w-64 h-9 rounded-full px-4 text-sm focus:outline-none"
                style={{
                  backgroundColor: 'rgba(249,246,240,0.08)',
                  border: '1px solid rgba(249,246,240,0.18)',
                  color: '#F9F6F0'
                }}
                data-testid="newsletter-email-input"
              />
              <button
                type="submit"
                disabled={newsletterLoading}
                className="h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                style={{ backgroundColor: 'rgba(249,246,240,0.15)', border: '1px solid rgba(249,246,240,0.2)', color: '#F9F6F0' }}
                data-testid="newsletter-subscribe-btn"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6" style={{ borderTop: '1px solid rgba(249,246,240,0.08)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ color: 'rgba(249,246,240,0.45)' }}>
            <p>© 2026 Espace Agenda. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link to="/mentions-legales" className="hover:opacity-100 transition-opacity">Mentions légales</Link>
              <Link to="/confidentialite" className="hover:opacity-100 transition-opacity">Politique de confidentialité</Link>
              <Link to="/admin/login" className="transition-opacity" style={{ opacity: 0.4 }}>Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
