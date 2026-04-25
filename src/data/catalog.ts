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

export const FINISHES = ['polished', 'honed', 'flamed', 'brushed', 'aged'] as const;
export type Finish = typeof FINISHES[number];

export interface Product {
  id: string; // also used as URL slug
  i18nKey: string; // products.items.<key>
  category: CategoryKey;
  materials: MaterialKey[];
  image: string;
  /** Recommended finishes for this product (subset of FINISHES). */
  recommendedFinishes: Finish[];
  /** Typical formats / dimensions offered (free text, i18n-agnostic). */
  formats: string[];
}

export const getProductBySlug = (slug?: string): Product | undefined =>
  slug ? PRODUCTS.find((p) => p.id === slug) : undefined;

export const getRelatedProducts = (product: Product, limit = 3): Product[] =>
  PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, limit);

export const MATERIALS: MaterialKey[] = ['marble', 'limestone', 'granite', 'porfido', 'sandstone'];

export const CATEGORIES: CategoryKey[] = ['exterior', 'interior', 'slabs'];

// CONTENT: formats are credible defaults — review and refine with real data.
export const PRODUCTS: Product[] = [
  // Exterior
  { id: 'external-paving', i18nKey: 'externalPaving', category: 'exterior', materials: ['porfido', 'sandstone', 'granite'], image: imgExternalPaving, recommendedFinishes: ['flamed', 'brushed', 'aged'], formats: ['10×10 cm', '20×20 cm', '30×60 cm', 'Opus incertum', 'Sur mesure'] },
  { id: 'fountains', i18nKey: 'fountains', category: 'exterior', materials: ['marble', 'limestone'], image: imgFountains, recommendedFinishes: ['honed', 'aged', 'brushed'], formats: ['Modèles catalogue', 'Sur mesure', 'Sculpté à la main'] },
  { id: 'columns', i18nKey: 'columns', category: 'exterior', materials: ['marble', 'limestone', 'granite'], image: imgColumns, recommendedFinishes: ['polished', 'honed', 'aged'], formats: ['Ø 20–60 cm', 'Hauteur 1–4 m', 'Sur mesure'] },
  { id: 'balustrades', i18nKey: 'balustrades', category: 'exterior', materials: ['marble', 'limestone'], image: imgBalustrades, recommendedFinishes: ['honed', 'polished', 'aged'], formats: ['Balustres tournés', 'Mains courantes', 'Pilastres'] },
  { id: 'flower-boxes', i18nKey: 'flowerBoxes', category: 'exterior', materials: ['limestone', 'sandstone'], image: imgFlowerBoxes, recommendedFinishes: ['honed', 'aged', 'brushed'], formats: ['60×60 cm', '100×40 cm', 'Sur mesure'] },
  { id: 'benches', i18nKey: 'benches', category: 'exterior', materials: ['granite', 'limestone'], image: imgBenches, recommendedFinishes: ['flamed', 'honed', 'brushed'], formats: ['L 150–300 cm', 'Monolithe', 'Sur mesure'] },
  { id: 'bollards', i18nKey: 'bollards', category: 'exterior', materials: ['granite', 'porfido'], image: imgBollards, recommendedFinishes: ['flamed', 'brushed'], formats: ['Ø 20–35 cm', 'H 60–120 cm'] },
  { id: 'curbs', i18nKey: 'curbs', category: 'exterior', materials: ['granite', 'porfido'], image: imgCurbs, recommendedFinishes: ['flamed', 'brushed'], formats: ['10×25 cm', '15×30 cm', 'Longueurs 50–200 cm'] },
  { id: 'sculptures', i18nKey: 'sculptures', category: 'exterior', materials: ['marble', 'limestone'], image: imgSculptures, recommendedFinishes: ['polished', 'honed', 'aged'], formats: ['Sur mesure', 'Sculpté à la main', 'D\u2019après dessin'] },
  { id: 'external-cladding', i18nKey: 'externalCladding', category: 'exterior', materials: ['limestone', 'sandstone', 'porfido'], image: imgExternalCladding, recommendedFinishes: ['honed', 'flamed', 'brushed', 'aged'], formats: ['30×60 cm', '40×80 cm', 'Bandes', 'Opus'] },

  // Interior
  { id: 'interior-flooring', i18nKey: 'interiorFlooring', category: 'interior', materials: ['marble', 'limestone', 'granite'], image: imgInteriorFlooring, recommendedFinishes: ['polished', 'honed', 'brushed'], formats: ['30×60 cm', '60×60 cm', '60×120 cm', 'Sur mesure'] },
  { id: 'interior-cladding', i18nKey: 'interiorCladding', category: 'interior', materials: ['marble', 'limestone'], image: imgInteriorCladding, recommendedFinishes: ['polished', 'honed', 'brushed'], formats: ['30×60 cm', '40×80 cm', 'Grandes dalles', 'Sur mesure'] },
  { id: 'kitchen-countertops', i18nKey: 'kitchenCountertops', category: 'interior', materials: ['marble', 'granite'], image: imgKitchenCountertops, recommendedFinishes: ['polished', 'honed'], formats: ['Sur mesure', 'Bookmatch', 'Mitered edge'] },
  { id: 'sinks', i18nKey: 'sinks', category: 'interior', materials: ['marble', 'granite'], image: imgSinks, recommendedFinishes: ['polished', 'honed'], formats: ['Vasque pleine masse', 'À poser', 'Sur mesure'] },
  { id: 'bathtubs', i18nKey: 'bathtubs', category: 'interior', materials: ['marble'], image: imgBathtubs, recommendedFinishes: ['polished', 'honed'], formats: ['Monolithe', 'Sculpté à la main', 'Sur mesure'] },

  // Slabs
  { id: 'open-book-slabs', i18nKey: 'openBookSlabs', category: 'slabs', materials: ['marble', 'granite'], image: imgOpenBookSlabs, recommendedFinishes: ['polished', 'honed'], formats: ['Paires bookmatch', '180×280 cm typ.', 'Épaisseur 2–3 cm'] },
  { id: 'block-slabs', i18nKey: 'blockSlabs', category: 'slabs', materials: ['marble', 'granite', 'limestone', 'sandstone'], image: imgBlockSlabs, recommendedFinishes: ['polished', 'honed', 'brushed', 'flamed'], formats: ['Blocs bruts', 'Dalles 180×280 cm', 'Épaisseur 2–8 cm'] },
];

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID';
