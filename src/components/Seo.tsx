import { Helmet } from 'react-helmet-async';
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
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: BreadcrumbItem[];
}

const SITE_NAME = 'HQ Stones';
const SITE_URL =
  typeof window !== 'undefined' ? window.location.origin : 'https://hqstones.example';
const SUPPORTED_LANGS = ['en', 'it', 'fr', 'de'] as const;
const DEFAULT_LANG = 'en';

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  email: 'info@hqstones.example',
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

const Seo = ({
  title,
  description,
  path = '/',
  image,
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

  const webPage: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'WebPage' : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: fullTitle,
    description,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  };

  const breadcrumbLd = breadcrumbs && breadcrumbs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: `${SITE_URL}${b.path}`,
        })),
      }
    : null;

  const graph: Record<string, unknown>[] = [ORGANIZATION, WEBSITE, webPage];
  if (breadcrumbLd) graph.push(breadcrumbLd);
  if (jsonLd) {
    if (Array.isArray(jsonLd)) graph.push(...jsonLd);
    else graph.push(jsonLd);
  }

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {SUPPORTED_LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={`${SITE_URL}${path}?lang=${l}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={lang} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  );
};

export default Seo;
