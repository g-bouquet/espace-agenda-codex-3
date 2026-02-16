// Contenu centralise V3 - Espace Agenda
// Source unique de verite pour tous les textes, prix, et configurations

// ========================
// INFORMATIONS DE CONTACT
// ========================
export const contactInfo = {
  phone: '06 11 01 60 54',
  email: 'contact@espaceagenda.fr',
  location: 'Bordeaux + à distance',
  locationShort: 'Bordeaux'
};

// ========================
// HERO - PAGE ACCUEIL
// ========================
export const heroHome = {
  h1: 'Gestion des rendez-vous : simple pour vous, fluide pour vos clients',
  subtitle: 'Pour les praticiens et indépendants : page de réservation personnalisée à votre identité, rappels et support réactif. Nous installons et configurons pour votre pratique, puis nous restons disponibles.',
  ctaPrimary: 'Planifier un échange',
  ctaSecondary: 'Voir les demos',
  ctaSecondaryLink: '/exemples'
};

// ========================
// POUR QUI ? (enrichi)
// ========================
export const targetAudiences = [
  'Psychologues',
  'Psychothérapeutes',
  'Psychiatres',
  'Psychopraticiens',
  'Coachs de vie',
  'Coachs professionnels',
  'Thérapeutes (art-thérapie, musicothérapie, etc.)',
  'Sophrologues',
  'Hypnothérapeutes',
  'Naturopathes',
  'Ostéopathes',
  'Kinésithérapeutes',
  'Chiropracteurs',
  'Diététiciens / Nutritionnistes',
  'Conseillers conjugaux et familiaux',
  'Médiateurs',
  'Consultants indépendants',
  'Formateurs / Enseignants particuliers',
  'Praticiens en médecines douces',
  'Énergéticiens',
  'Praticiens en shiatsu / réflexologie',
  'Orthophonistes',
  'Ergothérapeutes',
  'Psychomotriciens'
];

// ========================
// CE QUE VOUS OBTENEZ
// ========================
export const whatYouGet = [
  'Une page de réservation personnalisée à votre identité (logo, couleurs, textes)',
  'Un accompagnement humain : installation, configuration et formation incluses',
  'Des rappels automatiques pour réduire les absences (email + SMS + WhatsApp selon offre)',
  'Un support réactif et illimité par email, tickets, WhatsApp et téléphone (selon offre)',
  'Une solution sécurisée et conforme RGPD',
  'Des mises à jour régulières et un suivi dans le temps'
];

// ========================
// FONCTIONNALITES CLES
// ========================
export const keyFeatures = [
  {
    id: '1',
    icon: 'Calendar',
    title: 'Calendrier & disponibilités',
    description: 'Gérez vos créneaux en vue jour / semaine / mois. Synchronisation Google Agenda et Outlook. Blocage des indisponibilités en un clic.'
  },
  {
    id: '2',
    icon: 'Globe',
    title: 'Page de réservation personnalisée',
    description: 'Réservation en ligne 24/7, responsive (mobile + desktop), personnalisée à votre image (logo, couleurs, textes). Mini-site ou intégration sur votre site existant.'
  },
  {
    id: '3',
    icon: 'Bell',
    title: 'Rappels automatiques',
    description: 'Rappels email inclus. SMS et WhatsApp disponibles selon l\'offre. Réduisez les absences et les oublis de vos clients.'
  },
  {
    id: '4',
    icon: 'CreditCard',
    title: 'Paiements & acomptes',
    description: 'Acceptez les paiements en ligne et demandez des acomptes pour sécuriser vos rendez-vous. Suivi des transactions intégré (selon offre).'
  },
  {
    id: '5',
    icon: 'FileText',
    title: 'Facturation & exports',
    description: 'Générez des factures ou exportez vos données pour votre comptabilité. Historique complet et suivi financier (selon offre).'
  },
  {
    id: '6',
    icon: 'Users',
    title: 'Fiche client personnalisée',
    description: 'Historique des rendez-vous, notes internes privées, champs personnalisés adaptés à votre pratique. Import / export des données clients.'
  },
  {
    id: '7',
    icon: 'UserCheck',
    title: 'Espace client (option)',
    description: 'Vos clients accèdent à leur historique, prochains rendez-vous, documents partagés. Activation / désactivation selon vos préférences.'
  },
  {
    id: '8',
    icon: 'Shield',
    title: 'Sécurité & RGPD',
    description: 'Accès sécurisés, conformité RGPD, hébergement fiable. Gestion des consentements et des droits clients (accès, rectification, suppression).'
  },
  {
    id: '9',
    icon: 'Users2',
    title: 'Multi-praticiens (option)',
    description: 'Gérez plusieurs praticiens, agendas distincts ou partagés, règles de réservation par praticien. Sur devis.'
  },
  {
    id: '10',
    icon: 'Headphones',
    title: 'Support humain & réactif',
    description: 'Support illimité par email, tickets, WhatsApp (selon offre) et téléphone. Urgences traitées sous 6h, autres demandes sous 24h. Base de connaissances disponible.'
  }
];

// ========================
// OFFRES (V3)
// ========================
export const offers = [
  {
    id: '1',
    name: 'Essentiel',
    description: 'Pour démarrer en toute simplicité',
    price: '29€ / mois TTC',
    priceNumeric: 29,
    installation: '149€ TTC (une fois)',
    installationNumeric: 149,
    features: [
      'Page de réservation à votre nom',
      'Mini-site OU intégration sur votre site existant',
      'Réservation 24/7 + confirmations automatiques',
      'Rappels email inclus',
      'Rappels WhatsApp inclus',
      'Annulation / replanification + Espace client',
      'Calendrier : gestion des disponibilités',
      'Synchronisation Google Agenda / Outlook / Apple',
      'Facturation intégrée',
      'Réserver avec Google',
      'Intégration Zoom et Google Meet',
      'Détection automatique des fuseaux horaires',
      'Interface client multilingue',
      'Gestion des taxes',
      'Fonctionnalité "presque complet"',
      'Support standard (email + tickets + base de connaissances)'
    ],
    highlight: false,
    notIncluded: ['Sous-domaine personnalisé', 'SMS', 'Paiements en ligne', 'Notes internes', 'Support téléphonique']
  },
  {
    id: '2',
    name: 'Pro',
    description: 'La solution complète pour votre activité',
    price: '45€ / mois TTC',
    priceNumeric: 45,
    installation: '199€ TTC (une fois)',
    installationNumeric: 199,
    sms: '50 SMS inclus / mois, puis 0,09€ / SMS',
    features: [
      'Tout Essentiel',
      'Sous-domaine inclus : rdv.votrecabinet.fr',
      'Rappels SMS : 50 SMS inclus / mois',
      'SMS supplémentaires : 0,09€ / SMS',
      'Paiements en ligne & acomptes',
      'Fiche client : champs personnalisés',
      'Notes internes (privées)',
      'Historique client complet',
      'Formulaires personnalisés',
      'Évaluations et avis clients',
      'Rendez-vous récurrents',
      'Pixel Facebook',
      'Intégration Google Analytics et Google Tag Manager',
      'Réservations de groupe',
      'Extras (options supplémentaires)',
      'Coupons et codes promo',
      'Tableau de bord & statistiques',
      'Support renforcé (email + tickets + WhatsApp + base de connaissances)'
    ],
    highlight: true,
    badge: 'Le plus choisi',
    notIncluded: ['Chatbot', 'Support téléphonique', 'Accès API']
  },
  {
    id: '3',
    name: 'Prime',
    description: 'Pour une gestion avancée et un support prioritaire',
    price: '69€ / mois TTC',
    priceNumeric: 69,
    installation: '249€ TTC (une fois)',
    installationNumeric: 249,
    sms: 'SMS disponibles : 0,09€ / SMS',
    features: [
      'Tout Pro',
      'Import / export des données clients',
      'Paramétrages avancés (règles personnalisées)',
      'Statistiques avancées & rapports',
      'Chatbot intelligent',
      'Gestion de ressources (salles, équipements)',
      'Bundles (packs de services)',
      'Plusieurs emplacements / sites',
      'Accès API, Zapier et Webhooks',
      'Intégrations : Mailchimp, Sendinblue, Acumbamail',
      'Support prioritaire : urgences < 6h, autres < 24h',
      'Support téléphonique inclus',
      'Accompagnement personnalisé'
    ],
    highlight: false,
    notIncluded: []
  },
  {
    id: '4',
    name: 'Sur mesure',
    description: 'Une solution adaptée à vos besoins spécifiques',
    price: 'Sur devis',
    priceNumeric: null,
    installation: 'Sur devis',
    installationNumeric: null,
    features: [
      'Multi-praticiens (plusieurs agendas)',
      'Migrations depuis une autre solution',
      'Intégrations spécifiques (API, outils métier)',
      'Règles de réservation avancées',
      'Configuration 100% personnalisée',
      'Formation approfondie de votre équipe',
      'Support dédié'
    ],
    highlight: false,
    isCustom: true,
    isBanner: true,
    notIncluded: []
  }
];

// ========================
// OPTIONS (PAGE OFFRES)
// ========================
export const options = [
  {
    id: 'opt-1',
    icon: 'Globe',
    name: 'Domaine personnalisé',
    description: 'Utilisez votre propre nom de domaine',
    example: 'rdv.votrecabinet.fr',
    price: 'Inclus dès Essentiel',
    note: 'Sous-domaine inclus. Nom de domaine propre : nous consulter.'
  },
  {
    id: 'opt-2',
    icon: 'MessageSquare',
    name: 'SMS supplémentaires',
    description: '50 SMS inclus dans l\'offre Pro',
    price: '0,09€ / SMS supplémentaire',
    note: 'Facturation au réel. Activation / désactivation possible.'
  },
  {
    id: 'opt-3',
    icon: 'UserCheck',
    name: 'Espace client',
    description: 'Vos clients accèdent à leur historique et documents',
    price: 'Disponible dès Prime',
    note: 'Activation / désactivation selon vos préférences.'
  },
  {
    id: 'opt-4',
    icon: 'CreditCard',
    name: 'Paiement en ligne / Acompte',
    description: 'Acceptez les paiements et acomptes en ligne',
    price: 'Inclus dès Pro',
    note: 'Configuration et activation selon vos besoins.'
  },
  {
    id: 'opt-5',
    icon: 'Users2',
    name: 'Multi-praticiens',
    description: 'Plusieurs praticiens, agendas distincts ou partagés',
    price: 'Sur devis',
    note: 'Offre Sur mesure. Contactez-nous pour un devis personnalisé.'
  },
  {
    id: 'opt-6',
    icon: 'Code',
    name: 'Intégration spécifique',
    description: 'Connectez vos outils métier (API, logiciels spécialisés)',
    price: 'Selon complexité',
    note: 'Intégration standard incluse dès Essentiel. Intégrations avancées : sur devis.'
  }
];

// ========================
// FAQ COMPLETE (8 Q/R)
// ========================
export const faqs = [
  {
    id: 'faq-1',
    question: 'Est-ce que ça sera à mon nom / à mon image ?',
    answer: 'Oui, absolument. Nous configurons entièrement votre page de réservation à votre identité visuelle : votre logo, vos couleurs, vos textes de présentation. Vos clients voient uniquement votre nom et votre image professionnelle. Vous pouvez également utiliser votre propre nom de domaine (ex : rdv.votrecabinet.fr) ou profiter du sous-domaine inclus. Aucune mention d\'un outil tiers, tout est personnalisé à votre pratique.'
  },
  {
    id: 'faq-2',
    question: 'En combien de temps est-ce mis en place ?',
    answer: 'La mise en place démarre sous 7 jours après signature. Le délai de configuration complet dépend de vos besoins spécifiques : intégration sur votre site existant, activation des paiements en ligne, personnalisation des formulaires, etc. En général, une installation standard (page de réservation + rappels email) est opérationnelle en quelques jours. Nous vous accompagnons à chaque étape et vous formons lors d\'une session de 30 minutes.'
  },
  {
    id: 'faq-3',
    question: 'Mes clients reçoivent-ils des rappels ?',
    answer: 'Oui, les rappels sont inclus dans toutes les offres. Les rappels email et WhatsApp sont inclus dès l\'offre Essentiel. Les rappels SMS sont disponibles dans l\'offre Pro (50 SMS inclus par mois) et facturés au réel ensuite (0,09€ par SMS). Vous pouvez activer ou désactiver chaque canal de rappel selon vos préférences. Les rappels réduisent considérablement les absences et les oublis de rendez-vous.'
  },
  {
    id: 'faq-4',
    question: 'Puis-je demander un acompte / paiement en ligne ?',
    answer: 'Oui, à partir de l\'offre Pro. Vous pouvez activer les paiements en ligne et demander un acompte lors de la réservation pour sécuriser vos rendez-vous. Vous suivez toutes les transactions depuis votre tableau de bord. Les paiements sont sécurisés et conformes aux normes bancaires. Nous vous accompagnons dans la configuration et l\'activation selon vos besoins.'
  },
  {
    id: 'faq-5',
    question: 'Puis-je intégrer la réservation sur mon site ?',
    answer: 'Oui, l\'intégration est incluse dès l\'offre Essentiel. Vous pouvez intégrer la réservation directement sur votre site existant (lien simple, bouton, ou intégration complète) ou profiter du mini-site dédié que nous créons pour vous. Nous vous conseillons la solution la plus simple et la plus fiable selon votre situation. Si vous n\'avez pas de site, le mini-site inclus est parfait pour démarrer.'
  },
  {
    id: 'faq-6',
    question: 'Que couvrent les frais d\'installation ?',
    answer: 'Les frais d\'installation couvrent l\'ensemble de la mise en place : un rendez-vous de cadrage pour comprendre vos besoins, un questionnaire détaillé, le paramétrage complet de votre back-office (agenda, services, tarifs, disponibilités), la configuration de votre page de réservation personnalisée (design, textes, logo), l\'intégration sur votre site si nécessaire, des tests complets avant mise en ligne, et une mini-formation de 30 minutes pour vous expliquer l\'essentiel. C\'est un accompagnement complet pour démarrer sereinement.'
  },
  {
    id: 'faq-7',
    question: 'Quel support est inclus ?',
    answer: 'Le support est illimité dans toutes les offres. Nous répondons à toutes vos questions par email et via notre système de tickets. Une base de connaissances complète est également disponible. Le support WhatsApp est inclus dès l\'offre Pro. Le support téléphonique est inclus dans l\'offre Prime. Les urgences (blocage technique, problème critique) sont traitées en moins de 6 heures ouvrées. Les autres demandes (questions, ajustements, conseils) reçoivent une réponse sous 24 heures ouvrées. Nous restons disponibles dans le temps.'
  },
  {
    id: 'faq-8',
    question: 'Et si nous sommes plusieurs praticiens ?',
    answer: 'C\'est tout à fait possible ! La gestion multi-praticiens est disponible dans notre offre Sur mesure. Vous pouvez gérer plusieurs praticiens avec des agendas distincts ou partagés, des règles de réservation spécifiques par praticien, et une gestion centralisée ou décentralisée selon vos besoins. Contactez-nous pour un devis personnalisé : nous étudions votre situation et vous proposons une configuration adaptée à votre cabinet ou structure.'
  }
];

// ========================
// FAQ OFFRES (specifiques)
// ========================
export const faqsOffres = [
  {
    id: 'faq-off-1',
    question: 'Qu\'est-ce qui est inclus dans les frais d\'installation ?',
    answer: 'Les frais d\'installation couvrent l\'ensemble de la mise en place : rendez-vous de cadrage, formulaire de besoins détaillé, paramétrage complet du back-office (agenda, services, tarifs), configuration de votre page de réservation personnalisée (design, logo, textes), intégration sur votre site existant ou création d\'un mini-site dédié, tests complets avant mise en ligne, et mini-formation de 30 minutes pour vous expliquer l\'essentiel. C\'est un accompagnement complet et humain.'
  },
  {
    id: 'faq-off-2',
    question: 'Les SMS sont-ils inclus ?',
    answer: 'Les rappels SMS sont inclus dans l\'offre Pro : 50 SMS par mois. Au-delà, les SMS supplémentaires sont facturés au réel : 0,09€ par SMS. Vous pouvez activer ou désactiver les rappels SMS à tout moment selon vos besoins. Les rappels email et WhatsApp sont inclus dès l\'offre Essentiel sans limite.'
  },
  {
    id: 'faq-off-3',
    question: 'Puis-je commencer simple puis évoluer ?',
    answer: 'Oui, absolument. Vous pouvez démarrer avec l\'offre Essentiel et évoluer ensuite vers une offre supérieure (Pro ou Prime) si vos besoins évoluent. Vous pouvez également activer des options à la demande (espace client, SMS, multi-praticiens). Nous vous accompagnons dans cette évolution sans contrainte. Pas d\'engagement de durée, vous restez libre.'
  },
  {
    id: 'faq-off-4',
    question: 'Y a-t-il un engagement de durée ?',
    answer: 'Non, aucun engagement. Les abonnements sont mensuels et vous pouvez arrêter à tout moment. Nous préférons que vous restiez parce que vous êtes satisfait du service, pas par contrainte contractuelle. Seuls les frais d\'installation (payés une seule fois au démarrage) ne sont pas remboursables.'
  },
  {
    id: 'faq-off-5',
    question: 'Puis-je essayer avant de m\'engager ?',
    answer: 'Nous proposons un échange de 15 minutes (sans engagement) pour comprendre vos besoins et vous montrer comment fonctionne la solution. Vous pouvez également consulter nos exemples de pages de réservation sur la page "Exemples". Une fois l\'installation réalisée, vous disposez de 14 jours pour tester la solution dans votre pratique réelle. Si elle ne vous convient pas, nous vous remboursons l\'abonnement du premier mois (les frais d\'installation restent acquis).'
  },
  {
    id: 'faq-off-6',
    question: 'Quelle est la différence entre Pro et Prime ?',
    answer: 'L\'offre Pro est idéale pour la majorité des praticiens : paiements en ligne, fiche client personnalisée, notes internes, 50 SMS inclus, support renforcé via WhatsApp. L\'offre Prime ajoute des fonctionnalités avancées : facturation intégrée, exports de données, paramètres avancés, espace client, support prioritaire (urgences < 6h) et support téléphonique. Si vous avez besoin d\'un suivi financier intégré et d\'un support ultra-réactif, choisissez Prime. Sinon, Pro est parfait.'
  },
  {
    id: 'faq-off-7',
    question: 'Les paiements en ligne sont-ils sécurisés ?',
    answer: 'Oui, tous les paiements en ligne sont sécurisés et conformes aux normes bancaires (PCI-DSS). Nous utilisons des prestataires de paiement certifiés. Vos clients paient en toute sécurité par carte bancaire. Vous suivez toutes les transactions depuis votre tableau de bord. Les fonds sont versés directement sur votre compte bancaire selon les délais de votre prestataire de paiement.'
  },
  {
    id: 'faq-off-8',
    question: 'Puis-je changer d\'offre en cours d\'année ?',
    answer: 'Oui, vous pouvez changer d\'offre à tout moment. Passage à une offre supérieure : immédiat et sans frais. Passage à une offre inférieure : effectif au prochain renouvellement mensuel. Nous vous accompagnons dans ce changement et adaptons votre configuration selon votre nouvelle offre.'
  }
];

// ========================
// COMMENT CA MARCHE
// ========================
export const howItWorks = [
  {
    step: '1',
    title: 'Échange et personnalisation',
    description: 'Nous discutons de vos besoins lors d\'un appel de cadrage. Nous configurons ensuite votre page de réservation selon votre identité visuelle (logo, couleurs, textes) et vos services.'
  },
  {
    step: '2',
    title: 'Installation et formation',
    description: 'Nous paramétrons votre agenda, vos disponibilités, vos rappels et toutes les fonctionnalités choisies. Puis nous vous formons lors d\'une session de 30 minutes pour une prise en main rapide et efficace.'
  },
  {
    step: '3',
    title: 'Accompagnement continu',
    description: 'Vous bénéficiez d\'un support humain illimité (email, tickets, WhatsApp, téléphone selon offre). Nous restons disponibles pour vos questions, ajustements et évolutions. Mises à jour régulières incluses.'
  }
];

// ========================
// BLOG POSTS (placeholder realistes)
// ========================
export const blogPosts = [
  {
    id: '1',
    title: 'Comment choisir un système de réservation adapté à votre pratique',
    excerpt: 'Les critères essentiels pour sélectionner une solution de prise de rendez-vous qui correspond vraiment à vos besoins professionnels et à vos clients.',
    content: 'Contenu complet de l\'article...',
    author: 'Équipe Espace Agenda',
    date: '2025-01-20',
    category: 'Conseils',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Réduire les absences grâce aux rappels automatiques',
    excerpt: 'Email, SMS, WhatsApp : comment les rappels automatiques réduisent les absences de 60% et améliorent votre organisation quotidienne.',
    content: 'Contenu complet de l\'article...',
    author: 'Équipe Espace Agenda',
    date: '2025-01-18',
    category: 'Bonnes pratiques',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Personnaliser votre page de réservation à votre image',
    excerpt: 'Votre logo, vos couleurs, vos textes : créez une expérience de réservation 100% cohérente avec votre identité professionnelle.',
    content: 'Contenu complet de l\'article...',
    author: 'Équipe Espace Agenda',
    date: '2025-01-15',
    category: 'Personnalisation',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=400&fit=crop'
  },
  {
    id: '4',
    title: 'Les avantages de la réservation en ligne pour les psychologues',
    excerpt: 'Gain de temps, réduction des appels, meilleure organisation : comment la réservation en ligne transforme la gestion de votre cabinet.',
    content: 'Contenu complet de l\'article...',
    author: 'Équipe Espace Agenda',
    date: '2025-01-12',
    category: 'Métiers',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop'
  },
  {
    id: '5',
    title: 'Paiements en ligne et acomptes : sécuriser vos rendez-vous',
    excerpt: 'Comment demander un acompte en ligne réduit les annulations de dernière minute et professionnalise votre pratique.',
    content: 'Contenu complet de l\'article...',
    author: 'Équipe Espace Agenda',
    date: '2025-01-10',
    category: 'Fonctionnalités',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop'
  },
  {
    id: '6',
    title: 'RGPD et données clients : ce qu\'il faut savoir',
    excerpt: 'Conformité, consentements, droits des clients : comment gérer vos données en toute sécurité et dans le respect de la réglementation.',
    content: 'Contenu complet de l\'article...',
    author: 'Équipe Espace Agenda',
    date: '2025-01-08',
    category: 'Réglementation',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop'
  },
  {
    id: '7',
    title: 'Synchroniser votre agenda avec Google Agenda et Outlook',
    excerpt: 'Centralisez tous vos rendez-vous professionnels et personnels. La synchronisation bidirectionnelle expliquée simplement.',
    content: 'Contenu complet de l\'article...',
    author: 'Équipe Espace Agenda',
    date: '2025-01-05',
    category: 'Tutoriels',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop'
  },
  {
    id: '8',
    title: 'Gérer plusieurs praticiens dans un même cabinet',
    excerpt: 'Agendas partagés, règles de réservation, gestion centralisée : les bonnes pratiques pour les cabinets de groupe.',
    content: 'Contenu complet de l\'article...',
    author: 'Équipe Espace Agenda',
    date: '2025-01-03',
    category: 'Cabinets',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=400&fit=crop'
  },
  {
    id: '9',
    title: 'Intégrer la réservation sur votre site WordPress',
    excerpt: 'Tutoriel pas à pas pour intégrer votre page de réservation directement sur votre site WordPress existant.',
    content: 'Contenu complet de l\'article...',
    author: 'Équipe Espace Agenda',
    date: '2025-01-01',
    category: 'Tutoriels',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop'
  }
];

// ========================
// CTA GLOBAL
// ========================
export const globalCTA = {
  primary: 'Planifier un échange',
  secondary: 'Voir les demos',
  contact: 'Nous contacter'
};

// ========================
// MENTIONS LEGALES (contenu)
// ========================
export const legalInfo = {
  companyName: 'Espace Agenda',
  legalForm: 'Micro-entreprise',
  siret: '504 849 142 00048',
  address: '42 rue de Tauzia, 33800 Bordeaux',
  addressShort: 'Bordeaux, France',
  phone: '06 11 01 60 54',
  email: 'contact@espaceagenda.fr',
  director: 'Célestin Bouquet',
  lastUpdate: 'février 2026',
  hosting: {
    name: 'HOSTINGER INTERNATIONAL LTD',
    address: '61 Lordou Vironos Street, 6023 Larnaca, Chypre',
    website: 'https://www.hostinger.fr/contact'
  }
};
