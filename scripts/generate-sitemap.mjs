#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from the app's known routes & data.
 * Run with: node scripts/generate-sitemap.mjs [base-url]
 * Default base URL: https://hqstones.example
 */
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = (process.argv[2] || process.env.SITE_URL || 'https://hqstones.example').replace(/\/$/, '');
const today = new Date().toISOString().split('T')[0];

const PRODUCT_SLUGS = [
  'external-paving','fountains','columns','balustrades','flower-boxes','benches',
  'bollards','curbs','sculptures','external-cladding','interior-flooring',
  'interior-cladding','kitchen-countertops','sinks','bathtubs',
  'open-book-slabs','block-slabs',
];

const BLOG_SLUGS = [
  'choosing-marble-kitchen',
  'italian-quarries-heritage',
  'caring-outdoor-limestone',
];

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
];

const urls = [
  ...STATIC,
  ...PRODUCT_SLUGS.map((s) => ({ path: `/products/${s}`, priority: '0.7', changefreq: 'monthly' })),
  ...BLOG_SLUGS.map((s) => ({ path: `/blog/${s}`, priority: '0.6', changefreq: 'monthly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
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
