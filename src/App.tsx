import React, { useState, useCallback } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import ServicosPage from './pages/ServicosPage';
import ContatoPage from './pages/ContatoPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContaPage from './pages/ContaPage';
import SobrePage from './pages/SobrePage';
import BottomNav from './components/BottomNav';

type Page = 'inicio' | 'servicos' | 'contato' | 'login' | 'cadastro' | 'conta' | 'sobre';
type TabType = 'inicio' | 'servicos' | 'contato' | 'conta';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('inicio');
  const [activeTab, setActiveTab] = useState<TabType>('inicio');

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page);
    // Update active tab if navigating to a tab page
    if (['inicio', 'servicos', 'contato'].includes(page)) {
      setActiveTab(page as TabType);
    }
    if (page === 'conta') {
      setActiveTab('conta');
    }
  }, []);

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(tab as Page);
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  const showBottomNav = ['inicio', 'servicos', 'contato', 'conta', 'login'].includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <HomePage onNavigate={handleNavigate} />;
      case 'servicos':
        return <ServicosPage />;
      case 'contato':
        return <ContatoPage />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'cadastro':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'conta':
        return <ContaPage onNavigate={handleNavigate} />;
      case 'sobre':
        return <SobrePage onBack={() => handleNavigate('inicio')} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] max-w-lg mx-auto relative">
      {/* Page content */}
      <main className="min-h-screen">
        {renderPage()}
      </main>

      {/* Bottom navigation */}
      {showBottomNav && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
