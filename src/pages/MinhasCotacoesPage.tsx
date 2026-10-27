import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useRealtimeCollection } from '../hooks/useRealtime';
import { Quotation } from '../types';
import { query, where } from 'firebase/firestore';

export default function MinhasCotacoesPage() {
  const { userProfile } = useAuth();
  const { data: quotations, loading } = useRealtimeCollection<Quotation>(
    'quotations',
    userProfile ? [where('empresaId', '==', userProfile.uid)] : [],
    [userProfile?.uid]
  );

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
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#C6A46A] border-t-transparent"></div>
        <p className="text-[#666] mt-3">Carregando cotações...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#333]">Minhas Cotações</h1>
        <Link to="/cotacao">
          <Button variant="cta" size="sm">+ Nova Cotação</Button>
        </Link>
      </div>

      {quotations.length === 0 ? (
        <Card shadow="sm" className="p-8 text-center">
          <div className="text-5xl mb-3">📋</div>
          <p className="text-[#666] mb-4">Você ainda não enviou nenhuma cotação.</p>
          <Link to="/cotacao" className="text-[#C6A46A] font-medium hover:underline">
            Solicitar primeira cotação →
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {quotations.map((quotation) => (
            <Link key={quotation.id} to={`/minha-conta/cotacoes/${quotation.id}`}>
              <Card shadow="sm" className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-[#333]">Cotação #{quotation.id.slice(0, 8)}</p>
                      {getStatusBadge(quotation.status)}
                    </div>
                    <p className="text-sm text-[#666] truncate">{quotation.titulo}</p>
                    <p className="text-xs text-[#999] mt-1">
                      {quotation.criadoEm instanceof Date
                        ? quotation.criadoEm.toLocaleDateString('pt-BR')
                        : 'Data não disponível'}
                    </p>
                  </div>
                  {quotation.status === 'respondida' && (
                    <div className="text-right">
                      <p className="text-xs text-[#2E7D32] font-medium">✓ Respondida</p>
                      <p className="text-xs text-[#666]">Clique para ver resposta</p>
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
