import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Collection } from './catalog';
import { withViewTransition } from './view-transition';

const KEY = 'thread-house-collection';
type Value = { collection: Collection; setCollection: (next: Collection) => void };
const CollectionContext = createContext<Value | null>(null);

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [collection, setState] = useState<Collection>('men');
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch { /* Storage may be unavailable. */ }
    if (saved === 'women') setState('women');
  }, []);
  useEffect(() => { document.documentElement.dataset['collection'] = collection; }, [collection]);
  const setCollection = useCallback((next: Collection) => {
    if (next === collection) return;
    withViewTransition(next === 'women' ? 'collection-to-women' : 'collection-to-men', () => {
      setState(next);
      document.documentElement.dataset['collection'] = next;
    });
    try { localStorage.setItem(KEY, next); } catch { /* Keep switching usable without storage. */ }
  }, [collection]);
  return <CollectionContext.Provider value={{ collection, setCollection }}>{children}</CollectionContext.Provider>;
}

export function useCollection() {
  const value = useContext(CollectionContext);
  if (!value) throw new Error('useCollection must be used inside CollectionProvider');
  return value;
}
