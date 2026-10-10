import React from 'react';
import { useAuth } from '../contexts/AuthContext';

type TabType = 'inicio' | 'servicos' | 'contato' | 'conta';

interface SidebarNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function SidebarNav({ activeTab, onTabChange }: SidebarNavProps) {
  const { isAuthenticated } = useAuth();

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'inicio',
      label: 'Início',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      id: 'servicos',
      label: 'Serviços',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
    },
    {
      id: 'contato',
      label: 'Contato',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
    {
      id: 'conta',
      label: isAuthenticated ? 'Conta' : 'Entrar',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-[#E0E0E0] z-40 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#E0E0E0]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#25B4D2] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">PF</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-[#333333] leading-tight">Papelaria</h1>
            <p className="text-xs text-[#666666] leading-tight">N. Sr.ª de Fátima</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-[10px]
                transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-[#E8F7FB] text-[#25B4D2] font-semibold' 
                  : 'text-[#666666] hover:bg-[#F8F9FA] hover:text-[#333333]'}
              `}
            >
              {tab.icon}
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#E0E0E0]">
        <p className="text-xs text-[#999999] text-center">
          © 2024 Papelaria N. Sr.ª de Fátima
        </p>
      </div>
    </aside>
  );
}
