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
    price: '29€ / mois TTC',
    installation: '149€ TTC (une fois)',
    features: [
      'Page de réservation à votre nom (sous-domaine inclus)',
      'Réservation 24/7 + confirmations',
      'Rappels email inclus',
      'Annulation / replanification côté client',
      'Support standard (tickets + base de connaissance)'
    ],
    highlight: false
  },
  {
    id: '2',
    name: 'Pro',
    description: 'La solution complète pour votre activité',
    price: '45€ / mois TTC',
    installation: '249€ TTC (une fois)',
    sms: 'SMS disponible : 0,09€ / SMS',
    features: [
      'Tout Essentiel',
      'Paiements & acomptes (si activés)',
      'Formulaires / champs personnalisés (fiche client)',
      'Notes internes + historique client',
      'Tableau de bord & suivi (selon configuration)',
      'Support renforcé (tickets + WhatsApp)'
    ],
    highlight: true
  },
  {
    id: '3',
    name: 'Premium',
    description: 'Pour une gestion avancée',
    price: '79€ / mois TTC',
    installation: '399€ TTC (une fois)',
    sms: 'SMS disponible : 0,09€ / SMS',
    features: [
      'Tout Pro',
      'Import / export (si disponible)',
      'Facturation ou exports pour facturation (selon configuration)',
      'Paramétrages avancés (selon besoin)',
      'Support prioritaire (urgent <6h • autres <24h) + téléphone'
    ],
    highlight: false
  },
  {
    id: '4',
    name: 'Sur mesure',
    description: 'Une solution adaptée à vos besoins spécifiques',
    price: 'Devis',
    installation: '',
    features: [
      'Multi-praticiens',
      'Migrations',
      'Intégrations spécifiques',
      'Règles avancées',
      'Configuration personnalisée'
    ],
    highlight: false,
    isCustom: true
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
    question: 'Est-ce que c\'est à mon nom / à mon image ?',
    answer: 'Oui. Nous configurons l\'interface aux couleurs de votre cabinet (logo, couleurs, textes). Vos clients voient uniquement votre identité. Option : votre nom de domaine.'
  },
  {
    id: '2',
    question: 'En combien de temps c\'est mis en place ?',
    answer: 'Après signature, la mise en place démarre sous 7 jours. Le délai exact dépend de vos besoins (paiements, formulaires, intégration sur votre site).'
  },
  {
    id: '3',
    question: 'Dois-je être à l\'aise avec la technique ?',
    answer: 'Non. Nous installons et configurons. Vous recevez une mini-formation de 30 minutes pour prendre en main l\'essentiel.'
  },
  {
    id: '4',
    question: 'Est-ce que mes clients reçoivent des rappels ?',
    answer: 'Oui : rappels email inclus. Les SMS sont possibles selon l\'offre, facturés au réel (0,09€ / SMS).'
  },
  {
    id: '5',
    question: 'Puis-je demander un acompte ou un paiement en ligne ?',
    answer: 'Oui, selon l\'offre. Vous pouvez activer les paiements et/ou les acomptes pour sécuriser les rendez-vous.'
  },
  {
    id: '6',
    question: 'Est-ce que je peux avoir des notes internes et une fiche client ?',
    answer: 'Oui, selon l\'offre. Notes internes + champs personnalisés pour adapter la fiche client à votre pratique.'
  },
  {
    id: '7',
    question: 'Mes données sont-elles protégées ?',
    answer: 'Oui. Accès sécurisé et bonnes pratiques de protection des données. Nous vous aidons à paramétrer correctement les accès et les informations demandées.'
  },
  {
    id: '8',
    question: 'Quel support est inclus ?',
    answer: 'Support illimité + base de connaissances. Urgences : réponse < 6h ouvrées. Autres demandes : réponse < 24h ouvrées. Canaux : email, tickets, WhatsApp, et téléphone selon l\'offre.'
  },
  {
    id: '9',
    question: 'Puis-je intégrer la réservation sur mon site existant ?',
    answer: 'Oui. Lien simple, bouton, ou intégration : on vous conseille la solution la plus simple et fiable.'
  },
  {
    id: '10',
    question: 'Je suis en cabinet / à plusieurs praticiens : possible ?',
    answer: 'Oui, selon le besoin : multi-praticiens et réglages avancés possibles en option ou via une configuration sur mesure.'
  }
];

export const faqsOffres = [
  {
    id: 'A',
    question: 'Qu\'est-ce qui est inclus dans les frais d\'installation ?',
    answer: 'Rendez-vous de cadrage, formulaire de besoins, paramétrage du back-office, configuration côté client (ou intégration sur votre site), tests, et mini-formation (30 min).'
  },
  {
    id: 'B',
    question: 'Les SMS sont-ils inclus ?',
    answer: 'Les SMS sont disponibles selon l\'offre et facturés au réel : 0,09€ / SMS (activation/désactivation possible).'
  },
  {
    id: 'C',
    question: 'Puis-je commencer simple puis évoluer ?',
    answer: 'Oui. Vous pouvez démarrer avec une offre et évoluer ensuite (options ou offre supérieure).'
  }
];