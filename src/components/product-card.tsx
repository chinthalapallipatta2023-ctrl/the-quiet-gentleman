import { Link } from '@tanstack/react-router';
import { formatPrice, type Product } from '@/lib/catalog';
export function ProductCard({ product }: { product: Product }) {
 return <article className="product-card"><Link viewTransition to="/product/$slug" params={{ slug: product.slug }} className="block product-image-wrap"><img className="product-image" src={product.image} alt={product.alt} width={1024} height={1536} loading="lazy" /></Link><div className="product-info"><div><Link viewTransition to="/product/$slug" params={{ slug: product.slug }} className="product-name">{product.name}</Link><p className="product-color">{product.color}</p></div><span className="product-price">{formatPrice(product.price)}</span></div></article>;
}
