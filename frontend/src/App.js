import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Solution from "./pages/Solution";
import Offres from "./pages/Offres";
import Exemples from "./pages/Exemples";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import { Toaster } from "./components/ui/sonner";

// Admin pages
import { AuthProvider, useAuth } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminPostEditor from "./pages/admin/AdminPostEditor";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminNewsletters from "./pages/admin/AdminNewsletters";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/gestion-x7k9p2/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          <CookieConsent />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Header />
                <main><Home /></main>
                <Footer />
              </>
            } />
            <Route path="/solution" element={
              <>
                <Header />
                <main><Solution /></main>
                <Footer />
              </>
            } />
            <Route path="/offres" element={
              <>
                <Header />
                <main><Offres /></main>
                <Footer />
              </>
            } />
            <Route path="/exemples" element={
              <>
                <Header />
                <main><Exemples /></main>
                <Footer />
              </>
            } />
            <Route path="/blog" element={
              <>
                <Header />
                <main><Blog /></main>
                <Footer />
              </>
            } />
            <Route path="/blog/:slug" element={
              <>
                <Header />
                <main><BlogPost /></main>
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Header />
                <main><Contact /></main>
                <Footer />
              </>
            } />
            <Route path="/mentions-legales" element={
              <>
                <Header />
                <main><MentionsLegales /></main>
                <Footer />
              </>
            } />
            <Route path="/confidentialite" element={
              <>
                <Header />
                <main><Confidentialite /></main>
                <Footer />
              </>
            } />

            {/* Admin Routes */}
            <Route path="/gestion-x7k9p2/login" element={<AdminLogin />} />
            <Route path="/gestion-x7k9p2/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/gestion-x7k9p2/posts" element={
              <ProtectedRoute>
                <AdminPosts />
              </ProtectedRoute>
            } />
            <Route path="/gestion-x7k9p2/posts/new" element={
              <ProtectedRoute>
                <AdminPostEditor />
              </ProtectedRoute>
            } />
            <Route path="/gestion-x7k9p2/posts/edit/:id" element={
              <ProtectedRoute>
                <AdminPostEditor />
              </ProtectedRoute>
            } />
            <Route path="/gestion-x7k9p2/contacts" element={
              <ProtectedRoute>
                <AdminContacts />
              </ProtectedRoute>
            } />
            <Route path="/gestion-x7k9p2/newsletters" element={
              <ProtectedRoute>
                <AdminNewsletters />
              </ProtectedRoute>
            } />

            {/* Catch-all : toute URL inconnue (dont l'ancienne /admin/login) renvoie à l'accueil */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
