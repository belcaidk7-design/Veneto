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
  tags: BlogCategoryKey[];
}

export const BLOG_POSTS: BlogPost[] = [
  { slug: 'choosing-marble-kitchen', i18nKey: 'marbleKitchen', category: 'stoneGuide', date: '2025-03-12', cover: marbleKitchen, tags: ['stoneGuide', 'materials'] },
  { slug: 'italian-quarries-heritage', i18nKey: 'italianQuarries', category: 'projects', date: '2025-02-04', cover: quarry, tags: ['projects', 'materials'] },
  { slug: 'caring-outdoor-limestone', i18nKey: 'outdoorLimestone', category: 'maintenance', date: '2025-01-18', cover: limestone, tags: ['maintenance', 'materials'] },
];

export const BLOG_CATEGORIES: BlogCategoryKey[] = ['stoneGuide', 'projects', 'materials', 'maintenance', 'news'];

export const getRelatedPosts = (current: BlogPost, limit = 3): BlogPost[] => {
  const others = BLOG_POSTS.filter((p) => p.slug !== current.slug);
  const sameTag = others.filter((p) => p.tags.some((t) => current.tags.includes(t)));
  const remainder = others.filter((p) => !sameTag.includes(p));
  return [...sameTag, ...remainder].slice(0, limit);
};
