import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, Globe, Bell, CreditCard, Users, Shield, ArrowRight,
  Check, X, Phone, Mail, MessageSquare, Zap, Star, Clock, Settings,
  FileText, UserCheck, Headphones, BarChart3, Database, Lock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { faqs, globalCTA, keyFeatures } from '../content';
import { useInView } from 'react-intersection-observer';
import HeroSection from '../components/HeroSection';

const iconMap = {
  Calendar, Globe, Bell, CreditCard, FileText, Users, UserCheck,
  Shield, Users2: Users, Headphones
};

const Solution = () => {
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: whyRef, inView: whyInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: compareRef, inView: compareInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const integrations = [
    { name: 'Google Agenda', icon: Calendar },
    { name: 'Outlook', icon: Mail },
    { name: 'Apple Calendar', icon: Calendar },
    { name: 'Zoom', icon: Phone },
    { name: 'Google Meet', icon: MessageSquare },
    { name: 'Google Analytics', icon: BarChart3 },
    { name: 'Stripe / Paiements', icon: CreditCard },
    { name: 'Zapier / API', icon: Zap },
    { name: 'Mailchimp', icon: Mail },
    { name: 'Google Tag Manager', icon: Settings },
    { name: 'WordPress', icon: Globe },
    { name: 'Facebook Pixel', icon: Database },
  ];

  const comparisonRows = [
    { feature: 'Disponibilité', manual: 'Horaires bureau uniquement', ea: '24h/24, 7j/7' },
    { feature: 'Rappels clients', manual: 'Manuelle (appel, SMS)', ea: 'Automatiques (email, SMS, WhatsApp)' },
    { feature: 'Annulations / reports', manual: 'Gestion chronophage', ea: 'Client autonome en ligne' },
    { feature: 'Paiements & acomptes', manual: 'Virement manuel ou espèces', ea: 'En ligne, sécurisé, automatique' },
    { feature: 'Suivi clients', manual: 'Agenda papier ou tableur', ea: 'Fiche client centralisée, historique' },
    { feature: 'Image professionnelle', manual: 'Outil générique visible', ea: 'À votre nom, vos couleurs' },
    { feature: 'Temps administratif', manual: '2h+ par semaine', ea: 'Moins de 15 min/semaine' },
  ];

  const whyPoints = [
    {
      icon: Zap,
      title: 'Installation clé en main',
      description: "Nous configurons tout pour vous : agenda, services, personnalisation visuelle, intégration sur votre site. Vous démarrez sans stress et sans compétences techniques requises."
    },
    {
      icon: UserCheck,
      title: 'Personnalisé à votre image',
      description: "Votre logo, vos couleurs, votre nom de domaine. Vos clients ne voient que vous — aucune mention d'un outil tiers. Une expérience cohérente et professionnelle du premier au dernier clic."
    },
    {
      icon: Headphones,
      title: 'Support humain, réactif et durable',
      description: "Une question après 3 mois ? Vous nous écrivez, on vous répond. Urgences traitées sous 6h. Nous ne disparaissons pas après l'installation."
    },
    {
      icon: Shield,
      title: 'Sécurité & conformité RGPD',
      description: "Hébergement sécurisé, données chiffrées, gestion des consentements et des droits clients. Votre pratique est protégée, vos données restent les vôtres."
    },
    {
      icon: Settings,
      title: 'Adapté à votre pratique',
      description: "Durées de séance, motifs de consultation, règles de réservation spécifiques, questionnaires préalables — nous configurons selon votre fonctionnement, pas l'inverse."
    },
    {
      icon: Clock,
      title: 'Évolutif avec vous',
      description: "Vous démarrez simple et évoluez à votre rythme. Activation de nouvelles fonctionnalités, changement d'offre, ajout d'un praticien — tout est possible sans contrainte."
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        title="Tout ce qu'il faut pour gérer vos rendez-vous —"
        titleHighlight="à votre nom"
        description="Plateforme installée et configurée pour votre pratique : réservation en ligne, rappels automatiques, paiements et support humain inclus."
        backgroundImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&q=80"
        ctaText={globalCTA.primary}
      />

      {/* Comment ça marche */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Comment ça marche ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              En 3 étapes simples, vous disposez de votre plateforme de réservation personnalisée
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Cadrage (15-30 min)',
                  description: "Nous discutons de vos besoins, vos horaires, vos services, vos règles. Un formulaire détaillé pour tout paramétrer selon votre pratique."
                },
                {
                  step: '2',
                  title: 'Installation + paramétrage',
                  description: "Nous configurons votre plateforme de A à Z. Personnalisation visuelle, intégration sur votre site, activation des rappels et paiements selon votre offre."
                },
                {
                  step: '3',
                  title: 'Formation (30 min) + support',
                  description: "Une mini-session pour vous expliquer l'essentiel. Puis notre équipe reste disponible pour toutes vos questions et évolutions."
                }
              ].map((item) => (
                <Card key={item.step} className="border-border hover:border-primary transition-all duration-300 hover:shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold font-heading shadow-md mb-6">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold font-heading text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnalités complètes */}
      <section ref={featuresRef} className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Toutes les fonctionnalités
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Une solution complète, pensée pour les praticiens indépendants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Calendar;
              return (
                <Card
                  key={feature.id}
                  className={`border-border hover:border-primary transition-all duration-500 hover:shadow-lg ${
                    featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: featuresInView ? `${index * 60}ms` : '0ms' }}
                >
                  <CardContent className="pt-6">
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                        <p className="mt-2 text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparaison gestion manuelle vs Espace Agenda */}
      <section ref={compareRef} className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Avant et après Espace Agenda
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ce que change concrètement une solution de réservation bien configurée
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 bg-gray-100 text-gray-600 font-medium text-sm w-1/3">Aspect</th>
                  <th className="text-center py-4 px-6 bg-gray-100 text-gray-600 font-medium text-sm w-1/3">
                    <span className="flex items-center justify-center gap-2">
                      <X className="h-4 w-4 text-red-400" />
                      Gestion manuelle
                    </span>
                  </th>
                  <th className="text-center py-4 px-6 bg-primary text-white font-medium text-sm w-1/3">
                    <span className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4" />
                      Avec Espace Agenda
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="py-4 px-6 text-foreground font-medium text-sm">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-red-500 text-sm">{row.manual}</td>
                    <td className="py-4 px-6 text-center text-green-700 text-sm font-medium bg-primary/5">{row.ea}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pourquoi Espace Agenda */}
      <section ref={whyRef} className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Pourquoi Espace Agenda ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Pas juste un outil, un accompagnement dans la durée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className={`flex gap-4 transition-all duration-500 ${
                    whyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: whyInView ? `${index * 80}ms` : '0ms' }}
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{point.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Intégrations */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Intégrations incluses
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Espace Agenda se connecte aux outils que vous utilisez déjà
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {integrations.map((integration, index) => {
              const Icon = integration.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 hover:shadow-warm-md hover:-translate-y-1"
                  style={{ backgroundColor: '#F4F0E8', borderColor: '#E2DFD8', color: '#5A7161' }}
                >
                  <div className="h-9 w-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(90,113,97,0.12)' }}>
                    <Icon className="h-5 w-5" style={{ color: '#5A7161' }} />
                  </div>
                  <span className="text-xs font-medium text-center leading-tight" style={{ color: '#2C352D' }}>{integration.name}</span>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Et bien d'autres selon votre offre. Intégrations spécifiques disponibles sur devis.
          </p>
        </div>
      </section>

      {/* Sécurité & RGPD */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-primary/10 text-primary mb-4">Sécurité & conformité</Badge>
              <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl mb-6">
                Vos données et celles de vos clients sont protégées
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Conformité RGPD complète, hébergement sécurisé, gestion des consentements — nous avons pensé à tout pour que vous puissiez exercer sereinement.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Lock, text: 'Connexions chiffrées (HTTPS/SSL) pour tous les échanges' },
                  { icon: Shield, text: 'Conformité RGPD : consentements, droits d\'accès, rectification, suppression' },
                  { icon: Database, text: 'Hébergement fiable avec sauvegardes régulières' },
                  { icon: UserCheck, text: 'Accès sécurisés avec gestion des rôles (admin, praticien, client)' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-0.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-muted-foreground">{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Ce que nous gérons pour vous</h3>
              <div className="space-y-4">
                {[
                  { label: 'Politique de confidentialité', status: 'Incluse et personnalisée' },
                  { label: 'Mentions légales', status: 'Fournies et à jour' },
                  { label: 'Consentements clients', status: 'Gestion automatique' },
                  { label: 'Droit d\'accès et suppression', status: 'Processus défini' },
                  { label: 'Cookies et traceurs', status: 'Gestion intégrée' },
                  { label: 'Sauvegardes données', status: 'Automatiques et régulières' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white scroll-mt-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Questions fréquentes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tout ce que vous voulez savoir avant de démarrer
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="bg-muted border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Vous avez d'autres questions ?</p>
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary-hover text-white">
                Posez-nous directement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-heading tracking-tight sm:text-4xl">
              Prêt à simplifier votre gestion ?
            </h2>
            <p className="mt-6 text-lg leading-8" style={{ color: 'rgba(249,246,240,0.75)' }}>
              Discutons de votre pratique et trouvons ensemble la solution la plus adaptée.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="rounded-full font-medium px-8" style={{ backgroundColor: '#F9F6F0', color: '#2C352D' }}>
                  {globalCTA.primary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/offres">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Voir les offres
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solution;
