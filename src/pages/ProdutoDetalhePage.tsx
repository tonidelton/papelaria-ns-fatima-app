import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import ProductImage3D from '../components/ProductImage3D';
import { useCart } from '../contexts/CartContext';
import { mockProducts, productEmojis } from '../data/mockData';
import { Product } from '../types';

// Mock de galeria de imagens (em produção, viria do productImages)
const mockGallery: Record<string, string[]> = {
  '1': ['📓', '📖', '✏️'],
  '2': ['🖊️', '✒️', '📝'],
  '3': ['📄', '📃', '📑'],
};

export default function ProdutoDetalhePage() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const product = slug ? mockProducts.find((p) => p.slug === slug && p.ativo) : null;
  const gallery = product ? (mockGallery[product.id] || [productEmojis[product.id] || '📦']) : [];

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-[#333] mb-4">Produto não encontrado</h1>
        <Link to="/produtos" className="text-[#25B4D2] font-medium hover:underline">← Voltar aos produtos</Link>
      </div>
    );
  }

  const isOutOfStock = product.estoque === 0;

  const handleAddToCart = () => {
    const result = addItem(product, quantity);
    if (result.success) {
      setToast({ message: `${quantity}x ${product.nome} adicionado ao carrinho!`, type: 'success' });
    } else {
      setToast({ message: result.message || 'Erro ao adicionar', type: 'error' });
    }
    setTimeout(() => setToast(null), 3000);
  };

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= product.estoque) {
      setQuantity(newQty);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <Link to="/produtos" className="text-sm text-[#25B4D2] font-medium hover:underline mb-4 inline-block">
        ← Voltar aos produtos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Galeria */}
        <div>
          <Card shadow="md" className="overflow-hidden p-0 mb-3">
            <div className="bg-[#F8F9FA] h-64 sm:h-80 lg:h-[450px] relative">
              <ProductImage3D 
                emoji={gallery[activeImage]}
                className="w-full h-full"
                intensity={0.5}
                scale={1.15}
              />
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                  <span className="bg-[#C62828] text-white text-lg font-bold px-4 py-2 rounded">ESGOTADO</span>
                </div>
              )}
            </div>
          </Card>
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-16 bg-[#F8F9FA] rounded-lg flex-shrink-0 border-2 transition-all overflow-hidden ${
                    activeImage === idx ? 'border-[#25B4D2] shadow-md' : 'border-transparent hover:border-[#25B4D2]/50'
                  }`}
                >
                  <ProductImage3D 
                    emoji={img}
                    className="w-full h-full"
                    intensity={0.3}
                    scale={1.05}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detalhes */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#333] mb-3">{product.nome}</h1>
          <p className="text-3xl sm:text-4xl font-bold text-[#25B4D2] mb-4">
            R$ {product.preco.toFixed(2).replace('.', ',')}
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm">
              {isOutOfStock ? (
                <>
                  <span className="text-[#C62828]">✗</span>
                  <span className="text-[#C62828] font-medium">Esgotado</span>
                </>
              ) : (
                <>
                  <span className="text-[#2E7D32]">✓</span>
                  <span className="text-[#666]">Em estoque: {product.estoque} unidades</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#2E7D32]">✓</span>
              <span className="text-[#666]">Entrega rápida</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="font-semibold text-[#333] mb-2">Descrição</h3>
            <p className="text-sm text-[#666] leading-relaxed">{product.descricao}</p>
          </div>

          {/* Seletor de quantidade */}
          {!isOutOfStock && (
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-[#333]">Quantidade:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 bg-[#F8F9FA] rounded-full flex items-center justify-center hover:bg-[#E0E0E0] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  −
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.estoque}
                  className="w-8 h-8 bg-[#F8F9FA] rounded-full flex items-center justify-center hover:bg-[#E0E0E0] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-[#999]">(máx: {product.estoque})</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="cta"
              size="lg"
              fullWidth
              onPress={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Esgotado' : 'Adicionar ao Carrinho'}
            </Button>
            <Link to="/carrinho">
              <Button variant="outline" size="lg" fullWidth onPress={() => {}}>
                Ver Carrinho
              </Button>
            </Link>
          </div>
        </div>
      </div>

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
