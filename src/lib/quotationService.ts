// Serviço de cotação B2B
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { CartItem } from '../contexts/CartContext';

export interface QuotationData {
  empresaId: string;
  nomeEmpresa: string;
  cnpj: string;
  nomeContato: string;
  email: string;
  telefone: string;
  titulo: string;
  observacoes: string;
  items: {
    productId: string;
    nomeProduto: string;
    quantidade: number;
    observacao: string;
  }[];
}

export interface QuotationResult {
  quotationId: string;
  success: boolean;
  error?: string;
}

// Simula envio de email (em produção, seria Cloud Function)
async function sendQuotationEmail(quotationData: QuotationData, quotationId: string): Promise<void> {
  const emailPayload = {
    to: 'papelaria@exemplo.com',
    subject: `Nova Cotação #${quotationId.slice(0, 8)} - ${quotationData.nomeEmpresa}`,
    html: `
      <h2>Nova Cotação Recebida</h2>
      <p><strong>Cotação:</strong> #${quotationId.slice(0, 8)}</p>
      <p><strong>Empresa:</strong> ${quotationData.nomeEmpresa}</p>
      <p><strong>CNPJ:</strong> ${quotationData.cnpj}</p>
      <p><strong>Contato:</strong> ${quotationData.nomeContato}</p>
      <p><strong>E-mail:</strong> ${quotationData.email}</p>
      <p><strong>Telefone:</strong> ${quotationData.telefone}</p>
      <p><strong>Título:</strong> ${quotationData.titulo}</p>
      <hr/>
      <h3>Itens Solicitados:</h3>
      <table border="1" cellpadding="5">
        <tr><th>Produto</th><th>Qtd</th><th>Observação</th></tr>
        ${quotationData.items.map(i => `
          <tr>
            <td>${i.nomeProduto}</td>
            <td>${i.quantidade}</td>
            <td>${i.observacao || '-'}</td>
          </tr>
        `).join('')}
      </table>
      ${quotationData.observacoes ? `<p><strong>Observações Gerais:</strong> ${quotationData.observacoes}</p>` : ''}
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
async function sendQuotationWhatsApp(quotationData: QuotationData, quotationId: string): Promise<void> {
  const whatsappPayload = {
    to: '5500000000000',
    message: `📋 *Nova Cotação #${quotationId.slice(0, 8)}*\n\n` +
      `*Empresa:* ${quotationData.nomeEmpresa}\n` +
      `*CNPJ:* ${quotationData.cnpj}\n` +
      `*Contato:* ${quotationData.nomeContato}\n` +
      `*Telefone:* ${quotationData.telefone}\n` +
      `*E-mail:* ${quotationData.email}\n\n` +
      `*Título:* ${quotationData.titulo}\n\n` +
      `*Itens Solicitados:*\n${quotationData.items.map(i => `• ${i.quantidade}x ${i.nomeProduto}${i.observacao ? ` (${i.observacao})` : ''}`).join('\n')}\n\n` +
      (quotationData.observacoes ? `*Obs:* ${quotationData.observacoes}\n` : ''),
  };

  await addDoc(collection(db, 'notificationLog'), {
    tipo: 'whatsapp',
    destino: whatsappPayload.to,
    payload: whatsappPayload,
    status: 'enviado',
    criadoEm: new Date(),
  });
}

export async function createQuotation(quotationData: QuotationData): Promise<QuotationResult> {
  try {
    // 1. Criar cotação
    const quotationRef = await addDoc(collection(db, 'quotations'), {
      empresaId: quotationData.empresaId,
      titulo: quotationData.titulo,
      observacoes: quotationData.observacoes,
      status: 'nova',
      resposta: '',
      nomeEmpresa: quotationData.nomeEmpresa,
      cnpj: quotationData.cnpj,
      nomeContato: quotationData.nomeContato,
      email: quotationData.email,
      telefone: quotationData.telefone,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    });

    const quotationId = quotationRef.id;

    // 2. Criar quotationItems
    for (const item of quotationData.items) {
      await addDoc(collection(db, 'quotationItems'), {
        quotationId,
        productId: item.productId,
        nomeProduto: item.nomeProduto,
        quantidade: item.quantidade,
        observacao: item.observacao,
      });
    }

    // 3. Disparar notificações (simula Cloud Function)
    try {
      await sendQuotationEmail(quotationData, quotationId);
      await sendQuotationWhatsApp(quotationData, quotationId);
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
        userId: quotationData.empresaId,
        acao: 'criar_cotacao',
        entidade: 'quotations',
        detalhes: { quotationId, empresa: quotationData.nomeEmpresa, itens: quotationData.items.length },
        criadoEm: new Date(),
      });
    } catch (err) {
      console.warn('Falha ao registrar atividade:', err);
    }

    return { quotationId, success: true };
  } catch (err: any) {
    console.error('Erro ao criar cotação:', err);
    return { quotationId: '', success: false, error: err.message };
  }
}
