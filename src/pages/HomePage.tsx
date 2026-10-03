import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { colors } from '../theme';
import { Product } from '../types';

// Dados mock para demonstração
const mockProducts: Product[] = [
  {
    id: '1',
    categoriaId: '1',
    nome: 'Caderno Universitário 200fls',
    slug: 'caderno-universitario-200fls',
    descricao: 'Caderno universitário capa dura 200 folhas pautadas',
    preco: 28.90,
    precoCusto: 18.00,
    estoque: 50,
    destaque: true,
    ativo: true,
    imagemUrl: '',
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  },
  {
    id: '2',
    categoriaId: '1',
    nome: 'Caneta Esferográfica Azul cx/50',
    slug: 'caneta-esferografica-azul',
    descricao: 'Caixa com 50 canetas esferográficas azul',
    preco: 45.00,
    precoCusto: 28.00,
    estoque: 30,
    destaque: true,
    ativo: true,
    imagemUrl: '',
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  },
  {
    id: '3',
    categoriaId: '2',
    nome: 'Papel A4 Resma 500fls',
    slug: 'papel-a4-resma',
    descricao: 'Resma de papel A4 75g/m² 500 folhas',
    preco: 24.90,
    precoCusto: 16.00,
    estoque: 100,
    destaque: true,
    ativo: true,
    imagemUrl: '',
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  },
  {
    id: '4',
    categoriaId: '2',
    nome: 'Pasta Arquivo Morto',
    slug: 'pasta-arquivo-morto',
    descricao: 'Pasta arquivo morto polionda',
    preco: 8.50,
    precoCusto: 4.50,
    estoque: 80,
    destaque: true,
    ativo: true,
    imagemUrl: '',
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  },
  {
    id: '5',
    categoriaId: '3',
    nome: 'Kit Canetinha 12 cores',
    slug: 'kit-canetinha-12-cores',
    descricao: 'Kit com 12 canetinhas coloridas laváveis',
    preco: 15.90,
    precoCusto: 9.00,
    estoque: 40,
    destaque: true,
    ativo: true,
    imagemUrl: '',
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  },
  {
    id: '6',
    categoriaId: '3',
    nome: 'Cola Bastão 40g',
    slug: 'cola-bastao-40g',
    descricao: 'Cola bastão 40g não tóxica',
    preco: 5.90,
    precoCusto: 3.00,
    estoque: 60,
    destaque: true,
    ativo: true,
    imagemUrl: '',
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  },
];

const productEmojis: Record<string, string> = {
  '1': '📓',
  '2': '🖊️',
  '3': '📄',
  '4': '📁',
  '5': '🖍️',
  '6': '📌',
};

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="pb-20 lg:pb-8">
      <Header showLogo />
      
      {/* Banner de boas-vindas */}
      <div className="mx-4 lg:mx-6 mt-4 lg:mt-6 bg-gradient-to-r from-[#25B4D2] to-[#1E9AB3] rounded-[20px] p-5 lg:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-1">Bem-vindo! 👋</h2>
          <p className="text-sm opacity-90 mb-3">
            Encontre tudo para sua papelaria, escritório e escola.
          </p>
          <button 
            onClick={() => onNavigate('servicos')}
            className="bg-white text-[#25B4D2] px-4 py-2 rounded-full text-sm font-semibold active:scale-95 transition-transform"
          >
            Ver Serviços
          </button>
        </div>
      </div>

      {/* Categorias rápidas */}
      <div className="px-4 lg:px-6 mt-6">
        <h3 className="text-lg lg:text-xl font-bold text-[#333333] mb-3">Categorias</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { nome: 'Escolar', emoji: '🎒' },
            { nome: 'Escritório', emoji: '💼' },
            { nome: 'Impressão', emoji: '🖨️' },
            { nome: 'Copias', emoji: '📋' },
            { nome: 'Personalizados', emoji: '✨' },
          ].map((cat) => (
            <button
              key={cat.nome}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 bg-white rounded-[14px] p-3 shadow-sm min-w-[80px] active:scale-95 transition-transform"
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-xs font-medium text-[#333333]">{cat.nome}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Produtos em destaque */}
      <div className="px-4 lg:px-6 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg lg:text-xl font-bold text-[#333333]">Produtos em Destaque</h3>
          <button className="text-sm text-[#25B4D2] font-medium">Ver todos</button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {mockProducts.map((product) => (
            <Card key={product.id} shadow="sm" className="overflow-hidden p-0">
              <div className="bg-[#F8F9FA] h-28 sm:h-32 lg:h-36 flex items-center justify-center">
                <span className="text-4xl sm:text-5xl">{productEmojis[product.id] || '📦'}</span>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-medium text-[#333333] line-clamp-2 mb-1">
                  {product.nome}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base font-bold text-[#25B4D2]">
                    R$ {product.preco.toFixed(2).replace('.', ',')}
                  </span>
                  <button className="bg-[#FF8C42] text-white w-7 h-7 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Banner promocional */}
      <div className="mx-4 lg:mx-6 mt-6 bg-gradient-to-r from-[#C6A46A] to-[#A8894F] rounded-[20px] p-5 lg:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="relative z-10">
          <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">PROMOÇÃO</span>
          <h3 className="text-lg font-bold mt-2 mb-1">Material Escolar</h3>
          <p className="text-sm opacity-90">
            Confira nossas ofertas especiais para volta às aulas!
          </p>
        </div>
      </div>

      {/* Sobre rápido */}
      <div className="px-4 lg:px-6 mt-6 mb-4">
        <Card shadow="sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#E8F7FB] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🏪</span>
            </div>
            <div>
              <h4 className="font-semibold text-[#333333] text-sm">Sobre a Papelaria</h4>
              <p className="text-xs text-[#666666] mt-0.5">
                Há anos atendendo a comunidade com os melhores produtos e serviços. 
                Impressões, cópias, material escolar e muito mais!
              </p>
              <button 
                onClick={() => onNavigate('sobre')}
                className="text-xs text-[#25B4D2] font-medium mt-1"
              >
                Saiba mais →
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
