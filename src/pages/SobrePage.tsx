import React from 'react';
import Card from '../components/Card';

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-[#25B4D2] rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-white font-bold text-2xl">PF</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#333333]">Papelaria N. Sr.ª de Fátima</h1>
        <p className="text-sm text-[#666666] mt-1">Tradição e qualidade em papelaria</p>
      </div>
      <Card shadow="sm" className="p-4 sm:p-6 mb-4">
        <h2 className="font-bold text-[#333333] mb-3">📖 Nossa História</h2>
        <p className="text-sm text-[#666666] leading-relaxed">
          A Papelaria N. Sr.ª de Fátima é uma empresa dedicada a oferecer os melhores produtos e serviços em papelaria, materiais escolares, suprimentos de escritório e serviços gráficos. Com anos de experiência no mercado, nos orgulhamos de atender nossa comunidade com dedicação, preços justos e atendimento personalizado.
        </p>
      </Card>
      <Card shadow="sm" className="p-4 sm:p-6 mb-4">
        <h2 className="font-bold text-[#333333] mb-3">🎯 Nossa Missão</h2>
        <p className="text-sm text-[#666666] leading-relaxed">
          Proporcionar soluções completas em papelaria e serviços gráficos, atendendo às necessidades de estudantes, profissionais e empresas com qualidade, agilidade e preços competitivos.
        </p>
      </Card>
      <Card shadow="sm" className="p-4 sm:p-6">
        <h2 className="font-bold text-[#333333] mb-3">🏆 Nossos Números</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[{ num: '1000+', label: 'Produtos' }, { num: '15+', label: 'Anos' }, { num: '5000+', label: 'Clientes' }, { num: '100%', label: 'Comprometimento' }].map((s, i) => (
            <div key={i} className="text-center bg-[#F8F9FA] rounded-lg p-3">
              <p className="text-lg font-bold text-[#25B4D2]">{s.num}</p>
              <p className="text-xs text-[#666666]">{s.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
