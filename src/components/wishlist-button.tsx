import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/lib/wishlist';
import type { Product } from '@/lib/catalog';
export function WishlistButton({ product, labelled = false }: { product: Product; labelled?: boolean }) {
 const wishlist = useWishlist();
 const saved = wishlist.slugs.includes(product.slug);
 return <Button variant={labelled ? 'outline' : 'hero'} size={labelled ? 'default' : 'icon'} className={labelled ? 'wishlist-detail' : 'wishlist-heart'} aria-label={`${saved ? 'Remove' : 'Save'} ${product.name}${saved ? ' from' : ' to'} wishlist`} aria-pressed={saved} title={saved ? 'Remove from wishlist' : 'Save to wishlist'} disabled={!wishlist.ready || wishlist.busy !== null} onClick={() => void wishlist.toggle(product.slug)}><Heart className={saved ? 'heart-saved' : ''} />{labelled && (saved ? 'SAVED TO WISHLIST' : 'SAVE TO WISHLIST')}</Button>;
}