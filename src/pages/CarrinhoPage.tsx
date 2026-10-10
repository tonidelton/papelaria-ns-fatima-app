import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useCart } from '../contexts/CartContext';
import { productEmojis } from '../data/mockData';

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-[#333] mb-2">Seu carrinho está vazio</h1>
        <p className="text-[#666] mb-6">Adicione produtos para continuar</p>
        <Link to="/produtos">
          <Button variant="primary">Ver Produtos</Button>
        </Link>
      </div>
    );
  }

  const handleUpdateQuantity = (productId: string, qty: number) => {
    const result = updateQuantity(productId, qty);
    if (!result.success) {
      setToast({ message: result.message || 'Erro ao atualizar', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const subtotal = total;
  const frete = 0; // Placeholder
  const totalGeral = subtotal + frete;

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333] mb-6">Carrinho</h1>

      <div className="space-y-3 mb-6">
        {items.map((item) => {
          const itemTotal = item.product.preco * item.quantity;
          const isOutOfStock = item.product.estoque === 0;
          const exceedsStock = item.quantity > item.product.estoque;

          return (
            <Card key={item.product.id} shadow="sm" className={`flex items-center gap-3 sm:gap-4 ${isOutOfStock ? 'opacity-60' : ''}`}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F8F9FA] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl sm:text-3xl">{productEmojis[item.product.id] || '📦'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/produtos/${item.product.slug}`} className="font-medium text-[#333] text-sm sm:text-base truncate block hover:text-[#25B4D2]">
                  {item.product.nome}
                </Link>
                <p className="text-[#25B4D2] font-bold text-sm sm:text-base">
                  R$ {item.product.preco.toFixed(2).replace('.', ',')}
                </p>
                {isOutOfStock && (
                  <p className="text-xs text-[#C62828] font-medium">Esgotado</p>
                )}
                {exceedsStock && !isOutOfStock && (
                  <p className="text-xs text-[#C62828] font-medium">
                    Estoque insuficiente (disponível: {item.product.estoque})
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                  className="w-7 h-7 bg-[#F8F9FA] rounded-full flex items-center justify-center hover:bg-[#E0E0E0]"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.estoque}
                  className="w-7 h-7 bg-[#F8F9FA] rounded-full flex items-center justify-center hover:bg-[#E0E0E0] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-[#333]">R$ {itemTotal.toFixed(2).replace('.', ',')}</p>
              </div>
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-[#C62828] hover:bg-[#FFEBEE] p-2 rounded-lg"
                aria-label="Remover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                </svg>
              </button>
            </Card>
          );
        })}
      </div>

      <Card shadow="md" className="p-4 sm:p-6">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-[#666]">Subtotal:</span>
            <span className="text-[#333] font-medium">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#666]">Frete:</span>
            <span className="text-[#2E7D32] font-medium">Grátis</span>
          </div>
          <div className="border-t border-[#E0E0E0] pt-2 flex justify-between items-center">
            <span className="text-lg font-bold text-[#333]">Total:</span>
            <span className="text-2xl font-bold text-[#25B4D2]">
              R$ {totalGeral.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/checkout" className="flex-1">
            <Button variant="cta" size="lg" fullWidth>Finalizar Compra</Button>
          </Link>
          <Button variant="ghost" size="lg" onPress={clearCart}>Limpar</Button>
        </div>
      </Card>

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
