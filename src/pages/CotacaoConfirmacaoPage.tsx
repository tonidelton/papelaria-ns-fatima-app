import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

export default function CotacaoConfirmacaoPage() {
  const { quotationId } = useParams<{ quotationId: string }>();

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-6 py-12 text-center">
      <div className="w-20 h-20 bg-[#F5EDD8] rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C6A46A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333] mb-2">Cotação Enviada!</h1>
      <p className="text-[#666] mb-6">
        Sua solicitação foi recebida com sucesso. Nossa equipe analisará e entrará em contato em breve.
      </p>

      <Card shadow="md" className="p-6 mb-6">
        <p className="text-sm text-[#666] mb-1">Número da Cotação:</p>
        <p className="text-2xl font-bold text-[#C6A46A] mb-4">#{quotationId?.slice(0, 8)}</p>
        <div className="bg-[#F5EDD8] rounded-lg p-4 text-left">
          <p className="text-sm text-[#A8894F] leading-relaxed">
            💡 <strong>O que acontece agora?</strong><br />
            1. Nossa equipe analisa sua solicitação<br />
            2. Você recebe um e-mail com a cotação detalhada<br />
            3. Você pode acompanhar o status na área "Minhas Cotações"
          </p>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/minha-conta/cotacoes">
          <Button variant="primary">Ver Minhas Cotações</Button>
        </Link>
        <Link to="/">
          <Button variant="outline">Voltar ao Início</Button>
        </Link>
      </div>
    </div>
  );
}
