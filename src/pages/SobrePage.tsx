import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

interface SobrePageProps {
  onBack?: () => void;
}

export default function SobrePage({ onBack }: SobrePageProps) {
  return (
    <div className="pb-20 lg:pb-8">
      <Header title="Sobre Nós" showBack onBack={onBack || (() => window.history.back())} />
      
      <div className="px-4 lg:px-6 py-6">
        {/* Logo e nome */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-[#25B4D2] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <span className="text-white font-bold text-2xl">PF</span>
          </div>
          <h2 className="text-xl font-bold text-[#333333]">Papelaria N. Sr.ª de Fátima</h2>
          <p className="text-sm text-[#666666] mt-1">Tradição e qualidade em papelaria</p>
        </div>

        {/* Texto institucional */}
        <Card shadow="sm" className="mb-4">
          <h3 className="font-bold text-[#333333] mb-3 flex items-center gap-2">
            <span className="text-lg">📖</span> Nossa História
          </h3>
          <p className="text-sm text-[#666666] leading-relaxed">
            A Papelaria N. Sr.ª de Fátima é uma empresa dedicada a oferecer os melhores produtos 
            e serviços em papelaria, materiais escolares, suprimentos de escritório e serviços gráficos.
          </p>
          <p className="text-sm text-[#666666] leading-relaxed mt-2">
            Com anos de experiência no mercado, nos orgulhamos de atender nossa comunidade com 
            dedicação, preços justos e um atendimento personalizado que faz a diferença.
          </p>
        </Card>

        {/* Missão */}
        <Card shadow="sm" className="mb-4">
          <h3 className="font-bold text-[#333333] mb-3 flex items-center gap-2">
            <span className="text-lg">🎯</span> Nossa Missão
          </h3>
          <p className="text-sm text-[#666666] leading-relaxed">
            Proporcionar soluções completas em papelaria e serviços gráficos, 
            atendendo às necessidades de estudantes, profissionais e empresas 
            com qualidade, agilidade e preços competitivos.
          </p>
        </Card>

        {/* Valores */}
        <Card shadow="sm" className="mb-4">
          <h3 className="font-bold text-[#333333] mb-3 flex items-center gap-2">
            <span className="text-lg">💎</span> Nossos Valores
          </h3>
          <div className="space-y-2">
            {[
              { icon: '🤝', text: 'Compromisso com o cliente' },
              { icon: '⭐', text: 'Qualidade em tudo que fazemos' },
              { icon: '💡', text: 'Inovação e atualização constante' },
              { icon: '🌱', text: 'Responsabilidade social e ambiental' },
              { icon: '❤️', text: 'Respeito e transparência' },
            ].map((valor, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-base">{valor.icon}</span>
                <span className="text-sm text-[#666666]">{valor.text}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Diferenciais */}
        <Card shadow="sm" className="mb-4">
          <h3 className="font-bold text-[#333333] mb-3 flex items-center gap-2">
            <span className="text-lg">🏆</span> Por que nos escolher?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { num: '1000+', label: 'Produtos' },
              { num: '15+', label: 'Anos de mercado' },
              { num: '5000+', label: 'Clientes satisfeitos' },
              { num: '100%', label: 'Comprometimento' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center bg-[#F8F9FA] rounded-[10px] p-3">
                <p className="text-lg font-bold text-[#25B4D2]">{stat.num}</p>
                <p className="text-xs text-[#666666]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
