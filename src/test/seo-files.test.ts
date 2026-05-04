import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(__dirname, '..', '..');
const robotsPath = resolve(ROOT, 'public', 'robots.txt');
const sitemapPath = resolve(ROOT, 'public', 'sitemap.xml');

const SUPPORTED_LANGS = ['en', 'it', 'fr', 'de'];

const EXPECTED_PATHS = [
  '/', '/products', '/materials', '/projects',
  '/blog', '/about', '/savoir-faire', '/faq', '/contact',
  '/products/external-paving', '/products/kitchen-countertops',
  '/products/open-book-slabs',
  '/blog/choosing-marble-kitchen',
];

describe('robots.txt', () => {
  it('exists', () => {
    expect(existsSync(robotsPath)).toBe(true);
  });

  const content = existsSync(robotsPath) ? readFileSync(robotsPath, 'utf8') : '';

  it('allows all user-agents', () => {
    expect(content).toMatch(/User-agent:\s*\*/);
    expect(content).toMatch(/Allow:\s*\//);
  });

  it('references an absolute sitemap URL', () => {
    const m = content.match(/Sitemap:\s*(\S+)/i);
    expect(m).toBeTruthy();
    expect(m![1]).toMatch(/^https?:\/\/.+\/sitemap\.xml$/);
  });

  it('does not block any language path', () => {
    SUPPORTED_LANGS.forEach((l) => {
      expect(content).not.toMatch(new RegExp(`Disallow:.*${l}`, 'i'));
    });
  });
});

describe('sitemap.xml', () => {
  it('exists', () => {
    expect(existsSync(sitemapPath)).toBe(true);
  });

  const xml = existsSync(sitemapPath) ? readFileSync(sitemapPath, 'utf8') : '';

  it('is a valid urlset declaration', () => {
    expect(xml).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    expect(xml).toMatch(/<urlset[^>]+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
    expect(xml).toMatch(/<\/urlset>/);
  });

  it('contains absolute URLs (no relative loc)', () => {
    const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
    expect(locs.length).toBeGreaterThan(0);
    locs.forEach((loc) => {
      expect(loc).toMatch(/^https?:\/\//);
    });
  });

  it('URLs do not contain a lang query parameter', () => {
    const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
    locs.forEach((loc) => {
      expect(loc).not.toMatch(/[?&]lang=/);
    });
  });

  it.each(EXPECTED_PATHS)('lists %s', (path) => {
    const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
    expect(locs.some((l) => l.endsWith(path))).toBe(true);
  });

  // Site uses a single canonical URL per page across all languages (client-side i18n),
  // so each page must appear exactly once — verified for every supported language consumer.
  describe.each(SUPPORTED_LANGS)('language: %s', (lang) => {
    it(`exposes one canonical entry per page (no per-lang duplicates) for ${lang}`, () => {
      const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
      EXPECTED_PATHS.forEach((p) => {
        const matches = locs.filter((l) => l.endsWith(p));
        expect(matches.length).toBe(1);
        expect(matches[0]).not.toMatch(new RegExp(`/${lang}/`));
      });
    });
  });
});
