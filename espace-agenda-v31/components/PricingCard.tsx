import Link from 'next/link';

interface PricingCardProps {
  name: string;
  price: number;
  priceDisplay: string;
  installation: number;
  installationDisplay: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  smsInfo?: string;
}

export default function PricingCard({
  name,
  priceDisplay,
  installationDisplay,
  description,
  features,
  highlighted = false,
  smsInfo,
}: PricingCardProps) {
  return (
    <div
      className={`relative bg-white rounded-xl p-8 flex flex-col h-full ${
        highlighted ? 'border-2 border-primary shadow-lg' : 'border border-gray-200'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-white px-6 py-1 rounded-full text-sm font-semibold">
            Recommandé
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      <div className="mb-6">
        <div className="text-4xl font-bold text-primary mb-2">{priceDisplay}</div>
        <p className="text-sm text-gray-600">Installation : {installationDisplay}</p>
        {smsInfo && <p className="text-xs text-primary mt-2">{smsInfo}</p>}
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
            <span className="text-primary font-bold flex-shrink-0">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`block text-center py-3 rounded-md font-semibold transition-colors ${
          highlighted
            ? 'bg-primary hover:bg-primary-hover text-white'
            : 'bg-gray-900 hover:bg-gray-800 text-white'
        }`}
      >
        Planifier un échange
      </Link>
    </div>
  );
}
