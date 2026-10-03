import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';

const mockProducts: Record<string, Product> = {
  'caderno-universitario': { id: '1', categoriaId: '1', nome: 'Caderno Universitário 200fls', slug: 'caderno-universitario', descricao: 'Caderno universitário capa dura 200 folhas pautadas. Ideal para estudantes e profissionais.', preco: 28.90, precoCusto: 18, estoque: 50, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  'caneta-esferografica': { id: '2', categoriaId: '1', nome: 'Caneta Esferográfica cx/50', slug: 'caneta-esferografica', descricao: 'Caixa com 50 canetas esferográficas azuis. Escrita suave e durável.', preco: 45.00, precoCusto: 28, estoque: 30, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  'papel-a4': { id: '3', categoriaId: '2', nome: 'Papel A4 Resma 500fls', slug: 'papel-a4', descricao: 'Resma de papel A4 75g/m² 500 folhas. Alta qualidade para impressoras e copiadoras.', preco: 24.90, precoCusto: 16, estoque: 100, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  'pasta-arquivo': { id: '4', categoriaId: '2', nome: 'Pasta Arquivo Morto', slug: 'pasta-arquivo', descricao: 'Pasta arquivo morto polionda. Resistente e durável.', preco: 8.50, precoCusto: 4.5, estoque: 80, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  'kit-canetinha': { id: '5', categoriaId: '3', nome: 'Kit Canetinha 12 cores', slug: 'kit-canetinha', descricao: 'Kit com 12 canetinhas coloridas laváveis. Atóxicas e seguras.', preco: 15.90, precoCusto: 9, estoque: 40, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
  'cola-bastao': { id: '6', categoriaId: '3', nome: 'Cola Bastão 40g', slug: 'cola-bastao', descricao: 'Cola bastão 40g não tóxica. Ideal para trabalhos escolares.', preco: 5.90, precoCusto: 3, estoque: 60, destaque: true, ativo: true, imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date() },
};

const emojis: Record<string, string> = { '1': '📓', '2': '🖊️', '3': '📄', '4': '📁', '5': '🖍️', '6': '📌' };

export default function ProdutoDetalhePage() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();
  const product = slug ? mockProducts[slug] : null;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-[#333333] mb-4">Produto não encontrado</h1>
        <Link to="/produtos" className="text-[#25B4D2] font-medium hover:underline">
          ← Voltar aos produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
      <Link to="/produtos" className="text-sm text-[#25B4D2] font-medium hover:underline mb-4 inline-block">
        ← Voltar aos produtos
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Imagem */}
        <Card shadow="md" className="overflow-hidden p-0">
          <div className="bg-[#F8F9FA] h-64 sm:h-80 lg:h-[450px] flex items-center justify-center">
            <span className="text-8xl sm:text-9xl">{emojis[product.id] || '📦'}</span>
          </div>
        </Card>

        {/* Detalhes */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-3">{product.nome}</h1>
          <p className="text-3xl sm:text-4xl font-bold text-[#25B4D2] mb-4">
            R$ {product.preco.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-base text-[#666666] mb-6 leading-relaxed">{product.descricao}</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#2E7D32]">✓</span>
              <span className="text-[#666666]">Em estoque: {product.estoque} unidades</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#2E7D32]">✓</span>
              <span className="text-[#666666]">Entrega rápida</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="cta" size="lg" fullWidth onPress={() => addItem(product)}>
              Adicionar ao Carrinho
            </Button>
            <Link to="/carrinho">
              <Button variant="outline" size="lg" fullWidth onPress={() => {}}>
                Ver Carrinho
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
