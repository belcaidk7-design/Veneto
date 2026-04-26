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

/** Technical specs are i18n-agnostic facts. Each product carries its own. */
export interface ProductTechnical {
  /** Density range, e.g. '2,650–2,750 kg/m³'. */
  density?: string;
  /** Flexural strength, e.g. '15–22 MPa'. */
  flexural?: string;
  /** Water absorption, e.g. '< 0,4 %'. */
  absorption?: string;
  /** Slip resistance class, e.g. 'R11–R13 (DIN 51130)'. */
  slip?: string;
  /** Frost resistance, e.g. 'Résistant au gel (EN 12371)'. */
  frost?: string;
  /** Typical thickness range. */
  thickness?: string;
}

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
  /** Quarry / region of origin (i18n-agnostic, proper nouns). */
  origin: string;
  /** Technical facts (i18n-agnostic). */
  technical: ProductTechnical;
  /** Year HQ Stones started supplying this product family — adds expertise signal. */
  since?: number;
}

export const getProductBySlug = (slug?: string): Product | undefined =>
  slug ? PRODUCTS.find((p) => p.id === slug) : undefined;

export const getRelatedProducts = (product: Product, limit = 3): Product[] =>
  PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, limit);

export const MATERIALS: MaterialKey[] = ['marble', 'limestone', 'granite', 'porfido', 'sandstone'];

export const CATEGORIES: CategoryKey[] = ['exterior', 'interior', 'slabs'];

// CONTENT: technical specs are credible defaults from EN/UNI norms — refine with real lab data per quarry.
export const PRODUCTS: Product[] = [
  // Exterior
  { id: 'external-paving', i18nKey: 'externalPaving', category: 'exterior', materials: ['porfido', 'sandstone', 'granite'], image: imgExternalPaving, recommendedFinishes: ['flamed', 'brushed', 'aged'], formats: ['10×10 cm', '20×20 cm', '30×60 cm', 'Opus incertum', 'Sur mesure'], origin: 'Trentin (porphyre), Sardaigne (granit), Vérone (grès)', technical: { density: '2 600–2 750 kg/m³', flexural: '20–30 MPa', absorption: '< 0,4 %', slip: 'R11–R13 (DIN 51130)', frost: 'Résistant au gel (EN 12371)', thickness: '2–8 cm' }, since: 1998 },
  { id: 'fountains', i18nKey: 'fountains', category: 'exterior', materials: ['marble', 'limestone'], image: imgFountains, recommendedFinishes: ['honed', 'aged', 'brushed'], formats: ['Modèles catalogue', 'Sur mesure', 'Sculpté à la main'], origin: 'Carrare, Trani, Vicenza', technical: { density: '2 700 kg/m³', absorption: '0,2–0,8 %', frost: 'Résistant au gel (avec drainage)', thickness: 'Monolithe ou éléments assemblés' }, since: 2002 },
  { id: 'columns', i18nKey: 'columns', category: 'exterior', materials: ['marble', 'limestone', 'granite'], image: imgColumns, recommendedFinishes: ['polished', 'honed', 'aged'], formats: ['Ø 20–60 cm', 'Hauteur 1–4 m', 'Sur mesure'], origin: 'Carrare, Vicenza, Sardaigne', technical: { density: '2 700–2 750 kg/m³', flexural: '12–20 MPa', thickness: 'Tournage CNC + finition main' }, since: 2002 },
  { id: 'balustrades', i18nKey: 'balustrades', category: 'exterior', materials: ['marble', 'limestone'], image: imgBalustrades, recommendedFinishes: ['honed', 'polished', 'aged'], formats: ['Balustres tournés', 'Mains courantes', 'Pilastres'], origin: 'Carrare, Vicenza, Botticino', technical: { density: '2 700 kg/m³', flexural: '14 MPa', thickness: 'Sections 12–25 cm' }, since: 2004 },
  { id: 'flower-boxes', i18nKey: 'flowerBoxes', category: 'exterior', materials: ['limestone', 'sandstone'], image: imgFlowerBoxes, recommendedFinishes: ['honed', 'aged', 'brushed'], formats: ['60×60 cm', '100×40 cm', 'Sur mesure'], origin: 'Trani (Pouilles), Vicenza, Vérone', technical: { density: '2 400–2 600 kg/m³', absorption: '1–4 %', frost: 'Résistant au gel (EN 12371)', thickness: 'Parois 4–6 cm' }, since: 2008 },
  { id: 'benches', i18nKey: 'benches', category: 'exterior', materials: ['granite', 'limestone'], image: imgBenches, recommendedFinishes: ['flamed', 'honed', 'brushed'], formats: ['L 150–300 cm', 'Monolithe', 'Sur mesure'], origin: 'Sardaigne, Trani', technical: { density: '2 650–2 750 kg/m³', flexural: '15–25 MPa', thickness: 'Assise 8–12 cm' }, since: 2006 },
  { id: 'bollards', i18nKey: 'bollards', category: 'exterior', materials: ['granite', 'porfido'], image: imgBollards, recommendedFinishes: ['flamed', 'brushed'], formats: ['Ø 20–35 cm', 'H 60–120 cm'], origin: 'Sardaigne, Trentin', technical: { density: '2 700–2 750 kg/m³', flexural: '20–30 MPa', frost: 'Résistant au gel (EN 12371)', thickness: 'Monolithe' }, since: 2005 },
  { id: 'curbs', i18nKey: 'curbs', category: 'exterior', materials: ['granite', 'porfido'], image: imgCurbs, recommendedFinishes: ['flamed', 'brushed'], formats: ['10×25 cm', '15×30 cm', 'Longueurs 50–200 cm'], origin: 'Sardaigne, Trentin', technical: { density: '2 700 kg/m³', flexural: '25 MPa', frost: 'Résistant au gel', thickness: '10–20 cm' }, since: 2000 },
  { id: 'sculptures', i18nKey: 'sculptures', category: 'exterior', materials: ['marble', 'limestone'], image: imgSculptures, recommendedFinishes: ['polished', 'honed', 'aged'], formats: ['Sur mesure', 'Sculpté à la main', 'D\u2019après dessin'], origin: 'Carrare, Pietrasanta', technical: { density: '2 700 kg/m³', thickness: 'Monolithe sculpté' }, since: 2003 },
  { id: 'external-cladding', i18nKey: 'externalCladding', category: 'exterior', materials: ['limestone', 'sandstone', 'porfido'], image: imgExternalCladding, recommendedFinishes: ['honed', 'flamed', 'brushed', 'aged'], formats: ['30×60 cm', '40×80 cm', 'Bandes', 'Opus'], origin: 'Trani, Vicenza, Trentin', technical: { density: '2 400–2 700 kg/m³', absorption: '< 1 %', frost: 'Résistant au gel (EN 12371)', thickness: '2–4 cm' }, since: 2001 },

  // Interior
  { id: 'interior-flooring', i18nKey: 'interiorFlooring', category: 'interior', materials: ['marble', 'limestone', 'granite'], image: imgInteriorFlooring, recommendedFinishes: ['polished', 'honed', 'brushed'], formats: ['30×60 cm', '60×60 cm', '60×120 cm', 'Sur mesure'], origin: 'Carrare, Trani, Sardaigne', technical: { density: '2 650–2 750 kg/m³', flexural: '12–20 MPa', absorption: '< 0,5 %', thickness: '1,2–2 cm' }, since: 1998 },
  { id: 'interior-cladding', i18nKey: 'interiorCladding', category: 'interior', materials: ['marble', 'limestone'], image: imgInteriorCladding, recommendedFinishes: ['polished', 'honed', 'brushed'], formats: ['30×60 cm', '40×80 cm', 'Grandes dalles', 'Sur mesure'], origin: 'Carrare, Trani, Botticino', technical: { density: '2 700 kg/m³', flexural: '14 MPa', thickness: '1–2 cm' }, since: 2000 },
  { id: 'kitchen-countertops', i18nKey: 'kitchenCountertops', category: 'interior', materials: ['marble', 'granite'], image: imgKitchenCountertops, recommendedFinishes: ['polished', 'honed'], formats: ['Sur mesure', 'Bookmatch', 'Mitered edge'], origin: 'Carrare (Calacatta, Statuario), Sardaigne', technical: { density: '2 700–2 750 kg/m³', flexural: '15–22 MPa', absorption: '< 0,4 %', thickness: '2 cm ou 3 cm (mitered jusqu\u2019à 6 cm)' }, since: 2004 },
  { id: 'sinks', i18nKey: 'sinks', category: 'interior', materials: ['marble', 'granite'], image: imgSinks, recommendedFinishes: ['polished', 'honed'], formats: ['Vasque pleine masse', 'À poser', 'Sur mesure'], origin: 'Carrare, Sardaigne', technical: { density: '2 700 kg/m³', thickness: 'Bloc plein, parois 3–5 cm' }, since: 2007 },
  { id: 'bathtubs', i18nKey: 'bathtubs', category: 'interior', materials: ['marble'], image: imgBathtubs, recommendedFinishes: ['polished', 'honed'], formats: ['Monolithe', 'Sculpté à la main', 'Sur mesure'], origin: 'Carrare, Pietrasanta', technical: { density: '2 700 kg/m³', thickness: 'Bloc monolithe, parois 5–8 cm' }, since: 2010 },

  // Slabs
  { id: 'open-book-slabs', i18nKey: 'openBookSlabs', category: 'slabs', materials: ['marble', 'granite'], image: imgOpenBookSlabs, recommendedFinishes: ['polished', 'honed'], formats: ['Paires bookmatch', '180×280 cm typ.', 'Épaisseur 2–3 cm'], origin: 'Carrare, Sardaigne, Brésil (sélection)', technical: { density: '2 700–2 750 kg/m³', thickness: '2–3 cm' }, since: 2005 },
  { id: 'block-slabs', i18nKey: 'blockSlabs', category: 'slabs', materials: ['marble', 'granite', 'limestone', 'sandstone'], image: imgBlockSlabs, recommendedFinishes: ['polished', 'honed', 'brushed', 'flamed'], formats: ['Blocs bruts', 'Dalles 180×280 cm', 'Épaisseur 2–8 cm'], origin: 'Carrare, Sardaigne, Trani, Vérone', technical: { density: '2 400–2 750 kg/m³', thickness: '2–8 cm' }, since: 1998 },
];

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID';
