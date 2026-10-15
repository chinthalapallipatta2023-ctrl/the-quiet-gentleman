import campaign from '@/assets/courtyard-campaign.jpg';
import shirt from '@/assets/everyday-shirt.jpg';
import trousers from '@/assets/pleated-trouser.jpg';
import overshirt from '@/assets/olive-overshirt.jpg';

export const brand = { name: 'MAISON', descriptor: 'MENSWEAR', full: 'MAISON / MENSWEAR' };
export const imagery = { campaign, shirt, trousers, overshirt };
export const sizes = ['S', 'M', 'L', 'XL'] as const;
export type Product = { slug: string; name: string; category: string; price: number; color: string; colorToken: string; image: string; alt: string; description: string; details: string[]; gallery: { src: string; alt: string }[] };
export const products: Product[] = [
  { slug: 'everyday-shirt', name: 'The Everyday Shirt', category: 'Shirts', price: 95, color: 'Ivory', colorToken: 'ivory', image: shirt, alt: 'Model wearing a relaxed ivory shirt beside a sunlit stone wall', description: 'A familiar form, reconsidered through a relaxed silhouette and considered details. A piece that finds its place in the everyday wardrobe.', details: ['Relaxed silhouette', 'Open collar', 'Button front', 'Demonstration design; final materials and measurements to be confirmed.'], gallery: [{ src: shirt, alt: 'Front view of the ivory Everyday Shirt' }, { src: campaign, alt: 'The ivory shirt styled with charcoal trousers in a courtyard' }] },
  { slug: 'pleated-trouser', name: 'The Pleated Trouser', category: 'Trousers', price: 125, color: 'Charcoal', colorToken: 'charcoal', image: trousers, alt: 'Charcoal pleated trousers styled with an ivory shirt and leather shoes', description: 'A little more room, a considered line. A relaxed trouser that brings quiet structure to everyday dressing.', details: ['Relaxed straight leg', 'Pleated front', 'Demonstration design; final materials and measurements to be confirmed.'], gallery: [{ src: trousers, alt: 'Close view of the charcoal pleated trousers' }, { src: campaign, alt: 'Full-length courtyard styling of charcoal trousers' }] },
  { slug: 'relaxed-overshirt', name: 'The Relaxed Overshirt', category: 'Essentials', price: 115, color: 'Olive', colorToken: 'olive', image: overshirt, alt: 'Model wearing an olive overshirt over an ivory tee', description: 'An easy layer for the space between seasons. Simple lines, a generous shape, and room to make it your own.', details: ['Relaxed silhouette', 'Chest pocket', 'Button front', 'Demonstration design; final materials and measurements to be confirmed.'], gallery: [{ src: overshirt, alt: 'Front view of the olive Relaxed Overshirt' }] },
];
export const formatPrice = (amount: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} — ${brand.full}` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} — ${brand.full}` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}