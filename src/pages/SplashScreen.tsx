import React from 'react';

interface SplashScreenProps {
  onFinish?: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  return (
    <div className="fixed inset-0 bg-[#25B4D2] flex flex-col items-center justify-center z-[100]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-white rounded-full" />
      </div>
      <div className="relative z-10 flex flex-col items-center animate-fade-in">
        <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 bg-white rounded-full flex items-center justify-center shadow-xl mb-6">
          <span className="text-[#25B4D2] font-bold text-3xl sm:text-4xl">PF</span>
        </div>
        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-1">Papelaria</h1>
        <h2 className="text-white/90 text-lg sm:text-xl lg:text-2xl font-medium text-center">N. Sr.ª de Fátima</h2>
        <div className="mt-8 flex items-center gap-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
