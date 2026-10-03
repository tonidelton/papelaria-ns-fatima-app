import React from 'react';
import Card from '../../components/Card';
import { useRealtimeCollection } from '../../hooks/useRealtime';
import { Product } from '../../types';

export default function ProdutosPage() {
  const { data: products, loading } = useRealtimeCollection<Product>('products');

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-6">Produtos</h1>
      
      {loading ? (
        <p className="text-sm text-[#666666]">Carregando...</p>
      ) : products.length === 0 ? (
        <Card shadow="sm" className="p-6 text-center">
          <p className="text-sm text-[#666666]">Nenhum produto cadastrado.</p>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E0E0E0]">
                <th className="text-left py-3 px-2 font-medium text-[#666666]">Nome</th>
                <th className="text-left py-3 px-2 font-medium text-[#666666] hidden sm:table-cell">Preço</th>
                <th className="text-left py-3 px-2 font-medium text-[#666666] hidden md:table-cell">Estoque</th>
                <th className="text-left py-3 px-2 font-medium text-[#666666]">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-[#E0E0E0] hover:bg-[#F8F9FA]">
                  <td className="py-3 px-2 font-medium text-[#333333]">{p.nome}</td>
                  <td className="py-3 px-2 text-[#666666] hidden sm:table-cell">R$ {p.preco?.toFixed(2).replace('.', ',')}</td>
                  <td className="py-3 px-2 text-[#666666] hidden md:table-cell">{p.estoque}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.ativo ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFEBEE] text-[#C62828]'}`}>
                      {p.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
