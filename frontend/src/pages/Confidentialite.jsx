import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { legalInfo } from '../content';

const Confidentialite = () => {
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
          Politique de confidentialité
        </h1>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
            <p className="text-gray-700">
              La présente politique de confidentialité décrit comment {legalInfo.companyName} collecte, utilise et protège vos données personnelles lorsque vous utilisez notre site web et nos services.
            </p>
            <p className="text-gray-700">
              Nous nous engageons à protéger votre vie privée et à respecter la réglementation applicable en matière de protection des données, notamment le Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Responsable du traitement</h2>
            <p className="text-gray-700">
              <strong>{legalInfo.companyName}</strong><br />
              {legalInfo.legalForm}<br />
              Adresse : {legalInfo.address}<br />
              SIRET : {legalInfo.siret}<br />
              Email : {legalInfo.email}<br />
              Téléphone : {legalInfo.phone}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Données collectées</h2>
            <p className="text-gray-700">
              Nous collectons les données personnelles suivantes :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Données d'identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
              <li><strong>Données de contact :</strong> messages envoyés via le formulaire de contact</li>
              <li><strong>Données de connexion :</strong> adresse IP, type de navigateur, pages consultées, durée de visite</li>
              <li><strong>Cookies :</strong> informations stockées sur votre appareil pour améliorer votre expérience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Vos droits</h2>
            <p className="text-gray-700">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> corriger vos données inexactes ou incomplètes</li>
              <li><strong>Droit à l'effacement :</strong> supprimer vos données dans certaines conditions</li>
              <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Pour exercer vos droits, contactez-nous : {legalInfo.email}
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

export default Confidentialite;
