// Simula a Cloud Function de notificação de pedidos
// Em produção, isso seria uma Cloud Function trigger no Firestore
import { addDoc, collection, doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { CartItem } from '../contexts/CartContext';

export interface OrderData {
  clienteId: string;
  nomeCliente: string;
  telefone: string;
  email: string;
  enderecoEntrega: string;
  formaPagamento: string;
  observacoes: string;
  items: CartItem[];
  valorTotal: number;
}

export interface OrderResult {
  orderId: string;
  success: boolean;
  error?: string;
}

// Simula envio de email (em produção, seria Cloud Function)
async function sendOrderEmail(orderData: OrderData, orderId: string): Promise<void> {
  const emailPayload = {
    to: 'papelaria@exemplo.com',
    subject: `Novo Pedido #${orderId.slice(0, 8)}`,
    html: `
      <h2>Novo Pedido Recebido</h2>
      <p><strong>Pedido:</strong> #${orderId.slice(0, 8)}</p>
      <p><strong>Cliente:</strong> ${orderData.nomeCliente}</p>
      <p><strong>Telefone:</strong> ${orderData.telefone}</p>
      <p><strong>E-mail:</strong> ${orderData.email}</p>
      <p><strong>Endereço:</strong> ${orderData.enderecoEntrega}</p>
      <hr/>
      <h3>Itens do Pedido:</h3>
      <table border="1" cellpadding="5">
        <tr><th>Produto</th><th>Qtd</th><th>Preço Unit.</th><th>Subtotal</th></tr>
        ${orderData.items.map(i => `
          <tr>
            <td>${i.product.nome}</td>
            <td>${i.quantity}</td>
            <td>R$ ${i.product.preco.toFixed(2)}</td>
            <td>R$ ${(i.product.preco * i.quantity).toFixed(2)}</td>
          </tr>
        `).join('')}
      </table>
      <p><strong>Total:</strong> R$ ${orderData.valorTotal.toFixed(2)}</p>
      ${orderData.observacoes ? `<p><strong>Observações:</strong> ${orderData.observacoes}</p>` : ''}
    `,
  };

  await addDoc(collection(db, 'notificationLog'), {
    tipo: 'email',
    destino: emailPayload.to,
    payload: emailPayload,
    status: 'enviado',
    criadoEm: new Date(),
  });
}

// Simula envio de WhatsApp (em produção, seria Cloud Function)
async function sendOrderWhatsApp(orderData: OrderData, orderId: string): Promise<void> {
  const whatsappPayload = {
    to: '5500000000000',
    message: `🛒 *Novo Pedido #${orderId.slice(0, 8)}*\n\n` +
      `*Cliente:* ${orderData.nomeCliente}\n` +
      `*Telefone:* ${orderData.telefone}\n` +
      `*Endereço:* ${orderData.enderecoEntrega}\n\n` +
      `*Itens:*\n${orderData.items.map(i => `• ${i.quantity}x ${i.product.nome} - R$ ${(i.product.preco * i.quantity).toFixed(2)}`).join('\n')}\n\n` +
      `*Total:* R$ ${orderData.valorTotal.toFixed(2)}\n` +
      (orderData.observacoes ? `*Obs:* ${orderData.observacoes}\n` : ''),
  };

  await addDoc(collection(db, 'notificationLog'), {
    tipo: 'whatsapp',
    destino: whatsappPayload.to,
    payload: whatsappPayload,
    status: 'enviado',
    criadoEm: new Date(),
  });
}

export async function createOrder(orderData: OrderData): Promise<OrderResult> {
  try {
    // 1. Criar pedido
    const orderRef = await addDoc(collection(db, 'orders'), {
      clienteId: orderData.clienteId,
      status: 'novo',
      valorTotal: orderData.valorTotal,
      enderecoEntrega: orderData.enderecoEntrega,
      formaPagamento: orderData.formaPagamento,
      observacoes: orderData.observacoes,
      nomeCliente: orderData.nomeCliente,
      telefone: orderData.telefone,
      email: orderData.email,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    });

    const orderId = orderRef.id;

    // 2. Criar orderItems e abater estoque
    for (const item of orderData.items) {
      await addDoc(collection(db, 'orderItems'), {
        orderId,
        productId: item.product.id,
        nomeProduto: item.product.nome,
        quantidade: item.quantity,
        precoUnitario: item.product.preco,
      });

      // Abater estoque
      try {
        await updateDoc(doc(db, 'products', item.product.id), {
          estoque: increment(-item.quantity),
          atualizadoEm: new Date(),
        });
      } catch (err) {
        console.warn('Falha ao atualizar estoque (produto pode não existir no Firestore):', err);
      }
    }

    // 3. Disparar notificações (simula Cloud Function)
    try {
      await sendOrderEmail(orderData, orderId);
      await sendOrderWhatsApp(orderData, orderId);
    } catch (err) {
      console.error('Falha ao enviar notificações:', err);
      // Registra falha
      await addDoc(collection(db, 'notificationLog'), {
        tipo: 'email',
        destino: 'papelaria@exemplo.com',
        payload: { error: String(err) },
        status: 'falhou',
        criadoEm: new Date(),
      });
    }

    // 4. Registrar atividade
    try {
      await addDoc(collection(db, 'activityLog'), {
        userId: orderData.clienteId,
        acao: 'criar_pedido',
        entidade: 'orders',
        detalhes: { orderId, valorTotal: orderData.valorTotal, itens: orderData.items.length },
        criadoEm: new Date(),
      });
    } catch (err) {
      console.warn('Falha ao registrar atividade:', err);
    }

    return { orderId, success: true };
  } catch (err: any) {
    console.error('Erro ao criar pedido:', err);
    return { orderId: '', success: false, error: err.message };
  }
}
