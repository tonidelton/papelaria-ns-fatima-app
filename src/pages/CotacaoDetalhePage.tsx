import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useRealtimeCollection } from '../hooks/useRealtime';
import { Quotation, QuotationItem } from '../types';
import { query, where } from 'firebase/firestore';

export default function CotacaoDetalhePage() {
  const { quotationId } = useParams<{ quotationId: string }>();
  const { data: quotations } = useRealtimeCollection<Quotation>(
    'quotations',
    [where('__name__', '==', quotationId || '')],
    [quotationId]
  );
  const { data: quotationItems } = useRealtimeCollection<QuotationItem>(
    'quotationItems',
    [where('quotationId', '==', quotationId || '')],
    [quotationId]
  );

  const quotation = quotations[0];

  if (!quotation) {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12 text-center">
        <p className="text-[#666]">Cotação não encontrada.</p>
        <Link to="/minha-conta/cotacoes" className="text-[#C6A46A] font-medium hover:underline mt-3 inline-block">
          ← Voltar às cotações
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: Quotation['status']) => {
    const styles = {
      nova: 'bg-[#FFF8E1] text-[#F57F17]',
      analise: 'bg-[#E8F7FB] text-[#25B4D2]',
      respondida: 'bg-[#E8F5E9] text-[#2E7D32]',
      fechada: 'bg-[#F8F9FA] text-[#666]',
    };
    const labels = {
      nova: 'Nova',
      analise: 'Em análise',
      respondida: 'Respondida',
      fechada: 'Fechada',
    };
    return (
      <span className={`text-sm px-3 py-1.5 rounded-full font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <Link to="/minha-conta/cotacoes" className="text-sm text-[#C6A46A] font-medium hover:underline mb-4 inline-block">
        ← Voltar às cotações
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#333] mb-2">
            Cotação #{quotation.id.slice(0, 8)}
          </h1>
          <p className="text-sm text-[#666]">{quotation.titulo}</p>
        </div>
        {getStatusBadge(quotation.status)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dados da empresa */}
        <Card shadow="md" className="p-4 sm:p-6">
          <h2 className="text-lg font-bold text-[#333] mb-4 flex items-center gap-2">
            <span>🏢</span> Dados da Empresa
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#666]">Empresa:</span>
              <span className="text-[#333] font-medium text-right max-w-[200px] truncate">
                {(quotation as any).nomeEmpresa || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">CNPJ:</span>
              <span className="text-[#333] font-medium">{(quotation as any).cnpj || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">Contato:</span>
              <span className="text-[#333] font-medium">{(quotation as any).nomeContato || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">E-mail:</span>
              <span className="text-[#333] font-medium">{(quotation as any).email || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">Telefone:</span>
              <span className="text-[#333] font-medium">{(quotation as any).telefone || 'N/A'}</span>
            </div>
            <div className="pt-2 border-t border-[#E0E0E0]">
              <p className="text-[#666] mb-1">Data:</p>
              <p className="text-[#333] font-medium">
                {quotation.criadoEm instanceof Date
                  ? quotation.criadoEm.toLocaleDateString('pt-BR')
                  : 'N/A'}
              </p>
            </div>
          </div>
        </Card>

        {/* Resposta da papelaria */}
        <Card shadow="md" className="p-4 sm:p-6">
          <h2 className="text-lg font-bold text-[#333] mb-4 flex items-center gap-2">
            <span>💬</span> Resposta da Papelaria
          </h2>
          {quotation.status === 'respondida' && quotation.resposta ? (
            <div className="bg-[#E8F5E9] border border-[#2E7D32]/20 rounded-lg p-4">
              <p className="text-sm text-[#2E7D32] leading-relaxed whitespace-pre-wrap">
                {quotation.resposta}
              </p>
            </div>
          ) : (
            <div className="bg-[#F8F9FA] rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">⏳</div>
              <p className="text-sm text-[#666]">
                {quotation.status === 'nova'
                  ? 'Sua cotação está aguardando análise'
                  : quotation.status === 'analise'
                  ? 'Sua cotação está sendo analisada'
                  : 'Aguardando resposta'}
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Itens da cotação */}
      <Card shadow="md" className="p-4 sm:p-6 mt-6">
        <h2 className="text-lg font-bold text-[#333] mb-4 flex items-center gap-2">
          <span>📋</span> Itens Solicitados
        </h2>
        {quotationItems.length === 0 ? (
          <p className="text-sm text-[#666] text-center py-4">Nenhum item encontrado</p>
        ) : (
          <div className="space-y-3">
            {quotationItems.map((item) => (
              <div key={item.id} className="flex items-start justify-between py-3 border-b border-[#E0E0E0] last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#333]">{item.nomeProduto}</p>
                  <p className="text-xs text-[#666]">Quantidade: {item.quantidade}</p>
                  {item.observacao && (
                    <p className="text-xs text-[#999] mt-1">Obs: {item.observacao}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Observações gerais */}
      {quotation.observacoes && (
        <Card shadow="md" className="p-4 sm:p-6 mt-6">
          <h2 className="text-lg font-bold text-[#333] mb-4 flex items-center gap-2">
            <span>💭</span> Observações Gerais
          </h2>
          <p className="text-sm text-[#666] leading-relaxed whitespace-pre-wrap">
            {quotation.observacoes}
          </p>
        </Card>
      )}

      {/* Ações */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        {quotation.status === 'respondida' && (
          <Button variant="cta" fullWidth onPress={() => alert('Funcionalidade de gerar pedido a partir da cotação será implementada em breve')}>
            Gerar Pedido a partir desta Cotação
          </Button>
        )}
        <button
          onClick={() => window.print()}
          className="text-sm text-[#C6A46A] font-medium hover:underline"
        >
          Imprimir cotação
        </button>
      </div>
    </div>
  );
}
