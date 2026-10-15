import { describe, expect, it } from 'vitest';
import { catalogueMatches, stylistInput } from './stylist-schema';
describe('Personal stylist catalogue boundaries', () => {
 it('only recommends pieces from the product catalogue', () => {
  const result = catalogueMatches({ introduction: 'Dinner edit', recommendations: [{ slug: 'everyday-shirt', reason: 'Relaxed collar' }, { slug: 'imaginary-jacket', reason: 'Not in stock' }] });
  expect(result.recommendations.map(item => item.slug)).toEqual(['everyday-shirt']);
 });
 it('requires occasion, preferred fit and style', () => {
  expect(stylistInput.safeParse({ occasion: 'Dinner outdoors', fit: 'Relaxed', style: 'Understated neutrals' }).success).toBe(true);
  for (const key of ['occasion', 'fit', 'style']) {
   expect(stylistInput.safeParse({ occasion: 'Dinner outdoors', fit: 'Relaxed', style: 'Understated neutrals', [key]: '' }).success).toBe(false);
  }
 });
});