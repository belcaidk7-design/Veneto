import { createIsomorphicFn } from '@tanstack/react-start';
import { getCookie, getRequestHeader } from '@tanstack/react-start/server';

export const SUPPORTED_LANGS = ['en', 'it', 'fr', 'de'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';
export const LANG_COOKIE = 'hqs-lang';

export function normalizeLang(value: string | null | undefined): Lang {
  const code = (value ?? '').toLowerCase().split(/[-_,;]/)[0] as Lang;
  return SUPPORTED_LANGS.includes(code) ? code : DEFAULT_LANG;
}

/** Pick the best supported language from an Accept-Language header. */
function fromAcceptLanguage(header: string | undefined): Lang | undefined {
  if (!header) return undefined;
  for (const part of header.split(',')) {
    const code = part.trim().split(';')[0];
    const norm = (code ?? '').toLowerCase().split('-')[0] as Lang;
    if (SUPPORTED_LANGS.includes(norm)) return norm;
  }
  return undefined;
}

/**
 * Active UI language, resolvable in both environments:
 * - server: the `hqs-lang` cookie, falling back to Accept-Language
 * - client: the same cookie / localStorage value i18next persists
 */
export const getActiveLang = createIsomorphicFn()
  .server((): Lang => {
    const cookie = getCookie(LANG_COOKIE);
    if (cookie) return normalizeLang(cookie);
    return fromAcceptLanguage(getRequestHeader('accept-language')) ?? DEFAULT_LANG;
  })
  .client((): Lang => {
    const match = /(?:^|;\s*)hqs-lang=([^;]*)/.exec(document.cookie);
    const stored = match?.[1] ? decodeURIComponent(match[1]) : localStorage.getItem(LANG_COOKIE);
    return normalizeLang(stored ?? navigator.language);
  });
