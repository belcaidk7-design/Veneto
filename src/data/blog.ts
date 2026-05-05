import marbleKitchen from '@/assets/blog-marble-kitchen.jpg';
import quarry from '@/assets/blog-quarry.jpg';
import limestone from '@/assets/blog-limestone.jpg';

export type BlogCategoryKey = 'stoneGuide' | 'projects' | 'materials' | 'maintenance' | 'news';

export type AuthorKey = 'marco' | 'sophie' | 'andreas';

export interface BlogAuthor {
  key: AuthorKey;
  name: string;
  // i18n keys: blog.authors.<key>.role / .bio
  url: string;
  sameAs?: string[];
}

export const BLOG_AUTHORS: Record<AuthorKey, BlogAuthor> = {
  marco: {
    key: 'marco',
    name: 'Marco Rinaldi',
    url: '/about#marco-rinaldi',
    sameAs: ['https://www.linkedin.com/in/marco-rinaldi-stone/'],
  },
  sophie: {
    key: 'sophie',
    name: 'Sophie Laurent',
    url: '/about#sophie-laurent',
    sameAs: ['https://www.linkedin.com/in/sophie-laurent-design/'],
  },
  andreas: {
    key: 'andreas',
    name: 'Andreas Keller',
    url: '/about#andreas-keller',
    sameAs: ['https://www.linkedin.com/in/andreas-keller-stone/'],
  },
};

export interface BlogPost {
  slug: string;
  i18nKey: string; // blog.posts.<key>
  category: BlogCategoryKey;
  date: string;          // datePublished (ISO yyyy-mm-dd)
  updated: string;       // dateModified (ISO yyyy-mm-dd)
  cover: string;
  tags: BlogCategoryKey[];
  authorKey: AuthorKey;
  readingTimeMin: number;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'choosing-marble-kitchen',
    i18nKey: 'marbleKitchen',
    category: 'stoneGuide',
    date: '2025-03-12',
    updated: '2026-04-22',
    cover: marbleKitchen,
    tags: ['stoneGuide', 'materials'],
    authorKey: 'marco',
    readingTimeMin: 6,
  },
  {
    slug: 'italian-quarries-heritage',
    i18nKey: 'italianQuarries',
    category: 'projects',
    date: '2025-02-04',
    updated: '2026-03-15',
    cover: quarry,
    tags: ['projects', 'materials'],
    authorKey: 'sophie',
    readingTimeMin: 5,
  },
  {
    slug: 'caring-outdoor-limestone',
    i18nKey: 'outdoorLimestone',
    category: 'maintenance',
    date: '2025-01-18',
    updated: '2026-02-08',
    cover: limestone,
    tags: ['maintenance', 'materials'],
    authorKey: 'andreas',
    readingTimeMin: 4,
  },
];

export const BLOG_CATEGORIES: BlogCategoryKey[] = ['stoneGuide', 'projects', 'materials', 'maintenance', 'news'];

export const getRelatedPosts = (current: BlogPost, limit = 3): BlogPost[] => {
  const others = BLOG_POSTS.filter((p) => p.slug !== current.slug);
  const sameTag = others.filter((p) => p.tags.some((t) => current.tags.includes(t)));
  const remainder = others.filter((p) => !sameTag.includes(p));
  return [...sameTag, ...remainder].slice(0, limit);
};
