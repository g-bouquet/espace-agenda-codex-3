import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { legalInfo, contactInfo } from '../content';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>

        <h1 className="text-4xl font-bold font-heading tracking-tight text-foreground mb-8">
          Mentions légales
        </h1>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Éditeur du site</h2>
            <p className="text-gray-700">
              Le site Espace Agenda est édité par :<br />
              <strong>{legalInfo.companyName}</strong><br />
              {legalInfo.legalForm}<br />
              Adresse : {legalInfo.address}<br />
              SIRET : {legalInfo.siret}<br />
              Directeur de la publication : {legalInfo.director}<br />
              Contact : {legalInfo.email}<br />
              Téléphone : {legalInfo.phone}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Hébergement</h2>
            <p className="text-gray-700">
              Le site est hébergé par :<br />
              <strong>{legalInfo.hosting.name}</strong><br />
              Siège social : {legalInfo.hosting.address}<br />
              Site web : <a href={legalInfo.hosting.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{legalInfo.hosting.website}</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Propriété intellectuelle</h2>
            <p className="text-gray-700">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p className="text-gray-700">
              La reproduction de tout ou partie de ce site sur un support électronique ou autre quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Protection des données personnelles</h2>
            <p className="text-gray-700">
              Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
            </p>
            <p className="text-gray-700">
              Pour exercer ces droits, vous pouvez nous contacter :
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Par email : {legalInfo.email}</li>
              <li>Par téléphone : {legalInfo.phone}</li>
              <li>Par courrier : {legalInfo.address}</li>
            </ul>
            <p className="text-gray-700">
              Pour plus d'informations sur la gestion de vos données personnelles, consultez notre <Link to="/confidentialite" className="text-primary hover:underline">Politique de confidentialité</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies</h2>
            <p className="text-gray-700">
              Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
            </p>
            <p className="text-gray-700">
              Vous pouvez désactiver les cookies dans les paramètres de votre navigateur. Notez que certaines fonctionnalités du site peuvent être limitées si les cookies sont désactivés.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Crédits</h2>
            <p className="text-gray-700">
              Conception et développement : {legalInfo.companyName}<br />
              Photographies : Unsplash
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Liens hypertextes</h2>
            <p className="text-gray-700">
              Les liens hypertextes présents sur ce site peuvent renvoyer vers d'autres sites internet. Espace Agenda ne saurait être tenu responsable du contenu de ces sites tiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation de responsabilité</h2>
            <p className="text-gray-700">
              Espace Agenda s'efforce de fournir des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
            </p>
          </section>

          <section className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Dernière mise à jour : {legalInfo.lastUpdate}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
