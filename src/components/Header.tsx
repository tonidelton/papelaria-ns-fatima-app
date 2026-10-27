import React from 'react';
import { colors } from '../theme';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export default function Header({ title, showLogo = false, showBack = false, onBack, rightAction }: HeaderProps) {
  const { isAuthenticated, userProfile } = useAuth();

  return (
    <header className="bg-[#25B4D2] text-white px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-3">
        {showBack && onBack && (
          <button onClick={onBack} className="p-1 -ml-1 active:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
        )}
        {showLogo ? (
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#25B4D2] font-bold text-sm lg:text-base">PF</span>
            </div>
            <div>
              <h1 className="text-base lg:text-lg font-bold leading-tight">Papelaria</h1>
              <p className="text-[10px] lg:text-xs opacity-90 leading-tight">N. Sr.ª de Fátima</p>
            </div>
          </div>
        ) : (
          <h1 className="text-lg lg:text-xl font-bold">{title}</h1>
        )}
      </div>
      <div className="flex items-center gap-2">
        {rightAction}
        {isAuthenticated && (
          <div className="w-8 h-8 lg:w-9 lg:h-9 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xs lg:text-sm font-bold">
              {userProfile?.nomeCompleto?.charAt(0) || 'U'}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
