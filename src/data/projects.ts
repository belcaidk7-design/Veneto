import villaPrivate from '@/assets/projects/villa-private.jpg';
import publicSquare from '@/assets/projects/public-square.jpg';
import hotelLobby from '@/assets/projects/hotel-lobby.jpg';
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

export const PROJECTS: Project[] = [
  { id: 'villa-private', i18nKey: 'villaPrivate', type: 'residential', materials: ['limestone', 'sandstone'], image: villaPrivate },
  { id: 'public-square', i18nKey: 'publicSquare', type: 'public', materials: ['porfido', 'granite'], image: publicSquare },
  { id: 'hotel-lobby', i18nKey: 'hotelLobby', type: 'commercial', materials: ['marble', 'limestone'], image: hotelLobby },
  { id: 'luxury-kitchen', i18nKey: 'luxuryKitchen', type: 'residential', materials: ['marble'], image: luxuryKitchen },
  { id: 'spa-bathroom', i18nKey: 'spaBathroom', type: 'commercial', materials: ['marble'], image: spaBathroom },
  { id: 'residential-courtyard', i18nKey: 'residentialCourtyard', type: 'residential', materials: ['sandstone', 'limestone'], image: residentialCourtyard },
];

export const PROJECT_TYPES: ProjectType[] = ['residential', 'public', 'commercial'];
