export type CategoryKey = 'exterior' | 'interior' | 'slabs';
export type MaterialKey = 'marble' | 'limestone' | 'granite' | 'porfido' | 'sandstone';

export interface Product {
  id: string;
  i18nKey: string; // products.items.<key>
  category: CategoryKey;
  materials: MaterialKey[];
}

export const MATERIALS: MaterialKey[] = ['marble', 'limestone', 'granite', 'porfido', 'sandstone'];

export const CATEGORIES: CategoryKey[] = ['exterior', 'interior', 'slabs'];

export const PRODUCTS: Product[] = [
  // Exterior
  { id: 'external-paving', i18nKey: 'externalPaving', category: 'exterior', materials: ['porfido', 'sandstone', 'granite'] },
  { id: 'fountains', i18nKey: 'fountains', category: 'exterior', materials: ['marble', 'limestone'] },
  { id: 'columns', i18nKey: 'columns', category: 'exterior', materials: ['marble', 'limestone', 'granite'] },
  { id: 'balustrades', i18nKey: 'balustrades', category: 'exterior', materials: ['marble', 'limestone'] },
  { id: 'flower-boxes', i18nKey: 'flowerBoxes', category: 'exterior', materials: ['limestone', 'sandstone'] },
  { id: 'benches', i18nKey: 'benches', category: 'exterior', materials: ['granite', 'limestone'] },
  { id: 'bollards', i18nKey: 'bollards', category: 'exterior', materials: ['granite', 'porfido'] },
  { id: 'curbs', i18nKey: 'curbs', category: 'exterior', materials: ['granite', 'porfido'] },
  { id: 'sculptures', i18nKey: 'sculptures', category: 'exterior', materials: ['marble', 'limestone'] },
  { id: 'external-cladding', i18nKey: 'externalCladding', category: 'exterior', materials: ['limestone', 'sandstone', 'porfido'] },

  // Interior
  { id: 'interior-flooring', i18nKey: 'interiorFlooring', category: 'interior', materials: ['marble', 'limestone', 'granite'] },
  { id: 'interior-cladding', i18nKey: 'interiorCladding', category: 'interior', materials: ['marble', 'limestone'] },
  { id: 'kitchen-countertops', i18nKey: 'kitchenCountertops', category: 'interior', materials: ['marble', 'granite'] },
  { id: 'sinks', i18nKey: 'sinks', category: 'interior', materials: ['marble', 'granite'] },
  { id: 'bathtubs', i18nKey: 'bathtubs', category: 'interior', materials: ['marble'] },

  // Slabs
  { id: 'open-book-slabs', i18nKey: 'openBookSlabs', category: 'slabs', materials: ['marble', 'granite'] },
  { id: 'block-slabs', i18nKey: 'blockSlabs', category: 'slabs', materials: ['marble', 'granite', 'limestone', 'sandstone'] },
];

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID';
