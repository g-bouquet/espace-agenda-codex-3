import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { FileText, Mail, Plus, LogOut, Users } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalContacts: 0,
    totalNewsletters: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postsRes, contactsRes, newsletterRes] = await Promise.all([
          axios.get(`${API}/blog/posts?published=false`),
          axios.get(`${API}/contacts`),
          axios.get(`${API}/newsletter/subscribers`)
        ]);
        setStats({
          totalPosts: postsRes.data.total,
          totalContacts: contactsRes.data.length,
          totalNewsletters: newsletterRes.data.length
        });
      } catch (error) {
        console.error('Erreur chargement statistiques:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Administration</h1>
            <p className="text-sm text-neutral-600">Espace Agenda CMS</p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Articles de blog</p>
                  <p className="text-3xl font-bold text-neutral-900 mt-2">{stats.totalPosts}</p>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-amber-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Messages de contact</p>
                  <p className="text-3xl font-bold text-neutral-900 mt-2">{stats.totalContacts}</p>
                </div>
                <div className="h-12 w-12 bg-sky-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-sky-800" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Abonnés newsletter</p>
                  <p className="text-3xl font-bold text-neutral-900 mt-2">{stats.totalNewsletters}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <h3 className="text-xl font-semibold text-neutral-900">Gestion des articles</h3>
              <p className="text-neutral-600 mt-2">Créer, modifier et supprimer des articles de blog</p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Link to="/admin/posts" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Gérer les articles
                  </Button>
                </Link>
                <Link to="/admin/posts/new" className="flex-1">
                  <Button className="w-full bg-amber-700 hover:bg-amber-800">
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvel article
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <h3 className="text-xl font-semibold text-neutral-900">Messages de contact</h3>
              <p className="text-neutral-600 mt-2">Consulter les messages reçus via le formulaire</p>
            </CardHeader>
            <CardContent>
              <Link to="/admin/contacts">
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Voir les messages
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <h3 className="text-xl font-semibold text-neutral-900">Newsletter</h3>
              <p className="text-neutral-600 mt-2">Gérer les abonnés à la newsletter</p>
            </CardHeader>
            <CardContent>
              <Link to="/admin/newsletters">
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Voir les abonnés
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;