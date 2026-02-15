import Link from 'next/link';
import { siteConfig } from '@/content/site';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">{siteConfig.name}</h4>
            <p className="text-gray-300 text-sm">
              Prise de rendez-vous en ligne à votre nom, pensée pour les praticiens de l'accompagnement.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/solution" className="text-gray-300 hover:text-white transition-colors">
                  Solution
                </Link>
              </li>
              <li>
                <Link href="/offres" className="text-gray-300 hover:text-white transition-colors">
                  Offres
                </Link>
              </li>
              <li>
                <Link href="/exemples" className="text-gray-300 hover:text-white transition-colors">
                  Exemples
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>{siteConfig.contact.location}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mentions-legales" className="text-gray-300 hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 {siteConfig.name}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
