import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, userProfile, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/produtos', label: 'Produtos' },
    { to: '/cotacao', label: 'Cotação B2B' },
    { to: '/servicos', label: 'Serviços' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/contato', label: 'Contato' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <header className="bg-[#25B4D2] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#25B4D2] font-bold text-sm sm:text-base">PF</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base font-bold leading-tight">Papelaria</h1>
                <p className="text-[10px] opacity-90 leading-tight">N. Sr.ª de Fátima</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-white/20 text-white'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Cart */}
              <Link
                to="/carrinho"
                className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1"/>
                  <circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#FF8C42] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/minha-conta"
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <div className="w-7 h-7 bg-white/30 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">
                        {userProfile?.nomeCompleto?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="text-sm font-medium max-w-[120px] truncate">
                      {userProfile?.nomeCompleto?.split(' ')[0]}
                    </span>
                  </Link>
                  {(userProfile?.role === 'operador' || userProfile?.role === 'admin') && (
                    <Link
                      to="/painel"
                      className="px-3 py-1.5 bg-[#C6A46A] hover:bg-[#A8894F] rounded-lg text-sm font-medium transition-colors"
                    >
                      Painel
                    </Link>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:block px-4 py-2 bg-white text-[#25B4D2] rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  Entrar
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Menu"
              >
                {menuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" x2="20" y1="12" y2="12"/>
                    <line x1="4" x2="20" y1="6" y2="6"/>
                    <line x1="4" x2="20" y1="18" y2="18"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#1E9AB3] border-t border-white/10">
            <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-white/20 text-white'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-2 mt-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/minha-conta"
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10"
                    >
                      Minha Conta
                    </Link>
                    {(userProfile?.role === 'operador' || userProfile?.role === 'admin') && (
                      <Link
                        to="/painel"
                        onClick={() => setMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10"
                      >
                        Painel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10"
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium bg-white text-[#25B4D2] text-center"
                  >
                    Entrar / Cadastrar
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1"><Outlet /></main>

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="font-bold mb-3">Papelaria N. Sr.ª de Fátima</h3>
              <p className="text-sm text-white/70">
                Tudo para sua papelaria, escritório e escola.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Links</h4>
              <ul className="space-y-1 text-sm text-white/70">
                <li><Link to="/produtos" className="hover:text-white">Produtos</Link></li>
                <li><Link to="/cotacao" className="hover:text-white">Cotação B2B</Link></li>
                <li><Link to="/servicos" className="hover:text-white">Serviços</Link></li>
                <li><Link to="/sobre" className="hover:text-white">Sobre</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Conta</h4>
              <ul className="space-y-1 text-sm text-white/70">
                <li><Link to="/login" className="hover:text-white">Entrar</Link></li>
                <li><Link to="/cadastro" className="hover:text-white">Cadastrar</Link></li>
                <li><Link to="/minha-conta" className="hover:text-white">Minha Conta</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Contato</h4>
              <ul className="space-y-1 text-sm text-white/70">
                <li>WhatsApp: (00) 00000-0000</li>
                <li>E-mail: contato@papelaria.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 pt-6 text-center text-xs text-white/50">
            © 2024 Papelaria N. Sr.ª de Fátima. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
