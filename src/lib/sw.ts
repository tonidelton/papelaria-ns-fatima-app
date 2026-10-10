// Service Worker registration for PWA + FCM
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker não suportado');
    return null;
  }
  try {
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    console.log('SW registrado:', reg.scope);
    return reg;
  } catch (err) {
    console.error('Falha ao registrar SW:', err);
    return null;
  }
}

export async function getSWRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) return null;
  const regs = await navigator.serviceWorker.getRegistrations();
  return regs[0] || null;
}
