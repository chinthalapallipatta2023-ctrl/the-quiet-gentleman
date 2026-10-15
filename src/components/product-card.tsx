import { WishlistButton } from '@/components/wishlist-button';
import { useWishlist } from '@/lib/wishlist';
import { Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { formatPrice, type Product } from '@/lib/catalog';
export function ProductCard({ product }: { product: Product }) {
 const wishlist = useWishlist();
 const card = useRef<HTMLElement>(null);
 const [reveal, setReveal] = useState<'pending' | 'visible' | null>(null);
 useEffect(() => {
  const element = card.current;
  if (!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  setReveal('pending');
  const observer = new IntersectionObserver(entries => {
   if (entries.some(entry => entry.isIntersecting)) {
    setReveal('visible');
    observer.disconnect();
   }
  }, { threshold: 0.08 });
  observer.observe(element);
  return () => observer.disconnect();
 }, []);
 return <article ref={card} className="product-card" data-reveal={reveal}><Link viewTransition to="/product/$slug" params={{ slug: product.slug }} className="block product-image-wrap"><img className="product-image" src={product.image} alt={product.alt} width={1024} height={1536} loading="lazy" /></Link><WishlistButton product={product} />{wishlist.error && wishlist.busy === null && <p role="alert" className="product-save-error">{wishlist.error}</p>}<div className="product-info"><div><Link viewTransition to="/product/$slug" params={{ slug: product.slug }} className="product-name">{product.name}</Link><p className="product-color">{product.color}</p></div><span className="product-price">{formatPrice(product.price)}</span></div></article>;
}
