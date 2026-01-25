import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API}/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error('Erreur chargement contacts:', error);
      toast.error('Erreur lors du chargement des contacts');
    } finally {
      setLoading(false);
    }
  };

  const getSubjectLabel = (subject) => {
    const labels = {
      'installation': 'Demande d\'installation',
      'demo': 'Demande de démonstration',
      'devis': 'Demande de devis',
      'info': 'Demande d\'informations',
      'support': 'Support technique',
      'autre': 'Autre'
    };
    return labels[subject] || subject;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Messages de contact</h1>
              <p className="text-sm text-neutral-600">{contacts.length} message(s) reçu(s)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Contacts List */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Mail className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600">Aucun message pour le moment</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {contacts.map((contact) => (
              <Card
                key={contact.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedContact(contact)}
              >
                <CardContent className="pt-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                        {contact.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Mail className="h-3 w-3" />
                        <span>{contact.email}</span>
                      </div>
                      {contact.phone && (
                        <div className="flex items-center gap-2 text-sm text-neutral-600 mt-1">
                          <Phone className="h-3 w-3" />
                          <span>{contact.phone}</span>
                        </div>
                      )}
                    </div>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                      {getSubjectLabel(contact.subject)}
                    </Badge>
                  </div>

                  {/* Message Preview */}
                  <div className="bg-neutral-50 rounded-lg p-4 mb-3">
                    <p className="text-neutral-700 line-clamp-3">{contact.message}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Reçu le {new Date(contact.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal Contact Detail */}
      {selectedContact && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedContact(null)}
        >
          <Card
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    {selectedContact.name}
                  </h2>
                  <Badge className="bg-amber-100 text-amber-700">
                    {getSubjectLabel(selectedContact.subject)}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedContact(null)}
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-neutral-600">Email</label>
                  <p className="text-neutral-900">{selectedContact.email}</p>
                </div>

                {selectedContact.phone && (
                  <div>
                    <label className="text-sm font-medium text-neutral-600">Téléphone</label>
                    <p className="text-neutral-900">{selectedContact.phone}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-neutral-600">Date de réception</label>
                  <p className="text-neutral-900">
                    {new Date(selectedContact.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-600">Message</label>
                  <div className="mt-2 bg-neutral-50 rounded-lg p-4">
                    <p className="text-neutral-900 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button
                    className="flex-1 bg-amber-700 hover:bg-amber-800"
                    onClick={() => window.open(`mailto:${selectedContact.email}`)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Répondre par email
                  </Button>
                  {selectedContact.phone && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(`tel:${selectedContact.phone}`)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
