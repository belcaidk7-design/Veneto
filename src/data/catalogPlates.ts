import p7 from '@/assets/catalog/p7.jpg.asset.json';
import p10 from '@/assets/catalog/p10.jpg.asset.json';
import p14 from '@/assets/catalog/p14.jpg.asset.json';
import p18 from '@/assets/catalog/p18.jpg.asset.json';
import p19 from '@/assets/catalog/p19.jpg.asset.json';
import p20 from '@/assets/catalog/p20.jpg.asset.json';
import p21 from '@/assets/catalog/p21.jpg.asset.json';
import p23 from '@/assets/catalog/p23.jpg.asset.json';
import p25 from '@/assets/catalog/p25.jpg.asset.json';
import p27 from '@/assets/catalog/p27.jpg.asset.json';
import p28 from '@/assets/catalog/p28.jpg.asset.json';
import p30 from '@/assets/catalog/p30.jpg.asset.json';
import p31 from '@/assets/catalog/p31.jpg.asset.json';
import p34 from '@/assets/catalog/p34.jpg.asset.json';
import p38 from '@/assets/catalog/p38.jpg.asset.json';
import p40 from '@/assets/catalog/p40.jpg.asset.json';
import p41 from '@/assets/catalog/p41.jpg.asset.json';
import p43 from '@/assets/catalog/p43.jpg.asset.json';
import p44 from '@/assets/catalog/p44.jpg.asset.json';
import p45 from '@/assets/catalog/p45.jpg.asset.json';
import p47 from '@/assets/catalog/p47.jpg.asset.json';
import p49 from '@/assets/catalog/p49.jpg.asset.json';

export type CatalogFamily =
  | 'fountains'
  | 'wallFountains'
  | 'flowerpots'
  | 'pots'
  | 'pools'
  | 'balustrades'
  | 'columns'
  | 'stairs'
  | 'windowSills'
  | 'paving';

export interface CatalogPlate {
  id: string;
  family: CatalogFamily;
  refs: string;
  image: string;
}

export const CATALOG_FAMILIES: CatalogFamily[] = [
  'fountains',
  'wallFountains',
  'flowerpots',
  'pots',
  'pools',
  'balustrades',
  'columns',
  'stairs',
  'windowSills',
  'paving',
];

export const CATALOG_PLATES: CatalogPlate[] = [
  { id: 'p7',  family: 'fountains',     refs: 'F1 – F6',      image: p7.url },
  { id: 'p10', family: 'fountains',     refs: 'F19 – F26',    image: p10.url },
  { id: 'p14', family: 'fountains',     refs: 'F45 – F53',    image: p14.url },
  { id: 'p18', family: 'fountains',     refs: 'F78 – F84',    image: p18.url },
  { id: 'p19', family: 'wallFountains', refs: 'F85 – F93',    image: p19.url },
  { id: 'p20', family: 'wallFountains', refs: 'F94 – F101',   image: p20.url },
  { id: 'p21', family: 'flowerpots',    refs: 'Fi1 – Fi6',    image: p21.url },
  { id: 'p23', family: 'flowerpots',    refs: 'Fi13 – Fi19',  image: p23.url },
  { id: 'p25', family: 'pots',          refs: 'V1 – V12',     image: p25.url },
  { id: 'p27', family: 'pots',          refs: 'V25 – V33',    image: p27.url },
  { id: 'p28', family: 'pools',         refs: 'Pool A',       image: p28.url },
  { id: 'p30', family: 'pools',         refs: 'Pool C',       image: p30.url },
  { id: 'p31', family: 'balustrades',   refs: 'B1 – B4',      image: p31.url },
  { id: 'p34', family: 'balustrades',   refs: 'B12 – B16',    image: p34.url },
  { id: 'p38', family: 'columns',       refs: 'C1 – C5',      image: p38.url },
  { id: 'p40', family: 'columns',       refs: 'C9 – C14',     image: p40.url },
  { id: 'p41', family: 'stairs',        refs: 'S1 – S5',      image: p41.url },
  { id: 'p43', family: 'stairs',        refs: 'S10 – S14',    image: p43.url },
  { id: 'p44', family: 'windowSills',   refs: 'WS1 – WS6',    image: p44.url },
  { id: 'p45', family: 'paving',        refs: 'PV1 – PV4',    image: p45.url },
  { id: 'p47', family: 'paving',        refs: 'PV9 – PV12',   image: p47.url },
  { id: 'p49', family: 'paving',        refs: 'PV17 – PV20',  image: p49.url },
];
