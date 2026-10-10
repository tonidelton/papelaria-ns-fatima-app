import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { useRealtimeCollection } from '../hooks/useRealtime';
import { Order } from '../types';
import { query, where } from 'firebase/firestore';

export default function MeusPedidosPage() {
  const { userProfile } = useAuth();
  const { data: orders, loading } = useRealtimeCollection<Order>(
    'orders',
    userProfile ? [where('clienteId', '==', userProfile.uid)] : [],
    [userProfile?.uid]
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#25B4D2] border-t-transparent"></div>
        <p className="text-[#666] mt-3">Carregando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333] mb-6">Meus Pedidos</h1>

      {orders.length === 0 ? (
        <Card shadow="sm" className="p-8 text-center">
          <div className="text-5xl mb-3">📦</div>
          <p className="text-[#666] mb-4">Você ainda não fez nenhum pedido.</p>
          <Link to="/produtos" className="text-[#25B4D2] font-medium hover:underline">
            Começar a comprar →
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link key={order.id} to={`/minha-conta/pedidos/${order.id}`}>
              <Card shadow="sm" className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-[#333]">Pedido #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-[#666]">
                      {order.criadoEm instanceof Date
                        ? order.criadoEm.toLocaleDateString('pt-BR')
                        : 'Data não disponível'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-[#25B4D2]">
                      R$ {order.valorTotal?.toFixed(2).replace('.', ',')}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      order.status === 'novo' ? 'bg-[#FFF8E1] text-[#F57F17]' :
                      order.status === 'separacao' ? 'bg-[#E8F7FB] text-[#25B4D2]' :
                      order.status === 'concluido' ? 'bg-[#E8F5E9] text-[#2E7D32]' :
                      'bg-[#F8F9FA] text-[#666]'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
