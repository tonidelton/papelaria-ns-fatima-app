import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { logActivity } from '../lib/activity';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    endereco: userProfile?.endereco || '',
    formaPagamento: 'pix',
    observacoes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    try {
      const orderData = {
        clienteId: userProfile?.uid || 'guest',
        status: 'novo',
        valorTotal: total,
        enderecoEntrega: form.endereco,
        formaPagamento: form.formaPagamento,
        observacoes: form.observacoes,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      };
      const orderRef = await addDoc(collection(db, 'orders'), orderData);
      
      for (const item of items) {
        await addDoc(collection(db, 'orderItems'), {
          orderId: orderRef.id,
          productId: item.product.id,
          nomeProduto: item.product.nome,
          quantidade: item.quantity,
          precoUnitario: item.product.preco,
        });
      }

      if (userProfile) {
        await logActivity(userProfile.uid, 'criar_pedido', 'orders', { orderId: orderRef.id, valor: total });
      }

      clearCart();
      navigate('/minha-conta');
    } catch (err) {
      console.error('Erro ao finalizar pedido:', err);
      alert('Erro ao finalizar pedido. Tente novamente.');
    }
    setLoading(false);
  };

  if (items.length === 0) {
    navigate('/carrinho');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-6">Finalizar Compra</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card shadow="md" className="p-4 sm:p-6">
          <h2 className="text-lg font-bold text-[#333333] mb-4">Dados de Entrega</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">Endereço de Entrega</label>
              <textarea
                value={form.endereco}
                onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25B4D2]/20 focus:border-[#25B4D2]"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">Forma de Pagamento</label>
              <select
                value={form.formaPagamento}
                onChange={(e) => setForm({ ...form, formaPagamento: e.target.value })}
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25B4D2]/20 focus:border-[#25B4D2]"
              >
                <option value="pix">PIX</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao">Cartão</option>
                <option value="boleto">Boleto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">Observações</label>
              <textarea
                value={form.observacoes}
                onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25B4D2]/20 focus:border-[#25B4D2]"
                rows={2}
              />
            </div>
          </div>
        </Card>

        <Card shadow="md" className="p-4 sm:p-6">
          <h2 className="text-lg font-bold text-[#333333] mb-4">Resumo do Pedido</h2>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-[#666666]">{item.quantity}x {item.product.nome}</span>
                <span className="text-[#333333] font-medium">
                  R$ {(item.product.preco * item.quantity).toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E0E0E0] pt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-[#333333]">Total:</span>
            <span className="text-2xl font-bold text-[#25B4D2]">
              R$ {total.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <Button variant="cta" size="lg" fullWidth onPress={() => {}} loading={loading} className="mt-6">
            Confirmar Pedido
          </Button>
        </Card>
      </form>
    </div>
  );
}
