import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';

const mockProducts: Product[] = [
  { id: '1', categoriaId: '1', nome: 'Caderno Universitário 200fls', slug: 'caderno-universitario', descricao: 'Caderno universitário capa dura 200 folhas pautadas', preco: 28.90, precoCusto: 18, estoque: 50, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  { id: '2', categoriaId: '1', nome: 'Caneta Esferográfica cx/50', slug: 'caneta-esferografica', descricao: 'Caixa com 50 canetas esferográficas azuis', preco: 45.00, precoCusto: 28, estoque: 30, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  { id: '3', categoriaId: '2', nome: 'Papel A4 Resma 500fls', slug: 'papel-a4', descricao: 'Resma de papel A4 75g/m² 500 folhas', preco: 24.90, precoCusto: 16, estoque: 100, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  { id: '4', categoriaId: '2', nome: 'Pasta Arquivo Morto', slug: 'pasta-arquivo', descricao: 'Pasta arquivo morto polionda', preco: 8.50, precoCusto: 4.5, estoque: 80, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  { id: '5', categoriaId: '3', nome: 'Kit Canetinha 12 cores', slug: 'kit-canetinha', descricao: 'Kit com 12 canetinhas coloridas laváveis', preco: 15.90, precoCusto: 9, estoque: 40, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  { id: '6', categoriaId: '3', nome: 'Cola Bastão 40g', slug: 'cola-bastao', descricao: 'Cola bastão 40g não tóxica', preco: 5.90, precoCusto: 3, estoque: 60, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  { id: '7', categoriaId: '1', nome: 'Mochila Escolar', slug: 'mochila-escolar', descricao: 'Mochila escolar resistente', preco: 89.90, precoCusto: 55, estoque: 20, destaque: false, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  { id: '8', categoriaId: '2', nome: 'Grampeador Médio', slug: 'grampeador', descricao: 'Grampeador médio para escritório', preco: 32.00, precoCusto: 18, estoque: 25, destaque: false, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
];

const emojis: Record<string, string> = { '1': '📓', '2': '🖊️', '3': '📄', '4': '📁', '5': '🖍️', '6': '📌', '7': '🎒', '8': '📎' };

export default function ProdutosPage() {
  const { addItem } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-6">Todos os Produtos</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {mockProducts.map((p) => (
          <Card key={p.id} shadow="sm" className="overflow-hidden p-0 group">
            <Link to={`/produtos/${p.slug}`} className="block">
              <div className="bg-[#F8F9FA] h-28 sm:h-32 lg:h-40 flex items-center justify-center">
                <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform">
                  {emojis[p.id] || '📦'}
                </span>
              </div>
            </Link>
            <div className="p-3">
              <Link to={`/produtos/${p.slug}`}>
                <h3 className="text-sm font-medium text-[#333333] line-clamp-2 mb-2 hover:text-[#25B4D2]">
                  {p.nome}
                </h3>
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#25B4D2]">
                  R$ {p.preco.toFixed(2).replace('.', ',')}
                </span>
                <button
                  onClick={() => addItem(p)}
                  className="bg-[#FF8C42] text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#E67A30] active:scale-90 transition-all shadow-sm"
                  aria-label="Adicionar ao carrinho"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
