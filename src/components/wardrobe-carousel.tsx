import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/catalog';

export function WardrobeCarousel() {
  const [viewport, api] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', slidesToScroll: 1 });
  const [previous, setPrevious] = useState(false);
  const [next, setNext] = useState(true);
  const sync = useCallback(() => { if (api) { setPrevious(api.canScrollPrev()); setNext(api.canScrollNext()); } }, [api]);
  useEffect(() => {
    if (!api) return;
    sync(); api.on('select', sync); api.on('reInit', sync);
    return () => { api.off('select', sync); api.off('reInit', sync); };
  }, [api, sync]);
  return <div className="wardrobe-carousel" role="region" aria-roledescription="carousel" aria-label="The wardrobe"><div className="wardrobe-viewport" ref={viewport}><div className="wardrobe-track">{products.map(product => <div key={product.slug} className="wardrobe-slide"><ProductCard product={product} /></div>)}</div></div><div className="wardrobe-controls"><span className="eyebrow text-muted-foreground">{products.length} considered pieces</span><div className="flex gap-3"><Button variant="outline" size="icon" className="wardrobe-arrow" disabled={!previous} aria-label="Previous wardrobe pieces" title="Previous pieces" onClick={() => api?.scrollPrev()}><ArrowLeft /></Button><Button variant="outline" size="icon" className="wardrobe-arrow" disabled={!next} aria-label="Next wardrobe pieces" title="Next pieces" onClick={() => api?.scrollNext()}><ArrowRight /></Button></div></div></div>;
}