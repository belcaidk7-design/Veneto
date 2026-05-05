import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Sitemap validation — single-URL-per-page strategy.
 * Each page exposes one canonical URL; languages are advertised via
 * hreflang tags in the document <head>, not via separate sitemap entries.
 * These tests guarantee the sitemap stays clean and language-neutral.
 */

const SITEMAP_PATH = resolve(__dirname, '../../public/sitemap.xml');
const SUPPORTED_LANGS = ['en', 'it', 'fr', 'de'] as const;

let xml: string;
let locs: string[];
let urlBlocks: string[];

beforeAll(() => {
  xml = readFileSync(SITEMAP_PATH, 'utf-8');
  locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim());
  urlBlocks = Array.from(xml.matchAll(/<url>[\s\S]*?<\/url>/g)).map((m) => m[0]);
});

describe('sitemap.xml — XML schema', () => {
  it('starts with the XML declaration', () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
  });

  it('declares the sitemaps.org 0.9 namespace', () => {
    expect(xml).toMatch(/<urlset[^>]+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
  });

  it('opens and closes <urlset> exactly once', () => {
    expect((xml.match(/<urlset[\s>]/g) || []).length).toBe(1);
    expect((xml.match(/<\/urlset>/g) || []).length).toBe(1);
  });

  it('contains at least one <url> entry', () => {
    expect(urlBlocks.length).toBeGreaterThan(0);
  });

  it('every <url> block has exactly one <loc>', () => {
    urlBlocks.forEach((block) => {
      expect((block.match(/<loc>/g) || []).length).toBe(1);
    });
  });
});

describe('sitemap.xml — URL coherence', () => {
  it('every <loc> is an absolute https URL', () => {
    expect(locs.length).toBeGreaterThan(0);
    locs.forEach((loc) => {
      expect(loc).toMatch(/^https:\/\//);
      expect(() => new URL(loc)).not.toThrow();
    });
  });

  it('all URLs share the same origin', () => {
    const origins = new Set(locs.map((l) => new URL(l).origin));
    expect(origins.size).toBe(1);
  });

  it('no URL contains a lang query parameter', () => {
    locs.forEach((loc) => {
      expect(loc).not.toMatch(/[?&]lang=/i);
    });
  });

  it('no URL contains a /en|/it|/fr|/de language path prefix', () => {
    locs.forEach((loc) => {
      const path = new URL(loc).pathname;
      SUPPORTED_LANGS.forEach((lang) => {
        expect(path).not.toMatch(new RegExp(`^/${lang}(/|$)`, 'i'));
      });
    });
  });

  it('every URL appears only once (single-URL-per-page strategy)', () => {
    const dupes = locs.filter((loc, i) => locs.indexOf(loc) !== i);
    expect(dupes).toEqual([]);
  });
});

describe('sitemap.xml — lastmod', () => {
  it('every <url> declares a <lastmod>', () => {
    urlBlocks.forEach((block) => {
      expect(block).toMatch(/<lastmod>[^<]+<\/lastmod>/);
    });
  });

  it('every <lastmod> is a valid W3C date (YYYY-MM-DD or full ISO 8601)', () => {
    const lastmods = Array.from(xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)).map((m) => m[1].trim());
    const w3c = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2}))?$/;
    lastmods.forEach((d) => {
      expect(d).toMatch(w3c);
      expect(Number.isNaN(Date.parse(d))).toBe(false);
    });
  });

  it('no <lastmod> is set in the future', () => {
    const lastmods = Array.from(xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)).map((m) => m[1].trim());
    const now = Date.now();
    lastmods.forEach((d) => {
      expect(Date.parse(d)).toBeLessThanOrEqual(now + 24 * 60 * 60 * 1000);
    });
  });
});

describe('sitemap.xml — language strategy', () => {
  it('does not declare the xhtml namespace (no per-language alternates needed)', () => {
    // hreflang alternates live in the <head> of each page, not in the sitemap.
    expect(xml).not.toMatch(/xmlns:xhtml=/);
  });

  it('contains no <xhtml:link> alternate entries', () => {
    expect(xml).not.toMatch(/<xhtml:link/);
  });
});
