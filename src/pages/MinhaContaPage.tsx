import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { useRealtimeCollection } from '../hooks/useRealtime';
import { Order } from '../types';

export default function MinhaContaPage() {
  const { userProfile, logout } = useAuth();
  const { data: orders, loading } = useRealtimeCollection<Order>('orders', [], [userProfile?.uid]);

  const userOrders = orders.filter(o => o.clienteId === userProfile?.uid);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-6">Minha Conta</h1>

      {/* Perfil */}
      <Card shadow="md" className="p-4 sm:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#25B4D2] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">
              {userProfile?.nomeCompleto?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#333333]">{userProfile?.nomeCompleto}</h2>
            <p className="text-sm text-[#666666]">{userProfile?.email}</p>
            <p className="text-sm text-[#666666]">{userProfile?.telefone}</p>
            <span className="inline-block mt-1 text-xs bg-[#E8F7FB] text-[#25B4D2] px-2 py-0.5 rounded-full font-medium">
              {userProfile?.tipo === 'empresa' ? '🏢 Empresa' : '👤 Pessoa Física'}
            </span>
          </div>
        </div>
      </Card>

      {/* Pedidos */}
      <Card shadow="md" className="p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-bold text-[#333333] mb-4">Meus Pedidos</h2>
        {loading ? (
          <p className="text-sm text-[#666666]">Carregando...</p>
        ) : userOrders.length === 0 ? (
          <p className="text-sm text-[#666666]">Você ainda não fez nenhum pedido.</p>
        ) : (
          <div className="space-y-3">
            {userOrders.map((order) => (
              <div key={order.id} className="border border-[#E0E0E0] rounded-lg p-3 sm:p-4 print:border-black">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-[#333333]">Pedido #{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-[#666666]">
                      {order.criadoEm instanceof Date ? order.criadoEm.toLocaleDateString('pt-BR') : 'Data não disponível'}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    order.status === 'novo' ? 'bg-[#FFF8E1] text-[#F57F17]' :
                    order.status === 'separacao' ? 'bg-[#E8F7FB] text-[#25B4D2]' :
                    order.status === 'concluido' ? 'bg-[#E8F5E9] text-[#2E7D32]' :
                    'bg-[#F8F9FA] text-[#666666]'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666666]">Total:</span>
                  <span className="text-base font-bold text-[#25B4D2]">
                    R$ {order.valorTotal?.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <button
                  onClick={handlePrint}
                  className="mt-2 text-xs text-[#25B4D2] font-medium hover:underline print:hidden"
                >
                  Imprimir pedido
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" fullWidth onPress={() => logout()}>Sair da Conta</Button>
      </div>
    </div>
  );
}
