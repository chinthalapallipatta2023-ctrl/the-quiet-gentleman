import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowRight, Sparkles, LoaderCircle } from 'lucide-react';
import { products, pageHead } from '@/lib/catalog';
import { stylistInput, type StylistResult } from '@/lib/stylist-schema';
import { recommendPieces } from '@/lib/stylist.functions';
import { useWishlist } from '@/lib/wishlist';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
export const Route = createFileRoute('/stylist')({ head: () => pageHead('The Personal Stylist', 'An AI-powered menswear edit for your occasion, preferred fit and personal style.'), component: Stylist });
function Stylist() {
 const wishlist = useWishlist(); const recommend = useServerFn(recommendPieces);
 const [occasion, setOccasion] = useState(''); const [fit, setFit] = useState('Relaxed'); const [style, setStyle] = useState('');
 const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [result, setResult] = useState<StylistResult | null>(null);
 const submit = async (event: React.FormEvent) => {
  event.preventDefault();
  if (!wishlist.user) { wishlist.setAuthOpen(true); return; }
  const parsed = stylistInput.safeParse({ occasion, fit, style });
  if (!parsed.success) { setError('Tell us a little more about your occasion, fit and style.'); return; }
  setBusy(true); setError(''); setResult(null);
  try { const response = await recommend({ data: parsed.data }); if (response.error) setError(response.error); else setResult(response.result); }
  catch { setError('Your selection could not be completed. Please try again later.'); }
  finally { setBusy(false); }
 };
 return <div className="container-editorial stylist-page"><div className="page-intro"><p className="eyebrow text-muted-foreground">A PERSONAL PERSPECTIVE / AI STYLIST</p><h1>An edit for you.</h1><p className="body-copy">The occasion. The proportion. The way you like to dress.</p></div><form className="stylist-form" onSubmit={submit}><div><label htmlFor="occasion">What’s the occasion?</label><textarea id="occasion" placeholder="A relaxed dinner outdoors, a weekend away…" required minLength={3} maxLength={300} value={occasion} onChange={event => setOccasion(event.target.value)} disabled={busy} /></div><fieldset><legend>Preferred fit</legend><div className="fit-options">{['Relaxed','Straight','Closer fit'].map(option => <Button key={option} variant="outline" type="button" aria-pressed={fit === option} onClick={() => setFit(option)} disabled={busy}>{option}</Button>)}</div></fieldset><div><label htmlFor="personal-style">Your style</label><textarea id="personal-style" placeholder="Understated, light neutrals, a little structure…" required minLength={3} maxLength={300} value={style} onChange={event => setStyle(event.target.value)} disabled={busy} /></div><Button variant="editorial" type="submit" disabled={busy || !wishlist.ready}>{busy ? <><LoaderCircle className="stylist-spinner" /> CONSIDERING YOUR EDIT…</> : <><Sparkles /> {wishlist.user ? 'FIND MY PIECES' : 'SIGN IN FOR MY EDIT'} <ArrowRight /></>}</Button></form>{error && <p role="alert" className="text-destructive mt-6">{error}</p>}{busy && <p role="status" className="body-copy mt-6">Considering the wardrobe for your occasion…</p>}{result && <section className="stylist-results" aria-live="polite"><div className="section-heading"><div><p className="eyebrow text-muted-foreground">SELECTED FOR YOU</p><h2>Your considered edit</h2><p className="body-copy">{result.introduction}</p></div></div><div className="product-grid">{result.recommendations.map(item => { const product = products.find(piece => piece.slug === item.slug); return product ? <div key={item.slug}><ProductCard product={product} /><p className="stylist-reason">{item.reason}</p></div> : null; })}</div>{result.recommendations.length === 0 && <p className="body-copy">No matching pieces in the current wardrobe.</p>}</section>}<p className="demo-note">AI suggestions are based on the demonstration collection, not verified garment measurements or live inventory.</p></div>;
}