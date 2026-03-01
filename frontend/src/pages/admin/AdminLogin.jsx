import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = login(password);
    
    if (success) {
      toast.success('Connexion réussie');
      navigate('/admin/dashboard');
    } else {
      toast.error('Mot de passe incorrect');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-amber-700" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900">Administration</h2>
          <p className="text-neutral-600 mt-2">Espace Agenda - Connexion</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-900 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                placeholder="Entrez le mot de passe admin"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;