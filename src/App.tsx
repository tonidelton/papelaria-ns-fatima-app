import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import MainLayout from './layouts/MainLayout';
import PanelLayout from './layouts/PanelLayout';
import HomePage from './pages/HomePage';
import ProdutosPage from './pages/ProdutosPage';
import ProdutoDetalhePage from './pages/ProdutoDetalhePage';
import CarrinhoPage from './pages/CarrinhoPage';
import CheckoutPage from './pages/CheckoutPage';
import PedidoConfirmacaoPage from './pages/PedidoConfirmacaoPage';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import CotacaoPage from './pages/CotacaoPage';
import CotacaoConfirmacaoPage from './pages/CotacaoConfirmacaoPage';
import MinhaContaPage from './pages/MinhaContaPage';
import ServicosPage from './pages/ServicosPage';
import SobrePage from './pages/SobrePage';
import ContatoPage from './pages/ContatoPage';
import PainelDashboard from './pages/painel/DashboardPage';
import PainelPedidos from './pages/painel/PedidosPage';
import PainelProdutos from './pages/painel/ProdutosPage';
import PainelImportar from './pages/painel/ImportarPage';
import SplashScreen from './pages/SplashScreen';
import { registerServiceWorker } from './lib/sw';

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { isAuthenticated, userProfile, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && userProfile && !roles.includes(userProfile.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    registerServiceWorker();
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <Routes>
      {/* Main public routes */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="produtos" element={<ProdutosPage />} />
        <Route path="produtos/:slug" element={<ProdutoDetalhePage />} />
        <Route path="carrinho" element={<CarrinhoPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="pedido-confirmacao/:orderId" element={<PedidoConfirmacaoPage />} />
        <Route path="servicos" element={<ServicosPage />} />
        <Route path="sobre" element={<SobrePage />} />
        <Route path="contato" element={<ContatoPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cadastro" element={<CadastroPage />} />
        <Route path="cotacao" element={<CotacaoPage />} />
        <Route path="cotacao-confirmacao/:quotationId" element={<CotacaoConfirmacaoPage />} />
        <Route path="minha-conta/*" element={
          <ProtectedRoute><MinhaContaPage /></ProtectedRoute>
        } />
      </Route>

      {/* Panel routes (admin/operador) */}
      <Route path="painel" element={
        <ProtectedRoute roles={['admin', 'operador']}>
          <PanelLayout />
        </ProtectedRoute>
      }>
        <Route index element={<PainelDashboard />} />
        <Route path="pedidos" element={<PainelPedidos />} />
        <Route path="produtos" element={<PainelProdutos />} />
        <Route path="importar" element={<PainelImportar />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
