import React from 'react';
import Card from '../components/Card';

const services = [
  { titulo: 'Impressões', descricao: 'Impressões coloridas e P&B em diversos tamanhos.', icon: '🖨️' },
  { titulo: 'Cópias', descricao: 'Cópias de documentos, apostilas e materiais.', icon: '📋' },
  { titulo: 'Material Escolar', descricao: 'Cadernos, mochilas, lápis, canetas e tudo para a escola.', icon: '🎒' },
  { titulo: 'Material de Escritório', descricao: 'Papéis, pastas, grampeadores e suprimentos completos.', icon: '💼' },
  { titulo: 'Personalizados', descricao: 'Convites, cartões de visita, banners e adesivos.', icon: '✨' },
  { titulo: 'Encadernação', descricao: 'Encadernação espiral, wire-o e térmica.', icon: '📚' },
  { titulo: 'Digitização', descricao: 'Digitalização de documentos com envio por e-mail.', icon: '📱' },
  { titulo: 'Plotagem', descricao: 'Impressão de projetos e plantas em grandes formatos.', icon: '📐' },
];

export default function ServicosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-2">Nossos Serviços</h1>
      <p className="text-sm text-[#666666] mb-6">Soluções completas para suas necessidades</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {services.map((s, i) => (
          <Card key={i} shadow="sm" className="flex items-start gap-4 p-4">
            <div className="w-14 h-14 bg-[#E8F7FB] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">{s.icon}</span>
            </div>
            <div>
              <h3 className="font-bold text-[#333333] mb-1">{s.titulo}</h3>
              <p className="text-sm text-[#666666]">{s.descricao}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-8 bg-[#25B4D2] rounded-2xl p-6 sm:p-8 text-center text-white">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Precisa de um orçamento?</h2>
        <p className="text-sm opacity-90 mb-4">Entre em contato pelo WhatsApp</p>
        <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#25B4D2] rounded-lg font-semibold hover:bg-white/90 transition-colors">
          💬 Solicitar Orçamento
        </a>
      </div>
    </div>
  );
}
