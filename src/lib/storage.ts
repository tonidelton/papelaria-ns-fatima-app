import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export async function uploadImage(
  file: File,
  folder: string,
  onProgress?: (pct: number) => void
): Promise<string> {
  const safeName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
  const path = `${folder}/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, path);
  onProgress?.(10);
  const snap = await uploadBytes(storageRef, file);
  onProgress?.(80);
  const url = await getDownloadURL(snap.ref);
  onProgress?.(100);
  return url;
}

export function validateImageFile(file: File): string | null {
  if (!file.type.startsWith('image/')) return 'Arquivo deve ser uma imagem';
  if (file.size > 5 * 1024 * 1024) return 'Imagem deve ter no máximo 5MB';
  return null;
}
