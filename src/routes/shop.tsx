import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { productsFor, collections, pageHead } from '@/lib/catalog';
import { useCollection } from '@/lib/collection';
import { useEffect } from 'react';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
export const Route = createFileRoute('/shop')({ head: () => pageHead('The Wardrobe', 'A considered selection of everyday menswear and womenswear. Explore demonstration shirts, blouses, trousers, dresses and knitwear.'), component: Shop });
function Shop() {
 const [category,setCategory] = useState('All pieces');
 const { collection } = useCollection(); const current = collections[collection];
 useEffect(() => setCategory('All pieces'), [collection]);
 const visible = productsFor(collection).filter(product => category === 'All pieces' || product.category === category);
 return <div className="container-editorial"><div className="page-intro"><p className="eyebrow text-muted-foreground">A CONSIDERED SELECTION / {current.descriptor}</p><h1>The Wardrobe</h1><p className="body-copy">Familiar forms, contemporary proportions. Pieces to return to, day after day.</p></div><div className="filter-row" aria-label="Product categories">{['All pieces', ...current.categories].map(item => <Button key={item} variant="navigation" aria-pressed={category === item} onClick={() => setCategory(item)} className={`text-xs ${category === item ? 'filter-active' : ''}`}>{item}</Button>)}<span className="filter-count">{visible.length} {visible.length === 1 ? 'piece' : 'pieces'}</span></div><div className="product-grid">{visible.map(product => <ProductCard key={product.slug} product={product} />)}</div><p className="demo-note py-8">An illustrative wardrobe. All products, imagery and prices are for demonstration only.</p></div>;
}
