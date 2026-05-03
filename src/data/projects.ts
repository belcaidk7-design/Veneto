import publicSquare from '@/assets/projects/public-square.jpg';
import hotelLobby from '@/assets/projects/hotel-lobby.jpg';
import villaPrivate from '@/assets/projects/villa-private.jpg';
import luxuryKitchen from '@/assets/projects/luxury-kitchen.jpg';
import spaBathroom from '@/assets/projects/spa-bathroom.jpg';
import residentialCourtyard from '@/assets/projects/residential-courtyard.jpg';
import { MaterialKey } from './catalog';

export type ProjectType = 'residential' | 'public' | 'commercial';

export interface Project {
  id: string;
  i18nKey: string; // projects.items.<key>
  type: ProjectType;
  materials: MaterialKey[];
  image: string;
}

// Réalisations issues du catalogue HQ Stones
// CONTENT: les visuels actuels sont des placeholders ; remplacer par les vraies photos du catalogue (page 1 à 5).
export const PROJECTS: Project[] = [
  { id: 'ljubljana-cemetery', i18nKey: 'ljubljanaCemetery', type: 'public', materials: ['granite'], image: publicSquare },
  { id: 'trieste-puecher', i18nKey: 'triestePuecher', type: 'public', materials: ['granite', 'porfido'], image: residentialCourtyard },
  { id: 'bolzano-ponte-druso', i18nKey: 'bolzanoPonteDruso', type: 'public', materials: ['granite'], image: villaPrivate },
  { id: 'passau-villa', i18nKey: 'passauVilla', type: 'residential', materials: ['granite'], image: hotelLobby },
  { id: 'riyadh-fountain', i18nKey: 'riyadhFountain', type: 'commercial', materials: ['limestone'], image: spaBathroom },
  { id: 'innsbruck-fountain', i18nKey: 'innsbruckFountain', type: 'public', materials: ['marble'], image: luxuryKitchen },
  { id: 'piacenza-fountain', i18nKey: 'piacenzaFountain', type: 'public', materials: ['granite'], image: publicSquare },
  { id: 'casalecchio-fountain', i18nKey: 'casalecchioFountain', type: 'commercial', materials: ['granite'], image: hotelLobby },
];

export const PROJECT_TYPES: ProjectType[] = ['residential', 'public', 'commercial'];
