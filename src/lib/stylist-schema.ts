import { z } from 'zod';
import { products } from './catalog';

export const stylistInput = z.object({ occasion: z.string().trim().min(3).max(300), fit: z.string().trim().min(2).max(120), style: z.string().trim().min(3).max(300) });
export const stylistOutput = z.object({ introduction: z.string(), recommendations: z.array(z.object({ slug: z.string(), reason: z.string() })) });
export type StylistResult = z.infer<typeof stylistOutput>;
export function catalogueMatches(result: StylistResult): StylistResult {
 const seen = new Set<string>();
 return { introduction: result.introduction.slice(0, 800), recommendations: result.recommendations.filter(item => {
  if (seen.has(item.slug) || !products.some(product => product.slug === item.slug)) return false;
  seen.add(item.slug); return true;
 }).slice(0, 4).map(item => ({ ...item, reason: item.reason.slice(0, 600) })) };
}