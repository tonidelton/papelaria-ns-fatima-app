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
import SidebarNav from './components/SidebarNav';

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
    <div className="min-h-screen bg-[#F8F9FA] relative">
      {/* Sidebar navigation - desktop */}
      {showBottomNav && (
        <div className="hidden lg:block">
          <SidebarNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      )}

      {/* Main content area */}
      <div className={`min-h-screen ${showBottomNav ? 'lg:ml-64' : ''}`}>
        <div className="max-w-lg mx-auto lg:max-w-4xl xl:max-w-5xl">
          {/* Page content */}
          <main className="min-h-screen">
            {renderPage()}
          </main>
        </div>
      </div>

      {/* Bottom navigation - mobile only */}
      {showBottomNav && (
        <div className="lg:hidden">
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
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
