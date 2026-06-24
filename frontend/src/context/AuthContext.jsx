import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const API = process.env.REACT_APP_BACKEND_URL;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Vérification du token JWT côté serveur au montage
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('admin_jwt');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API}/api/admin/verify`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('admin_jwt');
        }
      } catch {
        localStorage.removeItem('admin_jwt');
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  // Login : validation côté serveur, retourne le JWT signé
  const login = async (password) => {
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('admin_jwt', data.token);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_jwt');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
