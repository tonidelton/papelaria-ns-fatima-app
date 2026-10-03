import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';

const mockProducts: Product[] = [
  { id: '1', categoriaId: '1', nome: 'Caderno Universitário 200fls', slug: 'caderno-universitario', descricao: 'Caderno universitário capa dura', preco: 28.90, precoCusto: 18, estoque: 50, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  { id: '2', categoriaId: '1', nome: 'Caneta Esferográfica cx/50', slug: 'caneta-esferografica', descricao: 'Caixa com 50 canetas azuis', preco: 45.00, precoCusto: 28, estoque: 30, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  { id: '3', categoriaId: '2', nome: 'Papel A4 Resma 500fls', slug: 'papel-a4', descricao: 'Resma de papel A4 75g/m²', preco: 24.90, precoCusto: 16, estoque: 100, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  { id: '4', categoriaId: '2', nome: 'Pasta Arquivo Morto', slug: 'pasta-arquivo', descricao: 'Pasta arquivo morto polionda', preco: 8.50, precoCusto: 4.5, estoque: 80, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  { id: '5', categoriaId: '3', nome: 'Kit Canetinha 12 cores', slug: 'kit-canetinha', descricao: 'Kit 12 canetinhas coloridas', preco: 15.90, precoCusto: 9, estoque: 40, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  { id: '6', categoriaId: '3', nome: 'Cola Bastão 40g', slug: 'cola-bastao', descricao: 'Cola bastão não tóxica', preco: 5.90, precoCusto: 3, estoque: 60, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
];

const emojis: Record<string, string> = { '1': '📓', '2': '🖊️', '3': '📄', '4': '📁', '5': '🖍️', '6': '📌' };

export default function HomePage() {
  const { addItem } = useCart();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#25B4D2] to-[#1E9AB3] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Bem-vindo à Papelaria N. Sr.ª de Fátima
            </h1>
            <p className="text-lg sm:text-xl opacity-90 mb-6">
              Tudo para sua papelaria, escritório e escola com qualidade e preço justo.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/produtos"
                className="px-6 py-3 bg-white text-[#25B4D2] rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Ver Produtos
              </Link>
              <Link
                to="/servicos"
                className="px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
              >
                Nossos Serviços
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos em destaque */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-10 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#333333]">Produtos em Destaque</h2>
          <Link to="/produtos" className="text-sm text-[#25B4D2] font-medium hover:underline">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
          {mockProducts.map((p) => (
            <Card key={p.id} shadow="sm" className="overflow-hidden p-0 group">
              <Link to={`/produtos/${p.slug}`} className="block">
                <div className="bg-[#F8F9FA] h-28 sm:h-32 lg:h-36 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform">
                    {emojis[p.id] || '📦'}
                  </span>
                </div>
              </Link>
              <div className="p-3">
                <Link to={`/produtos/${p.slug}`}>
                  <h3 className="text-sm font-medium text-[#333333] line-clamp-2 mb-2 hover:text-[#25B4D2]">
                    {p.nome}
                  </h3>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[#25B4D2]">
                    R$ {p.preco.toFixed(2).replace('.', ',')}
                  </span>
                  <button
                    onClick={() => addItem(p)}
                    className="bg-[#FF8C42] text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#E67A30] active:scale-90 transition-all shadow-sm"
                    aria-label="Adicionar ao carrinho"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Categorias */}
      <section className="bg-white py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-6 text-center">Categorias</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              { nome: 'Escolar', emoji: '🎒' },
              { nome: 'Escritório', emoji: '💼' },
              { nome: 'Impressão', emoji: '🖨️' },
              { nome: 'Cópias', emoji: '📋' },
              { nome: 'Personalizados', emoji: '✨' },
            ].map((cat) => (
              <Link
                key={cat.nome}
                to="/produtos"
                className="flex flex-col items-center gap-2 bg-[#F8F9FA] hover:bg-[#E8F7FB] rounded-xl p-4 sm:p-6 transition-colors"
              >
                <span className="text-3xl sm:text-4xl">{cat.emoji}</span>
                <span className="text-sm font-medium text-[#333333]">{cat.nome}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-10 sm:py-12">
        <div className="bg-gradient-to-r from-[#C6A46A] to-[#A8894F] rounded-2xl p-6 sm:p-10 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Precisa de um orçamento?</h2>
          <p className="text-base sm:text-lg opacity-90 mb-6 max-w-xl mx-auto">
            Entre em contato pelo WhatsApp para solicitar orçamentos personalizados para sua empresa.
          </p>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#C6A46A] rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            <span>💬</span> Falar no WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
