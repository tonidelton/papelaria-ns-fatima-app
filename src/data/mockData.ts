import { Product, Category } from '../types';

export const mockCategories: Category[] = [
  { id: '1', nome: 'Material Escolar', slug: 'material-escolar', ordem: 1, ativo: true },
  { id: '2', nome: 'Material de Escritório', slug: 'material-escritorio', ordem: 2, ativo: true },
  { id: '3', nome: 'Papelaria Fina', slug: 'papelaria-fina', ordem: 3, ativo: true },
  { id: '4', nome: 'Impressão e Cópias', slug: 'impressao-copias', ordem: 4, ativo: true },
  { id: '5', nome: 'Embalagens', slug: 'embalagens', ordem: 5, ativo: true },
];

export const mockProducts: Product[] = [
  {
    id: '1', categoriaId: '1', nome: 'Caderno Universitário 200fls', slug: 'caderno-universitario-200fls',
    descricao: 'Caderno universitário capa dura 200 folhas pautadas. Ideal para estudantes e profissionais. Capa resistente e miolo de alta qualidade.',
    preco: 28.90, precoCusto: 18.00, estoque: 50, destaque: true, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '2', categoriaId: '1', nome: 'Caneta Esferográfica Azul cx/50', slug: 'caneta-esferografica-azul',
    descricao: 'Caixa com 50 canetas esferográficas azuis. Escrita suave e durável. Ponta média 1.0mm.',
    preco: 45.00, precoCusto: 28.00, estoque: 30, destaque: true, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '3', categoriaId: '2', nome: 'Papel A4 Resma 500fls', slug: 'papel-a4-resma',
    descricao: 'Resma de papel A4 75g/m² 500 folhas. Alta qualidade para impressoras e copiadoras. Brancura excepcional.',
    preco: 24.90, precoCusto: 16.00, estoque: 100, destaque: true, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '4', categoriaId: '2', nome: 'Pasta Arquivo Morto', slug: 'pasta-arquivo-morto',
    descricao: 'Pasta arquivo morto polionda. Resistente e durável. Capacidade para 200 folhas.',
    preco: 8.50, precoCusto: 4.50, estoque: 80, destaque: true, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '5', categoriaId: '1', nome: 'Kit Canetinha 12 cores', slug: 'kit-canetinha-12-cores',
    descricao: 'Kit com 12 canetinhas coloridas laváveis. Atóxicas e seguras para crianças.',
    preco: 15.90, precoCusto: 9.00, estoque: 40, destaque: true, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '6', categoriaId: '1', nome: 'Cola Bastão 40g', slug: 'cola-bastao-40g',
    descricao: 'Cola bastão 40g não tóxica. Ideal para trabalhos escolares. Secagem rápida.',
    preco: 5.90, precoCusto: 3.00, estoque: 60, destaque: true, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '7', categoriaId: '1', nome: 'Mochila Escolar Resistente', slug: 'mochila-escolar',
    descricao: 'Mochila escolar resistente com múltiplos compartimentos. Alças acolchoadas.',
    preco: 89.90, precoCusto: 55.00, estoque: 20, destaque: false, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '8', categoriaId: '2', nome: 'Grampeador Médio', slug: 'grampeador-medio',
    descricao: 'Grampeador médio para escritório. Capacidade para 25 folhas. Inclui 1000 grampos.',
    preco: 32.00, precoCusto: 18.00, estoque: 25, destaque: false, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '9', categoriaId: '3', nome: 'Agenda 2024 Capa Dura', slug: 'agenda-2024',
    descricao: 'Agenda 2024 capa dura com planejamento semanal. Papel de alta qualidade.',
    preco: 45.00, precoCusto: 25.00, estoque: 15, destaque: true, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '10', categoriaId: '3', nome: 'Caneta Tinteiro Premium', slug: 'caneta-tinteiro-premium',
    descricao: 'Caneta tinteiro premium com acabamento em metal. Inclui 2 cartuchos de tinta.',
    preco: 65.00, precoCusto: 38.00, estoque: 10, destaque: false, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '11', categoriaId: '2', nome: 'Calculadora Científica', slug: 'calculadora-cientifica',
    descricao: 'Calculadora científica com 240 funções. Display de 12 dígitos. Alimentação solar e bateria.',
    preco: 75.00, precoCusto: 45.00, estoque: 18, destaque: false, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '12', categoriaId: '2', nome: 'Tesoura Multiuso 21cm', slug: 'tesoura-multiuso',
    descricao: 'Tesoura multiuso 21cm em aço inoxidável. Cabo ergonômico.',
    preco: 12.50, precoCusto: 6.50, estoque: 35, destaque: false, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '13', categoriaId: '4', nome: 'Impressão Colorida A4', slug: 'impressao-colorida-a4',
    descricao: 'Impressão colorida em papel A4 75g. Alta qualidade de imagem.',
    preco: 1.50, precoCusto: 0.50, estoque: 999, destaque: false, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '14', categoriaId: '4', nome: 'Cópia Preto e Branco A4', slug: 'copia-preto-branco',
    descricao: 'Cópia em preto e branco em papel A4 75g. Frente e verso disponível.',
    preco: 0.30, precoCusto: 0.10, estoque: 999, destaque: false, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '15', categoriaId: '5', nome: 'Saco Plástico Transparente', slug: 'saco-plastico',
    descricao: 'Saco plástico transparente 20x30cm. Pacote com 100 unidades.',
    preco: 18.00, precoCusto: 10.00, estoque: 45, destaque: false, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
  {
    id: '16', categoriaId: '5', nome: 'Caixa de Papelão Pequena', slug: 'caixa-papelao-pequena',
    descricao: 'Caixa de papelão pequena 20x15x10cm. Resistente para embalagens.',
    preco: 3.50, precoCusto: 1.80, estoque: 0, destaque: false, ativo: true,
    imagemUrl: '', criadoEm: new Date(), atualizadoEm: new Date()
  },
];

export const productEmojis: Record<string, string> = {
  '1': '📓', '2': '🖊️', '3': '📄', '4': '📁', '5': '🖍️', '6': '📌',
  '7': '🎒', '8': '📎', '9': '📅', '10': '✒️', '11': '🔢', '12': '✂️',
  '13': '🖨️', '14': '📋', '15': '📦', '16': '📦'
};
