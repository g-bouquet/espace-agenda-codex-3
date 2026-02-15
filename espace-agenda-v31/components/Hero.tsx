import Link from 'next/link';

interface HeroProps {
  title: string;
  titleHighlight?: string;
  description: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
}

export default function Hero({
  title,
  titleHighlight,
  description,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {title}
            {titleHighlight && (
              <>
                {' '}
                <span className="text-primary">{titleHighlight}</span>
              </>
            )}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            {description}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-md font-semibold transition-colors shadow-md hover:shadow-lg"
                >
                  {primaryCta.text}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md font-semibold transition-colors"
                >
                  {secondaryCta.text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
