import { createFileRoute, Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { products, pageHead } from '@/lib/catalog';
import { useWishlist } from '@/lib/wishlist';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
export const Route = createFileRoute('/wishlist')({ head: () => pageHead('Your Wishlist', 'A personal edit of favourite menswear pieces, saved for another day.'), component: Wishlist });
function Wishlist() {
 const wishlist = useWishlist();
 const saved = wishlist.slugs.flatMap(slug => products.filter(product => product.slug === slug));
 return <div className="container-editorial"><div className="page-intro"><p className="eyebrow text-muted-foreground">YOUR PERSONAL EDIT</p><h1>The Wishlist</h1><p className="body-copy">Pieces worth coming back to.</p></div>{wishlist.error && <p role="alert" className="text-destructive mb-6">{wishlist.error}</p>}{!wishlist.ready ? <p className="wishlist-empty" role="status">Opening your wishlist…</p> : !wishlist.user ? <div className="wishlist-empty"><Heart /><h2>Keep the pieces you love.</h2><Button variant="editorial" onClick={() => wishlist.setAuthOpen(true)}>SIGN IN TO SAVE PIECES</Button></div> : <><div className="wishlist-heading"><span>{saved.length} {saved.length === 1 ? 'saved piece' : 'saved pieces'}</span><Button variant="navigation" onClick={() => void supabase.auth.signOut()}>Sign out</Button></div>{saved.length ? <div className="product-grid">{saved.map(product => <ProductCard key={product.slug} product={product} />)}</div> : <div className="wishlist-empty"><Heart /><h2>Your edit starts here.</h2><Button asChild variant="editorial"><Link to="/shop">EXPLORE THE WARDROBE</Link></Button></div>}</>}<div className="wishlist-bottom"><Button asChild variant="editorialLink"><Link to="/stylist">Find your next pieces with the stylist</Link></Button></div></div>;
}