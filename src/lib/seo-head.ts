/**
 * Server-side SEO head builder for TanStack route `head()` exports.
 *
 * Emits the English (x-default) title/description/canonical/OG/Twitter tags
 * server-side so crawlers see the right metadata on first byte. The client
 * <Seo> component then keeps these tags in sync with the active language
 * after hydration (same single-URL i18n strategy as before the migration).
 */

export const SITE_NAME = "HQ Stones";
export const SITE_URL = "https://hq-stones.com";
export const SUPPORTED_LANGS = ["en", "it", "fr", "de"] as const;

export interface SeoHeadInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

type MetaEntry = Record<string, string>;
type LinkEntry = Record<string, string>;

export function buildSeoHead({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  noindex = false,
}: SeoHeadInput): { meta: MetaEntry[]; links: LinkEntry[] } {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/og-image.jpg`;

  const meta: MetaEntry[] = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ];
  if (imageAlt) {
    meta.push({ property: "og:image:alt", content: imageAlt });
    meta.push({ name: "twitter:image:alt", content: imageAlt });
  }
  if (noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  const links: LinkEntry[] = [
    { rel: "canonical", href: url },
    ...SUPPORTED_LANGS.map((l) => ({ rel: "alternate", hrefLang: l, href: url })),
    { rel: "alternate", hrefLang: "x-default", href: url },
  ];

  return { meta, links };
}
