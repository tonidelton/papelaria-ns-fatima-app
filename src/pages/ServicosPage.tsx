import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

const services = [
  {
    id: '1',
    titulo: 'Impressões',
    descricao: 'Impressões coloridas e preto & branco em diversos tamanhos. Alta qualidade e rapidez.',
    icon: '🖨️',
    cor: 'bg-[#E8F7FB]',
  },
  {
    id: '2',
    titulo: 'Cópias',
    descricao: 'Cópias de documentos, apostilas e materiais. Frente e verso, coloridas ou P&B.',
    icon: '📋',
    cor: 'bg-[#F5EDD8]',
  },
  {
    id: '3',
    titulo: 'Material Escolar',
    descricao: 'Cadernos, mochilas, lápis, canetas, tintas e tudo que seu filho precisa para a escola.',
    icon: '🎒',
    cor: 'bg-[#FFF0E5]',
  },
  {
    id: '4',
    titulo: 'Material de Escritório',
    descricao: 'Papéis, pastas, grampeadores, toners e suprimentos completos para seu escritório.',
    icon: '💼',
    cor: 'bg-[#E8F5E9]',
  },
  {
    id: '5',
    titulo: 'Personalizados',
    descricao: 'Convites, cartões de visita, banners, adesivos e materiais personalizados para sua empresa.',
    icon: '✨',
    cor: 'bg-[#F3E5F5]',
  },
  {
    id: '6',
    titulo: 'Encadernação',
    descricao: 'Encadernação espiral, wire-o e térmica para trabalhos acadêmicos e profissionais.',
    icon: '📚',
    cor: 'bg-[#FFF8E1]',
  },
  {
    id: '7',
    titulo: 'Digitização',
    descricao: 'Digitalização de documentos com envio por e-mail ou salvamento em pendrive.',
    icon: '📱',
    cor: 'bg-[#E0F2F1]',
  },
  {
    id: '8',
    titulo: 'Plotagem',
    descricao: 'Impressão de projetos e plantas em grandes formatos com qualidade profissional.',
    icon: '📐',
    cor: 'bg-[#FFEBEE]',
  },
];

export default function ServicosPage() {
  return (
    <div className="pb-20 lg:pb-8">
      <Header title="Nossos Serviços" />
      
      {/* Header decorativo */}
      <div className="bg-gradient-to-b from-[#25B4D2] to-[#F8F9FA] pt-4 pb-8 px-4 lg:px-6">
        <div className="bg-white rounded-[20px] p-5 shadow-md">
          <h2 className="text-xl font-bold text-[#333333] mb-2">
            Serviços Completos
          </h2>
          <p className="text-sm text-[#666666]">
            Oferecemos uma ampla gama de serviços para atender todas as suas necessidades de papelaria, impressão e escritório.
          </p>
        </div>
      </div>

      {/* Lista de serviços */}
      <div className="px-4 lg:px-6 -mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
          {services.map((service) => (
            <Card key={service.id} shadow="sm" className="flex items-start gap-4">
              <div className={`w-14 h-14 ${service.cor} rounded-[14px] flex items-center justify-center flex-shrink-0`}>
                <span className="text-2xl">{service.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#333333] text-base mb-0.5">{service.titulo}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{service.descricao}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 lg:px-6 mt-6 mb-4">
        <div className="bg-[#25B4D2] rounded-[20px] p-5 text-center text-white">
          <h3 className="text-lg font-bold mb-2">Precisa de um orçamento?</h3>
          <p className="text-sm opacity-90 mb-3">
            Entre em contato conosco pelo WhatsApp para solicitar orçamentos personalizados.
          </p>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#25B4D2] px-5 py-2.5 rounded-full font-semibold text-sm active:scale-95 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </div>
  );
}
