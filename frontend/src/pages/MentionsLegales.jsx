import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { legalInfo, contactInfo } from '../content';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-20">
        <Link to="/">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>

        <h1 className="text-4xl font-bold text-neutral-900 mb-8">Mentions légales</h1>

        <div className="prose prose-lg max-w-none text-neutral-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Éditeur du site</h2>
            <p>
              Le site Espace Agenda est édité par :
            </p>
            <p>
              <strong>{legalInfo.companyName}</strong><br />
              {legalInfo.legalForm}<br />
              Siège social : {legalInfo.address}<br />
              SIRET : {legalInfo.siret}
            </p>
            <p>
              <strong>Directeur de la publication :</strong> {legalInfo.director}<br />
              <strong>Contact :</strong> {contactInfo.email}<br />
              <strong>Téléphone :</strong> {contactInfo.phone}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Hébergement</h2>
            <p>
              Le site est hébergé par :
            </p>
            <p>
              <strong>[Nom de l'hébergeur]</strong><br />
              [Adresse complète]<br />
              [Téléphone]<br />
              [Site web]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.) 
              est la propriété exclusive d'Espace Agenda, sauf mention contraire.
            </p>
            <p>
              Toute reproduction, distribution, modification, adaptation, retransmission ou publication 
              de ces différents éléments est strictement interdite sans l'accord express par écrit d'Espace Agenda.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Données personnelles</h2>
            <p>
              Les informations recueillies sur ce site sont enregistrées dans un fichier informatisé 
              par Espace Agenda pour la gestion des demandes de contact et l'amélioration de nos services.
            </p>
            <p>
              Conformément à la loi « Informatique et Libertés » et au Règlement Général sur la Protection 
              des Données (RGPD), vous pouvez exercer votre droit d'accès, de rectification et de suppression 
              de vos données en nous contactant à : contact@espaceagenda.fr
            </p>
            <p>
              Pour plus d'informations, consultez notre{' '}
              <Link to="/confidentialite" className="text-amber-700 hover:text-amber-800 underline">
                Politique de confidentialité
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Cookies</h2>
            <p>
              Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. 
              En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies.
            </p>
            <p>
              Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Responsabilité</h2>
            <p>
              Espace Agenda s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées 
              sur ce site. Toutefois, Espace Agenda ne peut garantir l'exactitude, la précision ou 
              l'exhaustivité des informations mises à disposition sur ce site.
            </p>
            <p>
              Espace Agenda ne saurait être tenu responsable des dommages directs ou indirects résultant 
              de l'accès au site ou de l'utilisation de celui-ci.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige, 
              et à défaut d'accord amiable, le tribunal compétent sera celui du siège social d'Espace Agenda.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Contact</h2>
            <p>
              Pour toute question concernant les mentions légales, vous pouvez nous contacter :
            </p>
            <p>
              Par email : contact@espaceagenda.fr<br />
              Par téléphone : 01 23 45 67 89<br />
              Par courrier : 123 Avenue de la République, 75011 Paris, France
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-neutral-200 text-sm text-neutral-500">
            Dernière mise à jour : Janvier 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;