import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export async function logActivity(
  userId: string,
  acao: string,
  entidade: string,
  detalhes: Record<string, unknown> = {}
): Promise<void> {
  try {
    await addDoc(collection(db, 'activityLog'), {
      userId,
      acao,
      entidade,
      detalhes,
      criadoEm: new Date(),
    });
  } catch (err) {
    console.error('Falha ao registrar atividade:', err);
  }
}
