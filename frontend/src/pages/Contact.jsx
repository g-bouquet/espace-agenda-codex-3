import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import { contactInfo, globalCTA } from '../content';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    profession: '',
    message: '',
    gdprConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        toast.success("Message envoyé !", {
          description: response.data.message,
        });
        
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          profession: '',
          message: '',
          gdprConsent: false
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      
      const errorMessage = error.response?.data?.detail || 
                          "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.";
      
      toast.error("Erreur", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        title="Parlez-nous de votre pratique"
        description="Réponse sous 24h ouvrées • Vous hésitez entre 2 offres ? On vous oriente."
        showCta={false}
        backgroundImage="https://images.unsplash.com/photo-1765447041709-9f1efbc81606?crop=entropy&cs=srgb&fm=jpg&q=85"
      />

      {/* Contact Section */}
      <section className="py-20" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="font-heading font-medium text-3xl mb-6" style={{ color: '#2C352D' }}>
                  Nos coordonnées
                </h2>
              </div>

              {[
                { Icon: Mail, label: 'Email', content: contactInfo.email, href: `mailto:${contactInfo.email}` },
                { Icon: Phone, label: 'Téléphone', content: contactInfo.phone, note: 'Lun–Ven • 9h–18h', href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
                { Icon: MapPin, label: 'Localisation', content: contactInfo.locationShort, href: null },
              ].map(({ Icon, label, content, note, href }, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl" style={{ backgroundColor: '#F4F0E8', border: '1px solid #E2DFD8' }}>
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(90,113,97,0.12)', color: '#5A7161' }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: '#2C352D' }}>{label}</h3>
                    {href ? (
                      <a href={href} className="transition-colors hover:underline" style={{ color: '#5E6C60' }}>{content}</a>
                    ) : (
                      <p style={{ color: '#5E6C60' }}>{content}</p>
                    )}
                    {note && <p className="text-xs mt-1" style={{ color: '#5E6C60', opacity: 0.7 }}>{note}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl p-8 lg:p-10" style={{ backgroundColor: '#F4F0E8', border: '1px solid #E2DFD8' }}>
                <h2 className="font-heading font-medium text-3xl mb-8" style={{ color: '#2C352D' }}>
                  Envoyez-nous un message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                          placeholder="Votre nom"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                          placeholder="votre.email@exemple.fr"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                          placeholder="06 12 34 56 78"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                          Sujet *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="installation">Démarrer mon installation</option>
                          <option value="offre">Choisir mon offre (29/45/79)</option>
                          <option value="domaine">Nom de domaine / intégration site</option>
                          <option value="sms-paiements">SMS / paiements</option>
                          <option value="sur-mesure">Sur mesure</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="profession" className="block text-sm font-medium text-foreground mb-2">
                        Votre métier (optionnel)
                      </label>
                      <input
                        type="text"
                        id="profession"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                        placeholder="Ex: Psychologue, Ostéopathe, Coach..."
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="flex w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent resize-none"
                        placeholder="Décrivez votre projet ou votre demande..."
                      />
                    </div>

                    <div>
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          name="gdprConsent"
                          required
                          checked={formData.gdprConsent}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm text-muted-foreground">
                          J'accepte d'être recontacté·e concernant ma demande *
                        </span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.gdprConsent}
                      className="w-full rounded-full text-white font-medium"
                      style={{ backgroundColor: '#5A7161' }}
                      size="lg"
                      data-testid="contact-submit-button"
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer votre message'}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="text-xs text-center mt-2" style={{ color: '#5E6C60' }}>
                      Réponse sous 24h ouvrées (urgences &lt; 6h)
                    </p>
                  </form>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16" style={{ backgroundColor: '#F4F0E8' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading font-medium text-3xl mb-4" style={{ color: '#2C352D' }}>
              Délai de réponse
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#5E6C60' }}>
              Nous nous engageons à vous répondre sous 24 heures ouvrées.
              Pour toute urgence, n'hésitez pas à nous contacter directement par téléphone.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;