// Mock data pour Espace Agenda

export const blogPosts = [
  {
    id: '1',
    title: 'Comment choisir une solution de prise de rendez-vous adaptée à votre pratique',
    excerpt: 'Découvrez les critères essentiels pour sélectionner un système de réservation en ligne qui correspond réellement à vos besoins professionnels.',
    content: 'Contenu complet de l\'article...',
    author: 'Équipe Espace Agenda',
    date: '2025-01-15',
    category: 'Conseils',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Les avantages de la prise de rendez-vous en ligne pour les praticiens',
    excerpt: 'Gain de temps, réduction des absences, automatisation : découvrez comment la réservation en ligne transforme votre quotidien professionnel.',
    content: 'Contenu complet de l\'article...',
    author: 'Équipe Espace Agenda',
    date: '2025-01-10',
    category: 'Avantages',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Personnaliser votre plateforme de réservation en marque blanche',
    excerpt: 'Votre identité visuelle, vos couleurs, votre logo : créez une expérience 100% cohérente avec votre image professionnelle.',
    content: 'Contenu complet de l\'article...',
    author: 'Équipe Espace Agenda',
    date: '2025-01-05',
    category: 'Personnalisation',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=400&fit=crop'
  }
];

export const features = [
  {
    id: '1',
    icon: 'Calendar',
    title: 'Agenda intelligent',
    description: 'Gérez vos disponibilités en temps réel avec synchronisation automatique de vos rendez-vous.'
  },
  {
    id: '2',
    icon: 'Globe',
    title: 'Site de réservation',
    description: 'Votre propre site de prise de rendez-vous, accessible 24h/24, adapté à votre image.'
  },
  {
    id: '3',
    icon: 'Bell',
    title: 'Rappels automatiques',
    description: 'Réduisez les absences grâce aux notifications automatiques par email et SMS.'
  },
  {
    id: '4',
    icon: 'CreditCard',
    title: 'Paiements en ligne',
    description: 'Acceptez les paiements et acomptes directement lors de la réservation.'
  },
  {
    id: '5',
    icon: 'Users',
    title: 'Espace client',
    description: 'Vos clients accèdent à leur historique, documents et prochains rendez-vous.'
  },
  {
    id: '6',
    icon: 'Shield',
    title: 'Données sécurisées',
    description: 'Conformité RGPD et hébergement sécurisé de toutes vos données professionnelles.'
  }
];

export const offers = [
  {
    id: '1',
    name: 'Essentiel',
    description: 'Pour démarrer en toute simplicité',
    price: 'Sur devis',
    features: [
      'Site de réservation personnalisé',
      'Agenda en ligne',
      'Rappels automatiques par email',
      'Espace client',
      'Support technique'
    ],
    highlight: false
  },
  {
    id: '2',
    name: 'Professionnel',
    description: 'La solution complète pour votre activité',
    price: 'Sur devis',
    features: [
      'Tout de l\'offre Essentiel',
      'Rappels SMS',
      'Paiements en ligne',
      'Synchronisation calendrier',
      'Statistiques avancées',
      'Support prioritaire'
    ],
    highlight: true
  },
  {
    id: '3',
    name: 'Sur mesure',
    description: 'Une solution adaptée à vos besoins spécifiques',
    price: 'Sur devis',
    features: [
      'Tout de l\'offre Professionnelle',
      'Fonctionnalités personnalisées',
      'Intégrations sur mesure',
      'Formation approfondie',
      'Accompagnement dédié'
    ],
    highlight: false
  }
];

export const howItWorks = [
  {
    step: '1',
    title: 'Échange et personnalisation',
    description: 'Nous discutons de vos besoins et configurons votre plateforme selon votre identité visuelle.'
  },
  {
    step: '2',
    title: 'Installation et formation',
    description: 'Nous installons la solution et vous formons à son utilisation pour une prise en main optimale.'
  },
  {
    step: '3',
    title: 'Accompagnement continu',
    description: 'Vous bénéficiez d\'un support humain et d\'évolutions régulières de votre plateforme.'
  }
];

export const faqs = [
  {
    id: '1',
    question: 'Que veut dire "à votre nom" ?',
    answer: 'Vos clients voient votre identité (logo, couleurs, nom) sans mention d\'un outil tiers. La plateforme de réservation est entièrement à votre image, comme si vous l\'aviez créée vous-même.'
  },
  {
    id: '2',
    question: 'Puis-je l\'intégrer sur mon site existant ?',
    answer: 'Oui, tout à fait. Nous pouvons intégrer la solution directement sur votre site existant via un lien ou une intégration complète. Si vous n\'avez pas encore de site, nous créons une page de réservation dédiée.'
  },
  {
    id: '3',
    question: 'Quand suis-je facturé·e ?',
    answer: 'La facturation débute 7 jours après la signature de votre contrat. Vous avez ainsi le temps de valider la solution mise en place avant le début de la facturation.'
  },
  {
    id: '4',
    question: 'Combien de temps faut-il pour mettre en place la solution ?',
    answer: 'La mise en place complète prend généralement entre 2 et 4 semaines, incluant la personnalisation, l\'installation, la formation et les tests. Nous adaptons le planning à vos contraintes.'
  },
  {
    id: '5',
    question: 'Ai-je besoin de compétences techniques ?',
    answer: 'Non, aucune compétence technique n\'est nécessaire. Nous installons et configurons tout pour vous, puis nous vous formons à l\'utilisation quotidienne en 30 minutes. L\'interface est très intuitive.'
  },
  {
    id: '6',
    question: 'Mes données sont-elles sécurisées ?',
    answer: 'Absolument. Toutes les données sont hébergées de manière sécurisée avec un respect strict du RGPD. Vous restez propriétaire de vos données à tout moment.'
  },
  {
    id: '7',
    question: 'Quel type de support est inclus ?',
    answer: 'Vous bénéficiez d\'un support humain illimité par email et téléphone. Nous sommes là pour répondre à vos questions et vous accompagner dans l\'utilisation et l\'évolution de votre plateforme.'
  }
];