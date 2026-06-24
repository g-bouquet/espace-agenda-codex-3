import { useEffect } from 'react';

const SITE_NAME = 'Espace Agenda';
const DEFAULT_IMAGE_PATH = '/og-image.jpg';

const upsertMeta = (attr, key, content) => {
  if (content === undefined || content === null || content === '') return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

/**
 * Composant SEO réutilisable : met à jour title, meta description, canonical,
 * Open Graph, Twitter Cards et (optionnel) les données structurées JSON-LD.
 */
export const Seo = ({ title, description, image, type = 'website', jsonLd = null }) => {
  useEffect(() => {
    const url = window.location.origin + window.location.pathname;
    const ogImage = image || window.location.origin + DEFAULT_IMAGE_PATH;

    if (title) document.title = title;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);

    // Open Graph
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:locale', 'fr_FR');

    // Twitter / X Cards
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);

    // Données structurées (JSON-LD) propres à la page
    const SCRIPT_ID = 'seo-jsonld-page';
    let script = document.getElementById(SCRIPT_ID);
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = SCRIPT_ID;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, image, type, jsonLd]);

  return null;
};

export default Seo;
