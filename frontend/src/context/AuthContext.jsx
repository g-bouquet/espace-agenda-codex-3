import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

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

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const adminToken = localStorage.getItem('admin_token');
    if (adminToken === 'espace-agenda-admin-2025') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (password) => {
    // Vérification du mot de passe depuis la variable d'environnement
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123';
    if (password === adminPassword) {
      localStorage.setItem('admin_token', 'espace-agenda-admin-2025');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};