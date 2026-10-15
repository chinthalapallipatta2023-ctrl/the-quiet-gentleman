import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { products } from './catalog';

type WishlistValue = { user: User | null; ready: boolean; slugs: string[]; busy: string | null; error: string; authOpen: boolean; setAuthOpen: (open: boolean) => void; toggle: (slug: string) => Promise<void> };
const WishlistContext = createContext<WishlistValue | undefined>(undefined);
export function WishlistProvider({ children }: { children: ReactNode }) {
 const [user, setUser] = useState<User | null>(null);
 const [ready, setReady] = useState(false);
 const [slugs, setSlugs] = useState<string[]>([]);
 const [busy, setBusy] = useState<string | null>(null);
 const [error, setError] = useState('');
 const [authOpen, setAuthOpen] = useState(false);
 useEffect(() => {
  let active = true;
  let version = 0;
  const refresh = async (next: User | null) => {
   const current = ++version;
   setUser(next); setSlugs([]); setError(''); setReady(false);
   if (next) {
    const { data, error: failure } = await supabase.from('wishlist_items').select('product_slug').eq('user_id', next.id).order('created_at', { ascending: false });
    if (!active || version !== current) return;
    if (failure) setError('Your wishlist could not be loaded. Please refresh to try again.');
    else setSlugs((data ?? []).map(item => item.product_slug));
   }
   if (active && version === current) setReady(true);
  };
  const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
   if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
    // Run database reads outside the auth callback's session lock.
    setTimeout(() => { if (active) void refresh(session?.user ?? null); }, 0);
   }
  });
  return () => { active = false; subscription.subscription.unsubscribe(); };
 }, []);
 const toggle = async (slug: string) => {
  if (!user) { setAuthOpen(true); return; }
  if (busy || !products.some(product => product.slug === slug)) return;
  setBusy(slug); setError('');
  const saved = slugs.includes(slug);
  const { error: failure } = saved
   ? await supabase.from('wishlist_items').delete().eq('user_id', user.id).eq('product_slug', slug)
   : await supabase.from('wishlist_items').insert({ user_id: user.id, product_slug: slug });
  if (failure) setError('This piece could not be saved. Please try again.');
  else setSlugs(old => saved ? old.filter(item => item !== slug) : [slug, ...old]);
  setBusy(null);
 };
 return <WishlistContext.Provider value={{ user, ready, slugs, busy, error, authOpen, setAuthOpen, toggle }}>{children}</WishlistContext.Provider>;
}
export function useWishlist() {
 const value = useContext(WishlistContext);
 if (!value) throw new Error('Wishlist provider is required');
 return value;
}