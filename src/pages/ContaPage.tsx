import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

interface ContaPageProps {
  onNavigate: (page: string) => void;
}

export default function ContaPage({ onNavigate }: ContaPageProps) {
  const { isAuthenticated, userProfile, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="pb-20 lg:pb-8">
        <Header title="Minha Conta" />
        <div className="px-4 lg:px-6 py-12 text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-[#E8F7FB] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25B4D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#333333] mb-2">Acesse sua conta</h2>
          <p className="text-sm text-[#666666] mb-6">
            Faça login para acompanhar seus pedidos, ver seu histórico e muito mais.
          </p>
          <div className="space-y-3">
            <Button variant="primary" fullWidth size="lg" onPress={() => onNavigate('login')}>
              Entrar
            </Button>
            <Button variant="outline" fullWidth onPress={() => onNavigate('cadastro')}>
              Criar Conta
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    onNavigate('inicio');
  };

  const menuItems = [
    { icon: '📦', label: 'Meus Pedidos', description: 'Acompanhe seus pedidos' },
    { icon: '📋', label: 'Cotações', description: 'Gerencie suas cotações' },
    { icon: '📍', label: 'Endereços', description: 'Gerenciar endereços de entrega' },
    { icon: '💳', label: 'Formas de Pagamento', description: 'Gerenciar pagamentos' },
    { icon: '🔔', label: 'Notificações', description: 'Configurar alertas' },
    { icon: '⚙️', label: 'Configurações', description: 'Preferências da conta' },
  ];

  return (
    <div className="pb-20 lg:pb-8">
      <Header title="Minha Conta" />
      
      <div className="px-4 lg:px-6 py-6 max-w-2xl mx-auto">
        {/* Perfil */}
        <Card shadow="md" className="mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#25B4D2] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {userProfile?.nomeCompleto?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#333333] text-lg">
                {userProfile?.nomeCompleto || 'Usuário'}
              </h3>
              <p className="text-sm text-[#666666]">{userProfile?.email}</p>
              <span className="inline-block mt-1 text-xs bg-[#E8F7FB] text-[#25B4D2] px-2 py-0.5 rounded-full font-medium">
                {userProfile?.tipo === 'empresa' ? '🏢 Empresa' : '👤 Pessoa Física'}
              </span>
            </div>
          </div>
        </Card>

        {/* Menu */}
        <div className="space-y-2">
          {menuItems.map((item, idx) => (
            <Card key={idx} shadow="sm" className="flex items-center gap-3 active:scale-[0.98] transition-transform cursor-pointer">
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-[#333333] text-sm">{item.label}</p>
                <p className="text-xs text-[#999999]">{item.description}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Card>
          ))}
        </div>

        {/* Sobre */}
        <div className="mt-4 space-y-2">
          <Card shadow="sm" className="flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform" onPress={() => onNavigate('sobre')}>
            <span className="text-xl">ℹ️</span>
            <p className="font-medium text-[#333333] text-sm flex-1">Sobre a Papelaria</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Card>
        </div>

        {/* Logout */}
        <div className="mt-6">
          <Button variant="ghost" fullWidth onPress={handleLogout}>
            Sair da Conta
          </Button>
        </div>

        {/* Versão */}
        <p className="text-center text-xs text-[#999999] mt-6">
          Papelaria N. Sr.ª de Fátima v1.0.0
        </p>
      </div>
    </div>
  );
}
