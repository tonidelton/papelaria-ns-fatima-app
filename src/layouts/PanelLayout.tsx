import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PanelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userProfile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { to: '/painel', label: 'Dashboard', icon: '📊' },
    { to: '/painel/pedidos', label: 'Pedidos', icon: '📦' },
    { to: '/painel/produtos', label: 'Produtos', icon: '🏷️' },
    { to: '/painel/clientes', label: 'Clientes', icon: '👥' },
    { to: '/painel/cotacoes', label: 'Cotações', icon: '📋' },
    { to: '/painel/importar', label: 'Importar Excel', icon: '📥' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-[#E0E0E0]">
        <div className="p-6 border-b border-[#E0E0E0]">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#25B4D2] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">PF</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-[#333333]">Painel Administrativo</h1>
              <p className="text-xs text-[#666666]">Papelaria N. Sr.ª de Fátima</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.to
                  ? 'bg-[#E8F7FB] text-[#25B4D2]'
                  : 'text-[#666666] hover:bg-[#F8F9FA]'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#E0E0E0]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#25B4D2] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {userProfile?.nomeCompleto?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#333333] truncate">
                {userProfile?.nomeCompleto}
              </p>
              <p className="text-xs text-[#666666] capitalize">{userProfile?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 text-sm text-[#C62828] hover:bg-[#FFEBEE] rounded-lg transition-colors"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-white flex flex-col">
            <div className="p-4 border-b border-[#E0E0E0] flex items-center justify-between">
              <h2 className="font-bold text-[#333333]">Menu</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.to
                      ? 'bg-[#E8F7FB] text-[#25B4D2]'
                      : 'text-[#666666] hover:bg-[#F8F9FA]'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-[#E0E0E0] px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-[#F8F9FA] rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>
          <h1 className="font-bold text-[#333333]">Painel</h1>
          <Link to="/" className="text-sm text-[#25B4D2]">Ver site</Link>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
