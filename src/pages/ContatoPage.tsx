import React from 'react';
import Card from '../components/Card';

export default function ContatoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-2 text-center">Fale Conosco</h1>
      <p className="text-sm text-[#666666] mb-6 text-center">Estamos prontos para atender você!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="block">
          <Card shadow="sm" className="flex items-center gap-4 active:scale-[0.98] transition-transform h-full">
            <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">💬</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#333333]">WhatsApp</h3>
              <p className="text-sm text-[#666666]">(00) 00000-0000</p>
            </div>
          </Card>
        </a>
        <a href="mailto:contato@papelariadefatima.com.br" className="block">
          <Card shadow="sm" className="flex items-center gap-4 active:scale-[0.98] transition-transform h-full">
            <div className="w-14 h-14 bg-[#25B4D2] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">✉️</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#333333]">E-mail</h3>
              <p className="text-sm text-[#666666]">contato@papelariadefatima.com.br</p>
            </div>
          </Card>
        </a>
        <a href="tel:+5500000000000" className="block">
          <Card shadow="sm" className="flex items-center gap-4 active:scale-[0.98] transition-transform h-full">
            <div className="w-14 h-14 bg-[#C6A46A] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">📞</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#333333]">Telefone</h3>
              <p className="text-sm text-[#666666]">(00) 0000-0000</p>
            </div>
          </Card>
        </a>
        <Card shadow="sm" className="flex items-center gap-4 h-full">
          <div className="w-14 h-14 bg-[#FF8C42] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">📍</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-[#333333]">Endereço</h3>
            <p className="text-sm text-[#666666]">Rua Exemplo, 123 - Centro</p>
          </div>
        </Card>
      </div>
      <Card shadow="sm" className="p-4 sm:p-6">
        <h3 className="font-bold text-[#333333] mb-3">Horário de Funcionamento</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between"><span className="text-[#666666]">Segunda a Sexta</span><span className="font-medium">08:00 - 18:00</span></div>
          <div className="flex justify-between"><span className="text-[#666666]">Sábado</span><span className="font-medium">08:00 - 12:00</span></div>
          <div className="flex justify-between"><span className="text-[#666666]">Domingo</span><span className="text-[#C62828] font-medium">Fechado</span></div>
        </div>
      </Card>
    </div>
  );
}
