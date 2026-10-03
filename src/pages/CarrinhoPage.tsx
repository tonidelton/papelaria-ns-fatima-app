import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useCart } from '../contexts/CartContext';

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-[#333333] mb-2">Seu carrinho está vazio</h1>
        <p className="text-[#666666] mb-6">Adicione produtos para continuar</p>
        <Link to="/produtos">
          <Button variant="primary">Ver Produtos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-6">Carrinho</h1>

      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <Card key={item.product.id} shadow="sm" className="flex items-center gap-3 sm:gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F8F9FA] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl sm:text-3xl">📦</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-[#333333] text-sm sm:text-base truncate">{item.product.nome}</h3>
              <p className="text-[#25B4D2] font-bold text-sm sm:text-base">
                R$ {item.product.preco.toFixed(2).replace('.', ',')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="w-7 h-7 bg-[#F8F9FA] rounded-full flex items-center justify-center hover:bg-[#E0E0E0]"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="w-7 h-7 bg-[#F8F9FA] rounded-full flex items-center justify-center hover:bg-[#E0E0E0]"
              >
                +
              </button>
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
        ))}
      </div>

      <Card shadow="md" className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-[#333333]">Total:</span>
          <span className="text-2xl font-bold text-[#25B4D2]">
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/checkout" className="flex-1">
            <Button variant="cta" size="lg" fullWidth>Finalizar Compra</Button>
          </Link>
          <Button variant="ghost" size="lg" onPress={clearCart}>Limpar Carrinho</Button>
        </div>
      </Card>
    </div>
  );
}
