import { describe, it, expect } from 'vitest';
import { addBagItem } from './bag';
import type { Product } from './catalog';
const product: Product = {slug:'example',name:'Example',category:'Shirts',price:95,color:'Ivory',colorToken:'ivory',image:'',alt:'',description:'',details:[],gallery:[]};
describe('Demonstration bag', () => {
 it('keeps the selected size when adding a piece', () => {expect(addBagItem([],product,'M')).toEqual([{product,size:'M',quantity:1}]);});
 it('combines the same piece and size into one bag line', () => {expect(addBagItem([{product,size:'M',quantity:1}],product,'M')[0]?.quantity).toBe(2);});
 it('keeps different sizes separate', () => {const items = addBagItem([{product,size:'M',quantity:1}],product,'L');expect(items).toHaveLength(2);expect(items[1]?.size).toBe('L');});
});
