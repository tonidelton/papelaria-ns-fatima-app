import React, { useEffect } from 'react';
import Card from '../../components/Card';
import { useRealtimeCollection } from '../../hooks/useRealtime';
import { Order, Product } from '../../types';
import { playOrderBeep, showBrowserNotification, requestPermission } from '../../lib/notifications';

export default function DashboardPage() {
  const { data: orders } = useRealtimeCollection<Order>('orders');
  const { data: products } = useRealtimeCollection<Product>('products');

  const novosPedidos = orders.filter(o => o.status === 'novo');

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (novosPedidos.length > 0) {
      playOrderBeep(2);
      showBrowserNotification('Novo Pedido!', { body: `${novosPedidos.length} pedido(s) aguardando atendimento` });
    }
  }, [novosPedidos.length]);

  const stats = [
    { label: 'Pedidos Novos', value: novosPedidos.length, icon: '📦', color: 'bg-[#FFF8E1]' },
    { label: 'Total Pedidos', value: orders.length, icon: '📊', color: 'bg-[#E8F7FB]' },
    { label: 'Produtos', value: products.length, icon: '🏷️', color: 'bg-[#F5EDD8]' },
    { label: 'Receita Total', value: `R$ ${orders.reduce((sum, o) => sum + (o.valorTotal || 0), 0).toFixed(2).replace('.', ',')}`, icon: '💰', color: 'bg-[#E8F5E9]' },
  ];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-6">Dashboard</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((stat, idx) => (
          <Card key={idx} shadow="sm" className="p-4">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-[#333333]">{stat.value}</p>
            <p className="text-sm text-[#666666]">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Pedidos recentes */}
      <Card shadow="md" className="p-4 sm:p-6">
        <h2 className="text-lg font-bold text-[#333333] mb-4">Pedidos Recentes</h2>
        {orders.length === 0 ? (
          <p className="text-sm text-[#666666]">Nenhum pedido ainda.</p>
        ) : (
          <div className="space-y-2">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-lg">
                <div>
                  <p className="text-sm font-medium text-[#333333]">Pedido #{order.id.slice(0, 8)}</p>
                  <p className="text-xs text-[#666666]">Cliente: {order.clienteId.slice(0, 8)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#25B4D2]">R$ {order.valorTotal?.toFixed(2).replace('.', ',')}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    order.status === 'novo' ? 'bg-[#FFF8E1] text-[#F57F17]' :
                    order.status === 'separacao' ? 'bg-[#E8F7FB] text-[#25B4D2]' :
                    'bg-[#E8F5E9] text-[#2E7D32]'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
