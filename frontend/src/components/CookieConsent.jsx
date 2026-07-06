import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'cookie-consent-espace-agenda';

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem(STORAGE_KEY);
    if (!choice) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      data-testid="cookie-consent-banner"
      className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
      style={{ animation: 'cookieSlideUp 0.4s ease-out' }}
    >
      <style>{`@keyframes cookieSlideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div
        className="mx-auto max-w-4xl rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        style={{ backgroundColor: '#2C352D', border: '1px solid rgba(249,246,240,0.12)' }}
      >
        <div className="flex items-start gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full flex-shrink-0"
            style={{ backgroundColor: 'rgba(158,126,74,0.25)' }}
          >
            <Cookie className="h-5 w-5" style={{ color: '#D8B36A' }} />
          </span>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(249,246,240,0.85)' }}>
            Nous utilisons des cookies pour améliorer votre expérience et mesurer l'audience du site.
            Vous pouvez accepter ou refuser.{' '}
            <Link
              to="/confidentialite"
              className="underline underline-offset-2"
              style={{ color: '#D8B36A' }}
              data-testid="cookie-consent-policy-link"
            >
              En savoir plus
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => decide('refused')}
            data-testid="cookie-consent-refuse"
            className="rounded-full px-5 py-2 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ color: 'rgba(249,246,240,0.85)', border: '1px solid rgba(249,246,240,0.3)' }}
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => decide('accepted')}
            data-testid="cookie-consent-accept"
            className="rounded-full px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#9E7E4A', color: '#F9F6F0' }}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
