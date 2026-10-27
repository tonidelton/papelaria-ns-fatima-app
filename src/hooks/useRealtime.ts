import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, QueryConstraint, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

export function useRealtimeCollection<T = DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
  deps: any[] = []
): { data: T[]; loading: boolean; error: string | null } {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      const q = constraints.length > 0
        ? query(collection(db, collectionName), ...constraints)
        : collection(db, collectionName);
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as T),
          }));
          setData(items);
          setLoading(false);
        },
        (err) => {
          console.error('Erro no onSnapshot:', err);
          setError(err.message);
          setLoading(false);
        }
      );
      return () => unsub();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, deps);

  return { data, loading, error };
}
