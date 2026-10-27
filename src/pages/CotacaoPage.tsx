import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';
import { createQuotation } from '../lib/quotationService';
import { mockProducts, productEmojis } from '../data/mockData';
import { Product } from '../types';

interface QuotationItemForm {
  productId: string;
  quantidade: number;
  observacao: string;
}

export default function CotacaoPage() {
  const navigate = useNavigate();
  const { isAuthenticated, userProfile } = useAuth();
  const isEmpresa = isAuthenticated && userProfile?.tipo === 'empresa';

  // Dados da empresa
  const [form, setForm] = useState({
    nomeEmpresa: userProfile?.empresa || '',
    cnpj: userProfile?.cnpj || '',
    nomeContato: userProfile?.nomeCompleto || '',
    email: userProfile?.email || '',
    telefone: userProfile?.telefone || '',
    titulo: '',
    observacoes: '',
  });

  // Itens da cotação
  const [items, setItems] = useState<QuotationItemForm[]>([]);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const availableProducts = mockProducts.filter((p) => p.ativo && p.estoque > 0);
  const filteredProducts = productSearch.trim()
    ? availableProducts.filter(
        (p) =>
          p.nome.toLowerCase().includes(productSearch.toLowerCase()) ||
          p.descricao.toLowerCase().includes(productSearch.toLowerCase())
      )
    : availableProducts;

  const addItem = (product: Product) => {
    if (items.find((i) => i.productId === product.id)) {
      // Já existe, apenas fecha o picker
      setShowProductPicker(false);
      setProductSearch('');
      return;
    }
    setItems([...items, { productId: product.id, quantidade: 1, observacao: '' }]);
    setShowProductPicker(false);
    setProductSearch('');
  };

  const removeItem = (productId: string) => {
    setItems(items.filter((i) => i.productId !== productId));
  };

  const updateItem = (productId: string, field: keyof QuotationItemForm, value: string | number) => {
    setItems(
      items.map((i) => (i.productId === productId ? { ...i, [field]: value } : i))
    );
  };

  const getProductById = (id: string) => mockProducts.find((p) => p.id === id);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.nomeEmpresa.trim()) errs.nomeEmpresa = 'Nome da empresa é obrigatório';
    if (!form.cnpj.trim()) errs.cnpj = 'CNPJ é obrigatório';
    if (!form.nomeContato.trim()) errs.nomeContato = 'Nome do contato é obrigatório';
    if (!form.email.trim()) errs.email = 'E-mail é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'E-mail inválido';
    if (!form.telefone.trim()) errs.telefone = 'Telefone é obrigatório';
    if (!form.titulo.trim()) errs.titulo = 'Título da cotação é obrigatório';
    if (items.length === 0) errs.items = 'Adicione pelo menos um item à cotação';
    items.forEach((item, idx) => {
      if (item.quantidade <= 0) {
        errs[`item_${idx}_qty`] = 'Quantidade deve ser maior que zero';
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const itemsWithNames = items.map((item) => {
      const product = getProductById(item.productId);
      return {
        productId: item.productId,
        nomeProduto: product?.nome || '',
        quantidade: item.quantidade,
        observacao: item.observacao,
      };
    });

    const result = await createQuotation({
      empresaId: userProfile?.uid || 'guest',
      nomeEmpresa: form.nomeEmpresa,
      cnpj: form.cnpj,
      nomeContato: form.nomeContato,
      email: form.email,
      telefone: form.telefone,
      titulo: form.titulo,
      observacoes: form.observacoes,
      items: itemsWithNames,
    });

    if (result.success) {
      navigate(`/cotacao-confirmacao/${result.quotationId}`);
    } else {
      alert(`Erro ao criar cotação: ${result.error}`);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-[#F5EDD8] text-[#A8894F] px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <span>💼</span> B2B - Cotação para Empresas
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#333] mb-2">
          Solicitar Cotação
        </h1>
        <p className="text-sm text-[#666]">
          Preencha o formulário abaixo para receber uma cotação personalizada.
          {isEmpresa && (
            <span className="block mt-1 text-[#25B4D2] font-medium">
              ✓ Seus dados de empresa serão preenchidos automaticamente
            </span>
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dados da empresa */}
          <div className="lg:col-span-2 space-y-6">
            <Card shadow="md" className="p-4 sm:p-6">
              <h2 className="text-lg font-bold text-[#333] mb-4 flex items-center gap-2">
                <span>🏢</span> Dados da Empresa
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nome da Empresa *"
                  value={form.nomeEmpresa}
                  onChangeText={(v) => setForm({ ...form, nomeEmpresa: v })}
                  error={errors.nomeEmpresa}
                  disabled={isEmpresa}
                />
                <Input
                  label="CNPJ *"
                  value={form.cnpj}
                  onChangeText={(v) => setForm({ ...form, cnpj: v })}
                  error={errors.cnpj}
                  placeholder="00.000.000/0000-00"
                  disabled={isEmpresa}
                />
                <Input
                  label="Nome do Contato *"
                  value={form.nomeContato}
                  onChangeText={(v) => setForm({ ...form, nomeContato: v })}
                  error={errors.nomeContato}
                  disabled={isEmpresa}
                />
                <Input
                  label="E-mail *"
                  value={form.email}
                  onChangeText={(v) => setForm({ ...form, email: v })}
                  error={errors.email}
                  type="email"
                  disabled={isEmpresa}
                />
                <Input
                  label="Telefone *"
                  value={form.telefone}
                  onChangeText={(v) => setForm({ ...form, telefone: v })}
                  error={errors.telefone}
                  type="tel"
                  disabled={isEmpresa}
                />
              </div>
            </Card>

            {/* Itens da cotação */}
            <Card shadow="md" className="p-4 sm:p-6">
              <h2 className="text-lg font-bold text-[#333] mb-4 flex items-center gap-2">
                <span>📋</span> Itens da Cotação
              </h2>

              {errors.items && (
                <div className="bg-[#FFEBEE] border border-[#C62828]/20 rounded-lg p-3 mb-4">
                  <p className="text-sm text-[#C62828]">{errors.items}</p>
                </div>
              )}

              {items.length === 0 ? (
                <div className="text-center py-8 bg-[#F8F9FA] rounded-lg">
                  <div className="text-4xl mb-2">📦</div>
                  <p className="text-sm text-[#666]">Nenhum item adicionado</p>
                </div>
              ) : (
                <div className="space-y-3 mb-4">
                  {items.map((item, idx) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    return (
                      <div key={item.productId} className="bg-[#F8F9FA] rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">{productEmojis[product.id] || '📦'}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <p className="font-medium text-[#333] text-sm">{product.nome}</p>
                                <p className="text-xs text-[#666]">
                                  Preço ref: R$ {product.preco.toFixed(2).replace('.', ',')}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(item.productId)}
                                className="text-[#C62828] hover:bg-[#FFEBEE] p-1 rounded"
                                aria-label="Remover item"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                </svg>
                              </button>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <label className="text-xs text-[#666]">Qtd:</label>
                              <input
                                type="number"
                                min="1"
                                value={item.quantidade}
                                onChange={(e) => updateItem(item.productId, 'quantidade', parseInt(e.target.value) || 1)}
                                className="w-20 px-2 py-1 border border-[#E0E0E0] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#25B4D2]/20 focus:border-[#25B4D2]"
                              />
                              {errors[`item_${idx}_qty`] && (
                                <span className="text-xs text-[#C62828]">{errors[`item_${idx}_qty`]}</span>
                              )}
                            </div>
                            <input
                              type="text"
                              placeholder="Observação (opcional)"
                              value={item.observacao}
                              onChange={(e) => updateItem(item.productId, 'observacao', e.target.value)}
                              className="w-full px-2 py-1 border border-[#E0E0E0] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#25B4D2]/20 focus:border-[#25B4D2]"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <Button
                variant="outline"
                fullWidth
                onPress={() => setShowProductPicker(true)}
              >
                + Adicionar Produto
              </Button>
            </Card>

            {/* Observações gerais */}
            <Card shadow="md" className="p-4 sm:p-6">
              <h2 className="text-lg font-bold text-[#333] mb-4 flex items-center gap-2">
                <span>💬</span> Informações Adicionais
              </h2>
              <Input
                label="Título da Cotação *"
                value={form.titulo}
                onChangeText={(v) => setForm({ ...form, titulo: v })}
                error={errors.titulo}
                placeholder="Ex: Material escolar para 50 funcionários"
              />
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  Observações Gerais
                </label>
                <textarea
                  value={form.observacoes}
                  onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E0E0E0] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#25B4D2]/20 focus:border-[#25B4D2] text-sm"
                  rows={4}
                  placeholder="Prazo de entrega desejado, condições especiais, etc."
                />
              </div>
            </Card>
          </div>

          {/* Resumo lateral */}
          <div className="lg:col-span-1">
            <Card shadow="md" className="p-4 sm:p-6 sticky top-20">
              <h2 className="text-lg font-bold text-[#333] mb-4">Resumo</h2>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#666]">Itens:</span>
                  <span className="font-medium text-[#333]">{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Total de unidades:</span>
                  <span className="font-medium text-[#333]">
                    {items.reduce((sum, i) => sum + i.quantidade, 0)}
                  </span>
                </div>
              </div>
              <div className="bg-[#E8F7FB] rounded-lg p-3 mb-4">
                <p className="text-xs text-[#25B4D2] leading-relaxed">
                  💡 Após o envio, nossa equipe analisará sua solicitação e entrará em contato com os valores e condições especiais.
                </p>
              </div>
              <Button
                variant="cta"
                size="lg"
                fullWidth
                onPress={() => {}}
                loading={loading}
                type="submit"
              >
                Enviar Cotação
              </Button>
              <p className="text-xs text-[#999] text-center mt-3">
                {!isAuthenticated
                  ? 'Você pode enviar como visitante'
                  : isEmpresa
                  ? 'Cotação associada à sua conta'
                  : 'Cotação enviada como visitante'}
              </p>
            </Card>
          </div>
        </div>
      </form>

      {/* Product Picker Modal */}
      {showProductPicker && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => {
              setShowProductPicker(false);
              setProductSearch('');
            }}
          />
          <div className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-[#E0E0E0] flex items-center justify-between">
              <h3 className="font-bold text-[#333]">Selecionar Produto</h3>
              <button
                onClick={() => {
                  setShowProductPicker(false);
                  setProductSearch('');
                }}
                className="p-1 hover:bg-[#F8F9FA] rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>
            <div className="p-4 border-b border-[#E0E0E0]">
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Buscar produto..."
                className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25B4D2]/20 focus:border-[#25B4D2] text-sm"
                autoFocus
              />
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {filteredProducts.length === 0 ? (
                <p className="text-center text-sm text-[#666] py-8">Nenhum produto encontrado</p>
              ) : (
                <div className="space-y-1">
                  {filteredProducts.map((product) => {
                    const alreadyAdded = items.some((i) => i.productId === product.id);
                    return (
                      <button
                        key={product.id}
                        onClick={() => addItem(product)}
                        disabled={alreadyAdded}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                          alreadyAdded
                            ? 'bg-[#E8F5E9] cursor-not-allowed'
                            : 'hover:bg-[#F8F9FA]'
                        }`}
                      >
                        <div className="w-10 h-10 bg-[#F8F9FA] rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">{productEmojis[product.id] || '📦'}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#333] text-sm truncate">{product.nome}</p>
                          <p className="text-xs text-[#666]">
                            Ref: R$ {product.preco.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                        {alreadyAdded && (
                          <span className="text-xs text-[#2E7D32] font-medium">✓ Adicionado</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
