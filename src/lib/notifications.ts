// Notification utilities using Notification API + Web Audio API
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export type NotificationPermission = 'default' | 'granted' | 'denied';

export function getPermission(): NotificationPermission {
  if (!('Notification' in window)) return 'denied';
  return Notification.permission;
}

export async function requestPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) return 'denied';
  try {
    const result = await Notification.requestPermission();
    return result as NotificationPermission;
  } catch {
    return 'denied';
  }
}

export function showBrowserNotification(title: string, options?: NotificationOptions): void {
  if (getPermission() !== 'granted') return;
  try {
    new Notification(title, {
      icon: '/icons/icon.svg',
      badge: '/icons/icon.svg',
      ...options,
    });
  } catch (err) {
    console.warn('Falha ao exibir notificação:', err);
  }
}

// Web Audio API - beep for new orders
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AC();
  }
  return audioCtx;
}

export function playOrderBeep(times = 2): void {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    for (let i = 0; i < times; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.4 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.4);
      osc.stop(ctx.currentTime + i * 0.4 + 0.3);
    }
  } catch (err) {
    console.warn('Falha ao reproduzir beep:', err);
  }
}

// Log notification to Firestore
export async function logNotification(
  tipo: 'email' | 'whatsapp' | 'push',
  destino: string,
  payload: Record<string, unknown>,
  status: 'enviado' | 'falhou' | 'pendente'
): Promise<void> {
  try {
    await addDoc(collection(db, 'notificationLog'), {
      tipo,
      destino,
      payload,
      status,
      criadoEm: new Date(),
    });
  } catch (err) {
    console.error('Falha ao registrar notificação:', err);
  }
}
