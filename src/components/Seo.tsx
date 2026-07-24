import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: BreadcrumbItem[];
}

const SITE_NAME = 'HQ Stones';
const SITE_URL = 'https://hq-stones.com';
const SUPPORTED_LANGS = ['en', 'it', 'fr', 'de'] as const;
const DEFAULT_LANG = 'en';

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  email: 'info@hq-stones.com',
  areaServed: 'Worldwide',
};

const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: SUPPORTED_LANGS,
  publisher: { '@id': `${SITE_URL}/#organization` },
};

// ---------- DOM upsert helpers (client-only; SSR tags come from route head()) ----------

function upsertMeta(attr: 'name' | 'property', key: string, content: string | undefined) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (content === undefined) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(graph: Record<string, unknown>[]) {
  const id = 'seo-jsonld';
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(graph);
}

/**
 * Client-side SEO synchroniser. The server already renders correct English
 * meta via each route's head(); this component re-syncs title, description,
 * OG/Twitter tags and JSON-LD with the visitor's active language and injects
 * the full localized structured-data graph.
 */
const Seo = ({
  title,
  description,
  path = '/',
  image,
  imageAlt,
  type = 'website',
  jsonLd,
  breadcrumbs,
}: SeoProps) => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || DEFAULT_LANG).split('-')[0];
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : `${SITE_URL}${image}`
    : undefined;
  const jsonLdKey = JSON.stringify(jsonLd ?? null);
  const breadcrumbsKey = JSON.stringify(breadcrumbs ?? null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);
    for (const l of SUPPORTED_LANGS) upsertLink('alternate', url, l);
    upsertLink('alternate', url, 'x-default');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:locale', lang);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:image:alt', ogImage && imageAlt ? imageAlt : undefined);
    upsertMeta('name', 'twitter:card', ogImage ? 'summary_large_image' : 'summary');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
    upsertMeta('name', 'twitter:image:alt', ogImage && imageAlt ? imageAlt : undefined);

    const webPage: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: fullTitle,
      description,
      inLanguage: lang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
    };

    const parsedBreadcrumbs = breadcrumbsKey !== 'null'
      ? (JSON.parse(breadcrumbsKey) as BreadcrumbItem[])
      : null;
    const breadcrumbLd = parsedBreadcrumbs && parsedBreadcrumbs.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: parsedBreadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: b.name,
            item: `${SITE_URL}${b.path}`,
          })),
        }
      : null;

    const graph: Record<string, unknown>[] = [ORGANIZATION, WEBSITE, webPage];
    if (breadcrumbLd) graph.push(breadcrumbLd);
    const parsedJsonLd = jsonLdKey !== 'null'
      ? (JSON.parse(jsonLdKey) as Record<string, unknown> | Record<string, unknown>[])
      : null;
    if (parsedJsonLd) {
      if (Array.isArray(parsedJsonLd)) graph.push(...parsedJsonLd);
      else graph.push(parsedJsonLd);
    }
    upsertJsonLd(graph);
  }, [lang, fullTitle, description, url, type, ogImage, imageAlt, jsonLdKey, breadcrumbsKey]);

  return null;
};

export default Seo;
