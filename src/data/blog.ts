import marbleKitchen from '@/assets/blog-marble-kitchen.jpg';
import quarry from '@/assets/blog-quarry.jpg';
import limestone from '@/assets/blog-limestone.jpg';

export type BlogCategoryKey = 'stoneGuide' | 'projects' | 'materials' | 'maintenance' | 'news';

export interface BlogPost {
  slug: string;
  i18nKey: string; // blog.posts.<key>
  category: BlogCategoryKey;
  date: string;
  cover: string;
}

export const BLOG_POSTS: BlogPost[] = [
  { slug: 'choosing-marble-kitchen', i18nKey: 'marbleKitchen', category: 'stoneGuide', date: '2025-03-12', cover: marbleKitchen },
  { slug: 'italian-quarries-heritage', i18nKey: 'italianQuarries', category: 'projects', date: '2025-02-04', cover: quarry },
  { slug: 'caring-outdoor-limestone', i18nKey: 'outdoorLimestone', category: 'maintenance', date: '2025-01-18', cover: limestone },
];

export const BLOG_CATEGORIES: BlogCategoryKey[] = ['stoneGuide', 'projects', 'materials', 'maintenance', 'news'];
