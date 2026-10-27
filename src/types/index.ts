// Tipos TypeScript para o aplicativo

export interface User {
  uid: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  endereco: string;
  tipo: 'consumidor' | 'empresa';
  empresa?: string;
  cnpj?: string;
  role: 'cliente' | 'operador' | 'admin';
  criadoEm: Date;
}

export interface Category {
  id: string;
  nome: string;
  slug: string;
  ordem: number;
  ativo: boolean;
}

export interface Product {
  id: string;
  categoriaId: string;
  nome: string;
  slug: string;
  descricao: string;
  preco: number;
  precoCusto: number;
  estoque: number;
  destaque: boolean;
  ativo: boolean;
  imagemUrl: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  ordem: number;
}

export type OrderStatus = 'novo' | 'separacao' | 'concluido' | 'entregue';

export interface Order {
  id: string;
  clienteId: string;
  status: OrderStatus;
  valorTotal: number;
  enderecoEntrega: string;
  formaPagamento: string;
  observacoes: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
}

export type QuotationStatus = 'nova' | 'analise' | 'respondida' | 'fechada';

export interface Quotation {
  id: string;
  empresaId: string;
  titulo: string;
  observacoes: string;
  status: QuotationStatus;
  resposta: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface QuotationItem {
  id: string;
  quotationId: string;
  productId: string;
  nomeProduto: string;
  quantidade: number;
  observacao: string;
}

export type NotificationType = 'email' | 'whatsapp' | 'push';
export type NotificationStatus = 'enviado' | 'falhou' | 'pendente';

export interface NotificationLog {
  id: string;
  tipo: NotificationType;
  destino: string;
  payload: Record<string, unknown>;
  status: NotificationStatus;
  criadoEm: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  acao: string;
  entidade: string;
  detalhes: Record<string, unknown>;
  criadoEm: Date;
}

export interface ServiceCard {
  id: string;
  titulo: string;
  descricao: string;
  icon: string;
  cor: string;
}
