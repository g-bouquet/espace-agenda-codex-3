'use client';

import Link from 'next/link';
import { useState } from 'react';
import { siteConfig } from '@/content/site';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            {siteConfig.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/solution" className="text-gray-700 hover:text-primary transition-colors">
              Solution
            </Link>
            <Link href="/offres" className="text-gray-700 hover:text-primary transition-colors">
              Offres
            </Link>
            <Link href="/exemples" className="text-gray-700 hover:text-primary transition-colors">
              Exemples
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-md font-medium transition-colors"
            >
              {siteConfig.cta.primary}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-4">
            <Link href="/" className="block text-gray-700 hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/solution" className="block text-gray-700 hover:text-primary transition-colors">
              Solution
            </Link>
            <Link href="/offres" className="block text-gray-700 hover:text-primary transition-colors">
              Offres
            </Link>
            <Link href="/exemples" className="block text-gray-700 hover:text-primary transition-colors">
              Exemples
            </Link>
            <Link href="/blog" className="block text-gray-700 hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link
              href="/contact"
              className="block bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-md font-medium text-center transition-colors"
            >
              {siteConfig.cta.primary}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
