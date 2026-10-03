import React from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useRealtimeCollection } from '../../hooks/useRealtime';
import { Order } from '../../types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function PedidosPage() {
  const { data: orders, loading } = useRealtimeCollection<Order>('orders');

  const updateStatus = async (orderId: string, status: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status, atualizadoEm: new Date() });
    } catch (err) {
      console.error('Erro ao atualizar pedido:', err);
    }
  };

  const handlePrint = () => window.print();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#333333]">Pedidos</h1>
        <Button variant="outline" onPress={handlePrint}>Imprimir</Button>
      </div>
      
      {loading ? (
        <p className="text-sm text-[#666666]">Carregando...</p>
      ) : orders.length === 0 ? (
        <Card shadow="sm" className="p-6 text-center">
          <p className="text-sm text-[#666666]">Nenhum pedido encontrado.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Card key={order.id} shadow="sm" className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-[#333333]">Pedido #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-[#666666]">Cliente: {order.clienteId.slice(0, 8)}</p>
                  <p className="text-sm text-[#666666]">Total: R$ {order.valorTotal?.toFixed(2).replace('.', ',')}</p>
                  <p className="text-xs text-[#999999]">Pagamento: {order.formaPagamento}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as Order['status'])}
                    className="px-3 py-2 border border-[#E0E0E0] rounded-lg text-sm"
                  >
                    <option value="novo">Novo</option>
                    <option value="separacao">Separação</option>
                    <option value="concluido">Concluído</option>
                    <option value="entregue">Entregue</option>
                  </select>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
