import placeholder from '@/assets/placeholder-stone.jpg';
import imgExternalPaving from '@/assets/products/external-paving.jpg';
import imgFountains from '@/assets/products/fountains.jpg';
import imgColumns from '@/assets/products/columns.jpg';
import imgBalustrades from '@/assets/products/balustrades.jpg';
import imgFlowerBoxes from '@/assets/products/flower-boxes.jpg';
import imgBollards from '@/assets/products/bollards.jpg';
import imgSculptures from '@/assets/products/sculptures.jpg';
import imgExternalCladding from '@/assets/products/external-cladding.jpg';
import imgInteriorFlooring from '@/assets/products/interior-flooring.jpg';
import imgInteriorCladding from '@/assets/products/interior-cladding.jpg';
import imgKitchenCountertops from '@/assets/products/kitchen-countertops.jpg';
import imgSinks from '@/assets/products/sinks.jpg';
import imgBenches from '@/assets/products/benches.jpg';
import imgCurbs from '@/assets/products/curbs.jpg';
import imgBathtubs from '@/assets/products/bathtubs.jpg';
import imgOpenBookSlabs from '@/assets/products/open-book-slabs.jpg';
import imgBlockSlabs from '@/assets/products/block-slabs.jpg';

export type CategoryKey = 'exterior' | 'interior' | 'slabs';
export type MaterialKey = 'marble' | 'limestone' | 'granite' | 'porfido' | 'sandstone';

export interface Product {
  id: string;
  i18nKey: string; // products.items.<key>
  category: CategoryKey;
  materials: MaterialKey[];
  image: string;
}

export const MATERIALS: MaterialKey[] = ['marble', 'limestone', 'granite', 'porfido', 'sandstone'];

export const CATEGORIES: CategoryKey[] = ['exterior', 'interior', 'slabs'];

export const PRODUCTS: Product[] = [
  // Exterior
  { id: 'external-paving', i18nKey: 'externalPaving', category: 'exterior', materials: ['porfido', 'sandstone', 'granite'], image: imgExternalPaving },
  { id: 'fountains', i18nKey: 'fountains', category: 'exterior', materials: ['marble', 'limestone'], image: imgFountains },
  { id: 'columns', i18nKey: 'columns', category: 'exterior', materials: ['marble', 'limestone', 'granite'], image: imgColumns },
  { id: 'balustrades', i18nKey: 'balustrades', category: 'exterior', materials: ['marble', 'limestone'], image: imgBalustrades },
  { id: 'flower-boxes', i18nKey: 'flowerBoxes', category: 'exterior', materials: ['limestone', 'sandstone'], image: imgFlowerBoxes },
  { id: 'benches', i18nKey: 'benches', category: 'exterior', materials: ['granite', 'limestone'], image: placeholder },
  { id: 'bollards', i18nKey: 'bollards', category: 'exterior', materials: ['granite', 'porfido'], image: imgBollards },
  { id: 'curbs', i18nKey: 'curbs', category: 'exterior', materials: ['granite', 'porfido'], image: placeholder },
  { id: 'sculptures', i18nKey: 'sculptures', category: 'exterior', materials: ['marble', 'limestone'], image: imgSculptures },
  { id: 'external-cladding', i18nKey: 'externalCladding', category: 'exterior', materials: ['limestone', 'sandstone', 'porfido'], image: imgExternalCladding },

  // Interior
  { id: 'interior-flooring', i18nKey: 'interiorFlooring', category: 'interior', materials: ['marble', 'limestone', 'granite'], image: imgInteriorFlooring },
  { id: 'interior-cladding', i18nKey: 'interiorCladding', category: 'interior', materials: ['marble', 'limestone'], image: imgInteriorCladding },
  { id: 'kitchen-countertops', i18nKey: 'kitchenCountertops', category: 'interior', materials: ['marble', 'granite'], image: imgKitchenCountertops },
  { id: 'sinks', i18nKey: 'sinks', category: 'interior', materials: ['marble', 'granite'], image: imgSinks },
  { id: 'bathtubs', i18nKey: 'bathtubs', category: 'interior', materials: ['marble'], image: placeholder },

  // Slabs
  { id: 'open-book-slabs', i18nKey: 'openBookSlabs', category: 'slabs', materials: ['marble', 'granite'], image: placeholder },
  { id: 'block-slabs', i18nKey: 'blockSlabs', category: 'slabs', materials: ['marble', 'granite', 'limestone', 'sandstone'], image: placeholder },
];

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID';
