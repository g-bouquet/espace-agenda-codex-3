// Contenu centralisé du site Espace Agenda V3.1
// Toutes les données sont ici pour éviter les incohérences

export const siteConfig = {
  name: 'Espace Agenda',
  description: 'Gestion de rendez-vous pour praticiens',
  url: 'https://espaceagenda.fr',
  
  contact: {
    phone: '06 11 01 60 54',
    email: 'contact@espaceagenda.fr',
    location: 'Bordeaux + à distance',
    address: '42 rue de Tauzia 33800 Bordeaux',
  },
  
  legal: {
    siret: '504 849 142 00048',
    director: 'Célestin Bouquet',
    hosting: {
      name: 'HOSTINGER INTERNATIONAL LTD',
      address: '61 Lordou Vironos Street, 6023 Larnaca, Chypre',
      website: 'https://www.hostinger.fr/contact',
    },
  },
  
  cta: {
    primary: 'Planifier un échange',
    secondary: {
      examples: 'Voir les demos',
      pricing: 'Comparer les offres',
    },
  },
};

export const professions = [
  'Psychologues',
  'Psychopraticiens',
  'Thérapeutes',
  'Ostéopathes',
  'Sophrologues',
  'Naturopathes',
  'Coachs',
  'Diététiciens',
  'Hypnothérapeutes',
  'Praticiens shiatsu',
  'Praticiens énergétique',
  'Autres professions de consultation',
];

export const offers = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: 29,
    priceDisplay: '29€/mois TTC',
    installation: 149,
    installationDisplay: '149€ TTC',
    description: 'Pour démarrer en toute simplicité',
    features: [
      'Page de réservation à votre nom (sous-domaine inclus)',
      'Réservation 24/7 + confirmations',
      'Rappels email inclus',
      'Rappels WhatsApp',
      'Annulation / replanification côté client',
      'Intégration sur votre site incluse ou mini-site de réservation',
      'Support standard (tickets + base de connaissance)',
    ],
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 45,
    priceDisplay: '45€/mois TTC',
    installation: 199,
    installationDisplay: '199€ TTC',
    description: 'La solution complète pour votre activité',
    smsInfo: '50 SMS inclus • SMS supplémentaires : 0,09€/SMS',
    features: [
      'Tout Essentiel',
      '50 SMS inclus (0,09€/SMS supplémentaire)',
      'Paiements & acomptes (si activés)',
      'Fiche client : notes internes, champs personnalisés, historique',
      'Import/export des données',
      'Tableau de bord & suivi (selon configuration)',
      'Support renforcé (tickets + WhatsApp)',
    ],
    highlighted: true,
  },
  {
    id: 'prime',
    name: 'Prime',
    price: 79,
    priceDisplay: '79€/mois TTC',
    installation: 249,
    installationDisplay: '249€ TTC',
    description: 'Pour une gestion avancée',
    features: [
      'Tout Pro',
      'Import / export avancés',
      'Facturation ou exports pour facturation (selon configuration)',
      'Paramétrages avancés (selon besoin)',
      'Support prioritaire (urgent <6h • autres <24h) + téléphone',
    ],
    highlighted: false,
  },
];

export const options = [
  {
    title: 'Nom de domaine personnalisé',
    description: 'Exemple : rdv.votrecabinet.fr\nMise en place + maintenance incluse\n(Sous-domaine fourni par défaut)',
  },
  {
    title: 'SMS supplémentaires',
    description: '0,09€/SMS (rappel : 50 inclus en Pro)\nActivation/désactivation possible',
  },
  {
    title: 'Espace client',
    description: 'Activer ou désactiver l\'espace client selon votre besoin',
  },
  {
    title: 'Paiement en ligne / acompte',
    description: 'Si non inclus dans votre offre, activation possible en option',
  },
  {
    title: 'Multi-praticiens',
    description: 'Gestion de plusieurs praticiens / cabinet (sur devis)',
  },
  {
    title: 'Intégration spécifique',
    description: 'Si besoin particulier (intégration standard incluse dès Essentiel)',
  },
];

export const comparisonFeatures = [
  { label: 'Rappels email', essentiel: true, pro: true, prime: true },
  { label: 'Rappels WhatsApp', essentiel: true, pro: true, prime: true },
  { label: 'Rappels SMS', essentiel: false, pro: '50 inclus', prime: '0,09€/SMS' },
  { label: 'Paiements & acomptes', essentiel: false, pro: true, prime: true },
  { label: 'Fiche client & notes', essentiel: false, pro: true, prime: true },
  { label: 'Import/export données', essentiel: false, pro: true, prime: true },
  { label: 'Facturation / exports', essentiel: false, pro: false, prime: true },
  { label: 'Synchronisation agenda', essentiel: false, pro: true, prime: true },
  { label: 'Formulaires personnalisés', essentiel: false, pro: true, prime: true },
  { label: 'Statistiques & suivi', essentiel: false, pro: true, prime: true },
  { label: 'Support', essentiel: 'Standard', pro: 'Renforcé', prime: 'Prioritaire' },
];

export const faqGeneral = [
  {
    question: 'Est-ce que ça sera à mon nom / à mon image ?',
    answer: 'Oui. La page de réservation et les communications peuvent être personnalisées : nom, couleurs, éléments d\'identité et lien de réservation à votre nom. L\'objectif est que vos clients réservent comme s\'ils étaient sur votre propre service.',
  },
  {
    question: 'En combien de temps est-ce mis en place ?',
    answer: 'La mise en place est réalisée sous 7 jours après signature du contrat, selon vos éléments (horaires, types de rendez-vous, règles de réservation, identité visuelle). Nous validons avec vous avant mise en ligne.',
  },
  {
    question: 'Est-ce que mes clients reçoivent des rappels ?',
    answer: 'Oui. Les rappels automatiques sont envoyés par email et WhatsApp (selon offre). Les SMS sont inclus dans certaines formules (50 en Pro) et disponibles en complément à 0,09€/SMS.',
  },
  {
    question: 'Puis-je demander un acompte / paiement en ligne ?',
    answer: 'Oui, selon la formule choisie. Vous pouvez activer le paiement en ligne et/ou les acomptes afin de sécuriser les rendez-vous et réduire les annulations de dernière minute.',
  },
  {
    question: 'Puis-je intégrer la réservation sur mon site ?',
    answer: 'Oui. L\'intégration standard sur votre site est incluse. Et si vous n\'avez pas de site, nous pouvons mettre en place un mini-site de réservation simple et propre, prêt à partager.',
  },
  {
    question: 'Qu\'est-ce qui est inclus dans les frais d\'installation ?',
    answer: 'Les frais d\'installation couvrent : cadrage de vos besoins, paramétrage, personnalisation à votre identité, tests, mise en ligne, et une mini-formation (30 min) pour prendre en main l\'essentiel.',
  },
  {
    question: 'Quel support est inclus ?',
    answer: 'Le support est illimité. Vous pouvez nous contacter par email/tickets/WhatsApp et par téléphone. En cas d\'urgence, réponse en moins de 6h, sinon moins de 24h.',
  },
  {
    question: 'Et si je suis plusieurs praticiens ?',
    answer: 'C\'est possible. La gestion multi-praticiens / cabinet est disponible sur devis / option, avec un paramétrage adapté (prestations, agendas, accès, règles de réservation).',
  },
];

export const faqOffres = [
  {
    question: 'Qu\'est-ce qui est inclus dans les frais d\'installation ?',
    answer: 'Les frais d\'installation couvrent : cadrage de vos besoins, paramétrage, personnalisation à votre identité, tests, mise en ligne, et une mini-formation (30 min) pour prendre en main l\'essentiel.',
  },
  {
    question: 'Les SMS sont-ils inclus ?',
    answer: 'L\'offre Pro inclut 50 SMS par mois. Les SMS supplémentaires sont facturés à 0,09€/SMS. Pour les offres Essentiel et Prime, les SMS sont disponibles en option au même tarif.',
  },
  {
    question: 'Puis-je commencer simple puis évoluer ?',
    answer: 'Oui. Vous pouvez démarrer avec une offre et évoluer ensuite (options ou offre supérieure) selon vos besoins.',
  },
  {
    question: 'Combien de temps pour être opérationnel ?',
    answer: 'Environ 7 jours après signature du contrat, si vous nous fournissez rapidement les informations nécessaires (horaires, types de rendez-vous, identité visuelle). Nous validons avec vous avant la mise en ligne.',
  },
  {
    question: 'Comment fonctionne l\'intégration sur mon site ?',
    answer: 'L\'intégration standard (lien ou bouton) est incluse dès l\'offre Essentiel. Si vous n\'avez pas de site, nous créons un mini-site de réservation. Pour des intégrations plus avancées, contactez-nous.',
  },
  {
    question: 'Les données sont-elles protégées (RGPD) ?',
    answer: 'Oui. Accès sécurisé et bonnes pratiques de protection des données. Nous vous aidons à paramétrer correctement les accès et les informations demandées, conformément au RGPD.',
  },
  {
    question: 'Puis-je demander un acompte à mes clients ?',
    answer: 'Oui, selon l\'offre choisie (disponible en Pro et Prime). Vous pouvez activer les paiements et/ou acomptes pour sécuriser les rendez-vous.',
  },
  {
    question: 'Comment résilier si besoin ?',
    answer: 'Les contrats sont sans engagement de durée (hors période d\'installation). Pour toute résiliation, contactez-nous par email. Un préavis de 30 jours est appliqué.',
  },
];

export const demos = [
  {
    title: 'Démo mini-site',
    description: 'Exemple complet de mini-site de réservation prêt à l\'emploi',
    url: 'https://harmonietherapeute.wlbookings.com/',
    type: 'external',
  },
];

export const features = [
  {
    icon: '📅',
    title: 'Calendrier & disponibilités',
    description: 'Gérez vos disponibilités en vue jour, semaine ou mois. Synchronisation Google/Outlook et blocage des indisponibilités.',
  },
  {
    icon: '🔔',
    title: 'Rappels automatiques',
    description: 'Email, SMS et WhatsApp selon l\'offre. Réduisez les oublis et absences sans intervention manuelle.',
  },
  {
    icon: '📱',
    title: 'Page de réservation à votre nom',
    description: 'Interface mobile et desktop personnalisée à votre identité. Vos clients réservent 24/7 en quelques clics.',
  },
  {
    icon: '💳',
    title: 'Paiements & acomptes',
    description: 'Acceptez les paiements en ligne et acomptes (selon offre). Sécurisez vos rendez-vous et suivez les transactions.',
  },
  {
    icon: '👤',
    title: 'Fiche client complète',
    description: 'Historique, notes internes, champs personnalisés. Import/export pour gérer vos données facilement.',
  },
  {
    icon: '🔒',
    title: 'RGPD & accès sécurisé',
    description: 'Protection des données, accès sécurisé. Nous vous aidons à paramétrer correctement selon vos besoins.',
  },
];
