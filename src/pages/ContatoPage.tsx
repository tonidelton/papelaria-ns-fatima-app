import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

export default function ContatoPage() {
  return (
    <div className="pb-20 lg:pb-8">
      <Header title="Contato" />
      
      <div className="px-4 lg:px-6 py-6">
        {/* Header decorativo */}
        <div className="text-center mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-[#333333] mb-2">Fale Conosco</h2>
          <p className="text-sm text-[#666666]">
            Estamos prontos para atender você! Entre em contato pelos canais abaixo.
          </p>
        </div>

        {/* Contatos grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/5500000000000?text=Olá! Gostaria de mais informações sobre os produtos e serviços."
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card shadow="sm" className="flex items-center gap-4 active:scale-[0.98] transition-transform h-full">
              <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#333333]">WhatsApp</h3>
                <p className="text-sm text-[#666666]">(00) 00000-0000</p>
                <p className="text-xs text-[#25B4D2] font-medium mt-0.5">Toque para conversar →</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Card>
          </a>

          {/* E-mail */}
          <a
            href="mailto:contato@papelariadefatima.com.br"
            className="block"
          >
            <Card shadow="sm" className="flex items-center gap-4 active:scale-[0.98] transition-transform h-full">
              <div className="w-14 h-14 bg-[#25B4D2] rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#333333]">E-mail</h3>
                <p className="text-sm text-[#666666]">contato@papelariadefatima.com.br</p>
                <p className="text-xs text-[#25B4D2] font-medium mt-0.5">Toque para enviar e-mail →</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Card>
          </a>

          {/* Telefone */}
          <a
            href="tel:+5500000000000"
            className="block"
          >
            <Card shadow="sm" className="flex items-center gap-4 active:scale-[0.98] transition-transform h-full">
              <div className="w-14 h-14 bg-[#C6A46A] rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#333333]">Telefone</h3>
                <p className="text-sm text-[#666666]">(00) 0000-0000</p>
                <p className="text-xs text-[#25B4D2] font-medium mt-0.5">Toque para ligar →</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Card>
          </a>

          {/* Endereço */}
          <Card shadow="sm" className="flex items-start gap-4 h-full">
            <div className="w-14 h-14 bg-[#FF8C42] rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#333333]">Endereço</h3>
              <p className="text-sm text-[#666666] mt-0.5">
                Rua Exemplo, 123 - Centro<br />
                Cidade - Estado, CEP 00000-000
              </p>
            </div>
          </Card>
        </div>

        {/* Horário de funcionamento */}
        <Card shadow="sm" className="mb-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-[#2E7D32] rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#333333]">Horário de Funcionamento</h3>
              <div className="mt-1.5 space-y-1 max-w-xs">
                <div className="flex justify-between text-sm">
                  <span className="text-[#666666]">Segunda a Sexta</span>
                  <span className="text-[#333333] font-medium">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#666666]">Sábado</span>
                  <span className="text-[#333333] font-medium">08:00 - 12:00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#666666]">Domingo</span>
                  <span className="text-[#C62828] font-medium">Fechado</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Redes sociais */}
        <Card shadow="sm">
          <h3 className="font-bold text-[#333333] mb-3 text-center">Redes Sociais</h3>
          <div className="flex justify-center gap-4">
            <a href="#" className="w-12 h-12 bg-[#E8F7FB] rounded-full flex items-center justify-center active:scale-90 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#25B4D2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-[#FFF0E5] rounded-full flex items-center justify-center active:scale-90 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FF8C42">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
