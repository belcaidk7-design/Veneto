#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from the app's known routes & data.
 * Run with: node scripts/generate-sitemap.mjs [base-url]
 * Default base URL: https://hq-stones.com
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = (process.argv[2] || process.env.SITE_URL || 'https://hq-stones.com').replace(/\/$/, '');
const today = new Date().toISOString().split('T')[0];

const read = (p) => readFileSync(resolve(__dirname, '..', p), 'utf8');

// Slugs are derived from the app data so the sitemap can never drift out of sync.
const PRODUCT_SLUGS = [
  ...new Set(
    [...read('src/data/catalog.ts').matchAll(/\{\s*id:\s*'([^']+)'\s*,\s*i18nKey:/g)].map((m) => m[1]),
  ),
];

const BLOG_SLUGS = [
  ...new Set([...read('src/data/blog.ts').matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])),
];

if (!PRODUCT_SLUGS.length || !BLOG_SLUGS.length) {
  throw new Error('Sitemap generation failed: no product or blog slugs found.');
}


const STATIC = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/products', priority: '0.9', changefreq: 'monthly' },
  { path: '/materials', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/savoir-faire', priority: '0.7', changefreq: 'monthly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/legal', priority: '0.3', changefreq: 'yearly' },
];

const urls = [
  ...STATIC,
  ...PRODUCT_SLUGS.map((s) => ({ path: `/products/${s}`, priority: '0.7', changefreq: 'monthly' })),
  ...BLOG_SLUGS.map((s) => ({ path: `/blog/${s}`, priority: '0.6', changefreq: 'monthly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Sitemap excludes private/admin routes (/admin/*) and API endpoints (/api/*). -->
<!-- These paths are blocked in robots.txt and set to noindex, nofollow. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${BASE}${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const out = resolve(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(out, xml, 'utf8');
console.log(`Wrote ${urls.length} URLs to ${out} (base: ${BASE})`);
