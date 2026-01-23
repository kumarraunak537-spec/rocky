import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Collections from './pages/Collections';
import Journal from './pages/Journal';
import Contact from './pages/Contact';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import ArticleView from './pages/ArticleView';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProductManager from './pages/admin/ProductManager';
import ProductEditor from './pages/admin/ProductEditor';
import SiteSettings from './pages/admin/SiteSettings';
import ThemeSettings from './pages/admin/ThemeSettings';
import PageManager from './pages/admin/PageManager';
import SectionEditor from './pages/admin/SectionEditor';
import NavigationManager from './pages/admin/NavigationManager';
import ContentManager from './pages/admin/ContentManager';
import ContentEditor from './pages/admin/ContentEditor';
import ProtectedRoute from './components/ProtectedRoute';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import MaintenanceGuard from './components/MaintenanceGuard';
import HeadManager from './components/HeadManager';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <HeadManager />
      <div className="app">
        <Routes>
          {/* Public Routes with Header/Footer */}
          <Route element={
            <MaintenanceGuard>
              <Header />
              <main>
                <Outlet />
              </main>
              <Footer />
            </MaintenanceGuard>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:gender" element={<Collections />} />
            <Route path="/collections/:gender/:subcategory" element={<Collections />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:id" element={<ArticleView />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pages" element={<PageManager />} />
            <Route path="pages/:pageId/sections" element={<SectionEditor />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="products/new" element={<ProductEditor />} />
            <Route path="products/:id/edit" element={<ProductEditor />} />
            <Route path="navigation" element={<NavigationManager />} />
            <Route path="settings" element={<SiteSettings />} />
            <Route path="theme" element={<ThemeSettings />} />
            <Route path="content" element={<ContentManager />} />
            <Route path="content/new" element={<ContentEditor />} />
            <Route path="content/:id/edit" element={<ContentEditor />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
