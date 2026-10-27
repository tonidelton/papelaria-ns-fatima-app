import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

export default function PedidoConfirmacaoPage() {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-6 py-12 text-center">
      <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333] mb-2">Pedido Confirmado!</h1>
      <p className="text-[#666] mb-6">Seu pedido foi recebido com sucesso.</p>

      <Card shadow="md" className="p-6 mb-6">
        <p className="text-sm text-[#666] mb-1">Número do Pedido:</p>
        <p className="text-2xl font-bold text-[#25B4D2] mb-4">#{orderId?.slice(0, 8)}</p>
        <p className="text-sm text-[#666]">
          Você receberá um e-mail com os detalhes do pedido. Nossa equipe já está separando seus produtos!
        </p>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/minha-conta/pedidos">
          <Button variant="primary">Ver Meus Pedidos</Button>
        </Link>
        <Link to="/produtos">
          <Button variant="outline">Continuar Comprando</Button>
        </Link>
      </div>
    </div>
  );
}
