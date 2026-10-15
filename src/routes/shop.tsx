import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { products, pageHead } from '@/lib/catalog';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
export const Route = createFileRoute('/shop')({ head: () => pageHead('The Wardrobe', 'A considered selection of everyday menswear. Explore demonstration shirts, trousers and essentials.'), component: Shop });
function Shop() {
 const [category,setCategory] = useState('All pieces');
 const visible = products.filter(product => category === 'All pieces' || product.category === category);
 return <div className="container-editorial"><div className="page-intro"><p className="eyebrow text-muted-foreground">A CONSIDERED SELECTION</p><h1>The Wardrobe</h1><p className="body-copy">Familiar forms, contemporary proportions. Pieces to return to, day after day.</p></div><div className="filter-row" aria-label="Product categories">{['All pieces','Shirts','Trousers','Essentials'].map(item => <Button key={item} variant="navigation" aria-pressed={category === item} onClick={() => setCategory(item)} className={`text-xs ${category === item ? 'filter-active' : ''}`}>{item}</Button>)}<span className="filter-count">{visible.length} {visible.length === 1 ? 'piece' : 'pieces'}</span></div><div className="product-grid">{visible.map(product => <ProductCard key={product.slug} product={product} />)}</div><p className="demo-note py-8">An illustrative wardrobe. All products, imagery and prices are for demonstration only.</p></div>;
}
