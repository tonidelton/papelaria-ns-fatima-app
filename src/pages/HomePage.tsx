import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import ProductImage3D from '../components/ProductImage3D';
import { useCart } from '../contexts/CartContext';
import { mockProducts, productEmojis } from '../data/mockData';
import { Product } from '../types';

const featuredProducts = mockProducts.filter((p) => p.destaque && p.ativo);

export default function HomePage() {
  const { addItem } = useCart();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleAddToCart = (product: Product) => {
    const result = addItem(product);
    if (result.success) {
      setToast({ message: `${product.nome} adicionado ao carrinho!`, type: 'success' });
    } else {
      setToast({ message: result.message || 'Erro ao adicionar', type: 'error' });
    }
    setTimeout(() => setToast(null), 3000);
  };

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
          {featuredProducts.map((p) => (
            <Card key={p.id} shadow="sm" className="overflow-hidden p-0 group">
              <Link to={`/produtos/${p.slug}`} className="block">
                <div className="bg-[#F8F9FA] h-28 sm:h-32 lg:h-36 relative">
                  <ProductImage3D 
                    emoji={productEmojis[p.id] || '📦'}
                    className="w-full h-full"
                    intensity={0.4}
                    scale={1.1}
                  />
                  {p.estoque === 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                      <span className="bg-[#C62828] text-white text-xs font-bold px-2 py-1 rounded">ESGOTADO</span>
                    </div>
                  )}
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
                    onClick={() => handleAddToCart(p)}
                    disabled={p.estoque === 0}
                    className="bg-[#FF8C42] text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#E67A30] active:scale-90 transition-all shadow-sm disabled:bg-[#999] disabled:cursor-not-allowed"
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

      {/* CTA B2B */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-10 sm:py-12">
        <div className="bg-gradient-to-br from-[#C6A46A] to-[#A8894F] rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                <span>💼</span> B2B - Para Empresas
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Solicite uma Cotação Personalizada</h2>
              <p className="text-base sm:text-lg opacity-90 mb-4 max-w-xl">
                Precisa de grandes quantidades? Nossa equipe preparará uma proposta especial para sua empresa com condições diferenciadas.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  to="/cotacao"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#C6A46A] rounded-lg font-semibold hover:bg-white/90 transition-colors"
                >
                  <span>📋</span> Solicitar Cotação
                </Link>
                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
                >
                  <span>💬</span> Falar no WhatsApp
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center">
                <span className="text-6xl">📊</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium ${
          toast.type === 'success' ? 'bg-[#2E7D32] text-white' : 'bg-[#C62828] text-white'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
