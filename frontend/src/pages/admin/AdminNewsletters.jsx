import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Mail, Calendar, Download, Trash2, Users } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminNewsletters = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get(`${API}/newsletter/subscribers`);
      setSubscribers(response.data);
    } catch (error) {
      console.error('Erreur chargement abonnés:', error);
      toast.error('Erreur lors du chargement des abonnés');
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async (email) => {
    if (!window.confirm(`Désabonner ${email} ?`)) return;
    try {
      await axios.delete(`${API}/newsletter/subscribers/${encodeURIComponent(email)}`);
      toast.success('Abonné désabonné avec succès');
      setSubscribers(prev => prev.filter(s => s.email !== email));
    } catch (error) {
      toast.error('Erreur lors du désabonnement');
    }
  };

  const exportCSV = () => {
    const header = 'Email,Nom,Date inscription\n';
    const rows = subscribers.map(s =>
      `${s.email},${s.name || ''},${new Date(s.subscribed_at).toLocaleDateString('fr-FR')}`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter_abonnes_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">Newsletter</h1>
                <p className="text-sm text-neutral-600">{subscribers.length} abonné(s) actif(s)</p>
              </div>
            </div>
            {subscribers.length > 0 && (
              <Button onClick={exportCSV} variant="outline" size="sm" data-testid="export-csv-btn">
                <Download className="h-4 w-4 mr-2" />
                Exporter CSV
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Total abonnés</p>
                <p className="text-3xl font-bold text-neutral-900">{subscribers.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Avec nom renseigné</p>
                <p className="text-3xl font-bold text-neutral-900">{subscribers.filter(s => s.name).length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Ce mois</p>
                <p className="text-3xl font-bold text-neutral-900">
                  {subscribers.filter(s => {
                    const d = new Date(s.subscribed_at);
                    const now = new Date();
                    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {subscribers.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Mail className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600 font-medium mb-2">Aucun abonné pour le moment</p>
              <p className="text-neutral-500 text-sm">Les inscriptions newsletter apparaîtront ici</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6 px-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-6 text-sm font-medium text-neutral-600">Email</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-neutral-600">Nom</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-neutral-600">Date d'inscription</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-neutral-600">Statut</th>
                      <th className="py-3 px-6"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <td className="py-4 px-6 text-sm text-neutral-900 font-medium">{subscriber.email}</td>
                        <td className="py-4 px-6 text-sm text-neutral-600">{subscriber.name || '—'}</td>
                        <td className="py-4 px-6 text-sm text-neutral-600">
                          {new Date(subscriber.subscribed_at).toLocaleDateString('fr-FR', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </td>
                        <td className="py-4 px-6">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Actif</Badge>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUnsubscribe(subscriber.email)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminNewsletters;
