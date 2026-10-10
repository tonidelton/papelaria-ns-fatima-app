import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { createOrder } from '../lib/orderService';
import { productEmojis } from '../data/mockData';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { isAuthenticated, userProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: userProfile?.nomeCompleto || '',
    telefone: userProfile?.telefone || '',
    email: userProfile?.email || '',
    endereco: userProfile?.endereco || '',
    formaPagamento: 'pix',
    observacoes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    navigate('/carrinho');
    return null;
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = 'Nome é obrigatório';
    if (!form.telefone.trim()) errs.telefone = 'Telefone é obrigatório';
    if (!form.email.trim()) errs.email = 'E-mail é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'E-mail inválido';
    if (!form.endereco.trim()) errs.endereco = 'Endereço é obrigatório';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const result = await createOrder({
      clienteId: userProfile?.uid || 'guest',
      nomeCliente: form.nome,
      telefone: form.telefone,
      email: form.email,
      enderecoEntrega: form.endereco,
      formaPagamento: form.formaPagamento,
      observacoes: form.observacoes,
      items,
      valorTotal: total,
    });

    if (result.success) {
      clearCart();
      navigate(`/pedido-confirmacao/${result.orderId}`);
    } else {
      alert(`Erro ao criar pedido: ${result.error}`);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333] mb-6">Finalizar Compra</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dados do cliente */}
        <div className="lg:col-span-2 space-y-6">
          <Card shadow="md" className="p-4 sm:p-6">
            <h2 className="text-lg font-bold text-[#333] mb-4">
              {isAuthenticated ? 'Seus Dados' : 'Dados para Entrega'}
            </h2>
            {!isAuthenticated && (
              <p className="text-sm text-[#666] mb-4">
                Você pode finalizar como visitante ou{' '}
                <button type="button" onClick={() => navigate('/login')} className="text-[#25B4D2] font-medium hover:underline">
                  fazer login
                </button>{' '}
                para salvar seus dados.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nome Completo *"
                value={form.nome}
                onChangeText={(v) => setForm({ ...form, nome: v })}
                error={errors.nome}
              />
              <Input
                label="Telefone *"
                value={form.telefone}
                onChangeText={(v) => setForm({ ...form, telefone: v })}
                type="tel"
                error={errors.telefone}
              />
              <Input
                label="E-mail *"
                value={form.email}
                onChangeText={(v) => setForm({ ...form, email: v })}
                type="email"
                error={errors.email}
              />
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">Forma de Pagamento</label>
                <select
                  value={form.formaPagamento}
                  onChange={(e) => setForm({ ...form, formaPagamento: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E0E0E0] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#25B4D2]/20 focus:border-[#25B4D2]"
                >
                  <option value="pix">PIX</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="cartao">Cartão</option>
                  <option value="boleto">Boleto</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <Input
                label="Endereço de Entrega *"
                value={form.endereco}
                onChangeText={(v) => setForm({ ...form, endereco: v })}
                error={errors.endereco}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#333] mb-1.5">Observações</label>
              <textarea
                value={form.observacoes}
                onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#25B4D2]/20 focus:border-[#25B4D2] text-sm"
                rows={3}
                placeholder="Ex: entregar na portaria, ponto de referência..."
              />
            </div>
          </Card>
        </div>

        {/* Resumo */}
        <div>
          <Card shadow="md" className="p-4 sm:p-6 sticky top-20">
            <h2 className="text-lg font-bold text-[#333] mb-4">Resumo do Pedido</h2>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-start gap-2">
                  <span className="text-xl flex-shrink-0">{productEmojis[item.product.id] || '📦'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#333] truncate">{item.product.nome}</p>
                    <p className="text-xs text-[#666]">{item.quantity}x R$ {item.product.preco.toFixed(2).replace('.', ',')}</p>
                  </div>
                  <span className="text-sm font-medium text-[#333]">
                    R$ {(item.product.preco * item.quantity).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E0E0E0] pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#666]">Subtotal:</span>
                <span className="text-[#333]">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#666]">Frete:</span>
                <span className="text-[#2E7D32]">Grátis</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#E0E0E0]">
                <span className="text-lg font-bold text-[#333]">Total:</span>
                <span className="text-2xl font-bold text-[#25B4D2]">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
            <Button variant="cta" size="lg" fullWidth onPress={() => {}} loading={loading} type="submit" className="mt-6">
              Confirmar Pedido
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
}
