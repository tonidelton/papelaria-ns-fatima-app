import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import ProductImage3D from '../components/ProductImage3D';
import { useCart } from '../contexts/CartContext';
import { mockProducts, mockCategories, productEmojis } from '../data/mockData';
import { Product } from '../types';

const PAGE_SIZE = 8;

export default function ProdutosPage() {
  const { addItem } = useCart();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    let result = mockProducts.filter((p) => p.ativo);

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (p) => p.nome.toLowerCase().includes(term) || p.descricao.toLowerCase().includes(term)
      );
    }

    if (categoryFilter) {
      result = result.filter((p) => p.categoriaId === categoryFilter);
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter((p) => {
        if (max) return p.preco >= min && p.preco <= max;
        return p.preco >= min;
      });
    }

    return result;
  }, [search, categoryFilter, priceRange]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  // Infinite scroll
  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + PAGE_SIZE);
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, categoryFilter, priceRange]);

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
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-6">Produtos</h1>

      {/* Filtros */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6 space-y-3">
        {/* Busca */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou descrição..."
            className="w-full pl-10 pr-4 py-2.5 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25B4D2]/20 focus:border-[#25B4D2] text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Categoria */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 border border-[#E0E0E0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25B4D2]/20 focus:border-[#25B4D2]"
          >
            <option value="">Todas as categorias</option>
            {mockCategories.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>

          {/* Faixa de preço */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-3 py-2.5 border border-[#E0E0E0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25B4D2]/20 focus:border-[#25B4D2]"
          >
            <option value="">Todas as faixas de preço</option>
            <option value="0-10">Até R$ 10,00</option>
            <option value="10-30">R$ 10,00 - R$ 30,00</option>
            <option value="30-60">R$ 30,00 - R$ 60,00</option>
            <option value="60-999999">Acima de R$ 60,00</option>
          </select>
        </div>

        {(search || categoryFilter || priceRange) && (
          <button
            onClick={() => { setSearch(''); setCategoryFilter(''); setPriceRange(''); }}
            className="text-sm text-[#25B4D2] font-medium hover:underline"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Resultados */}
      <p className="text-sm text-[#666] mb-4">{filteredProducts.length} produto(s) encontrado(s)</p>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-[#666]">Nenhum produto encontrado com os filtros aplicados.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {visibleProducts.map((p) => (
              <Card key={p.id} shadow="sm" className="overflow-hidden p-0 group">
                <Link to={`/produtos/${p.slug}`} className="block">
                  <div className="bg-[#F8F9FA] h-28 sm:h-32 lg:h-40 relative">
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
                    <h3 className="text-sm font-medium text-[#333] line-clamp-2 mb-2 hover:text-[#25B4D2]">
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

          {/* Infinite scroll loader */}
          {hasMore && (
            <div ref={loaderRef} className="py-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#25B4D2] border-t-transparent"></div>
              <p className="text-sm text-[#666] mt-2">Carregando mais produtos...</p>
            </div>
          )}
        </>
      )}

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
