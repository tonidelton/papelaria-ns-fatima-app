import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import { useRealtimeCollection } from '../hooks/useRealtime';
import { Order, OrderItem } from '../types';
import { query, where } from 'firebase/firestore';

export default function PedidoDetalhePage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: orders } = useRealtimeCollection<Order>('orders', [where('__name__', '==', orderId || '')], [orderId]);
  const { data: orderItems } = useRealtimeCollection<OrderItem>('orderItems', [where('orderId', '==', orderId || '')], [orderId]);

  const order = orders[0];

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12 text-center">
        <p className="text-[#666]">Pedido não encontrado.</p>
        <Link to="/minha-conta/pedidos" className="text-[#25B4D2] font-medium hover:underline mt-3 inline-block">
          ← Voltar aos pedidos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <Link to="/minha-conta/pedidos" className="text-sm text-[#25B4D2] font-medium hover:underline mb-4 inline-block">
        ← Voltar aos pedidos
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-[#333] mb-6">Pedido #{order.id.slice(0, 8)}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status e dados */}
        <Card shadow="md" className="p-4 sm:p-6">
          <h2 className="text-lg font-bold text-[#333] mb-4">Status do Pedido</h2>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-sm px-3 py-1.5 rounded-full font-medium ${
              order.status === 'novo' ? 'bg-[#FFF8E1] text-[#F57F17]' :
              order.status === 'separacao' ? 'bg-[#E8F7FB] text-[#25B4D2]' :
              order.status === 'concluido' ? 'bg-[#E8F5E9] text-[#2E7D32]' :
              'bg-[#F8F9FA] text-[#666]'
            }`}>
              {order.status}
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#666]">Data:</span>
              <span className="text-[#333] font-medium">
                {order.criadoEm instanceof Date ? order.criadoEm.toLocaleDateString('pt-BR') : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">Pagamento:</span>
              <span className="text-[#333] font-medium capitalize">{order.formaPagamento}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">Total:</span>
              <span className="text-[#25B4D2] font-bold text-lg">
                R$ {order.valorTotal?.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </Card>

        {/* Endereço */}
        <Card shadow="md" className="p-4 sm:p-6">
          <h2 className="text-lg font-bold text-[#333] mb-4">Endereço de Entrega</h2>
          <p className="text-sm text-[#666] leading-relaxed">{order.enderecoEntrega}</p>
          {order.observacoes && (
            <div className="mt-4 pt-4 border-t border-[#E0E0E0]">
              <p className="text-sm font-medium text-[#333] mb-1">Observações:</p>
              <p className="text-sm text-[#666]">{order.observacoes}</p>
            </div>
          )}
        </Card>
      </div>

      {/* Itens do pedido */}
      <Card shadow="md" className="p-4 sm:p-6 mt-6">
        <h2 className="text-lg font-bold text-[#333] mb-4">Itens do Pedido</h2>
        <div className="space-y-3">
          {orderItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-[#E0E0E0] last:border-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-[#333]">{item.nomeProduto}</p>
                <p className="text-xs text-[#666]">{item.quantidade}x R$ {item.precoUnitario?.toFixed(2).replace('.', ',')}</p>
              </div>
              <span className="text-sm font-bold text-[#333]">
                R$ {(item.quantidade * item.precoUnitario).toFixed(2).replace('.', ',')}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6 text-center">
        <button
          onClick={() => window.print()}
          className="text-sm text-[#25B4D2] font-medium hover:underline"
        >
          Imprimir pedido
        </button>
      </div>
    </div>
  );
}
