/**
 * SEO head builder for TanStack route `head()` exports.
 *
 * Resolves the visitor's active language (cookie / Accept-Language on the
 * server, cookie / localStorage on the client) so the server-rendered
 * title, description and OG tags already match the language the page will
 * display — no English flash, no wrong browser-tab title.
 */

import enLocale from "@/i18n/locales/en";
import itLocale from "@/i18n/locales/it";
import frLocale from "@/i18n/locales/fr";
import deLocale from "@/i18n/locales/de";
import { getActiveLang, type Lang } from "@/lib/active-lang";

export const SITE_NAME = "HQ Stones";
export const SITE_URL = "https://hq-stones.com";
export const SUPPORTED_LANGS = ["en", "it", "fr", "de"] as const;

const LOCALES: Record<Lang, typeof enLocale> = {
  en: enLocale,
  it: itLocale as typeof enLocale,
  fr: frLocale as typeof enLocale,
  de: deLocale as typeof enLocale,
};

/** Locale bundle for the visitor's active language (English fallback). */
export function activeLocale(): typeof enLocale {
  return LOCALES[getActiveLang()] ?? enLocale;
}

export type SeoKey = keyof typeof enLocale.seo;

/** Localized { title, description } for a page key in `seo.*`. */
export function seoText(key: SeoKey): { title: string; description: string } {
  const active = activeLocale().seo?.[key] as { title?: string; description?: string } | undefined;
  const fallback = enLocale.seo[key] as { title: string; description: string };
  return {
    title: active?.title ?? fallback.title,
    description: active?.description ?? fallback.description,
  };
}


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
    { property: "og:locale", content: getActiveLang() },
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
