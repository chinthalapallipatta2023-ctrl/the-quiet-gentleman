import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from './catalog';

export type BagItem = { product: Product; size: string; quantity: number };
export function addBagItem(items: BagItem[], product: Product, size: string): BagItem[] {
  const exists = items.some(item => item.product.slug === product.slug && item.size === size);
  return exists ? items.map(item => item.product.slug === product.slug && item.size === size ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { product, size, quantity: 1 }];
}
type BagContextValue = { items: BagItem[]; open: boolean; setOpen: (value: boolean) => void; add: (product: Product, size: string) => void; update: (slug: string, size: string, delta: number) => void; remove: (slug: string, size: string) => void };
const BagContext = createContext<BagContextValue | undefined>(undefined);
export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [open, setOpen] = useState(false);
  const add = (product: Product, size: string) => { setItems(old => addBagItem(old, product, size)); setOpen(true); };
  const update = (slug: string, size: string, delta: number) => setItems(old => old.map(item => item.product.slug === slug && item.size === size ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const remove = (slug: string, size: string) => setItems(old => old.filter(item => item.product.slug !== slug || item.size !== size));
  return <BagContext.Provider value={{ items, open, setOpen, add, update, remove }}>{children}</BagContext.Provider>;
}
export function useBag() { const value = useContext(BagContext); if (!value) throw new Error('Bag provider is required'); return value; }