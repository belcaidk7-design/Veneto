import { describe, it, expect, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import Seo from '@/components/Seo';

const SUPPORTED = ['en', 'it', 'fr', 'de'];

const renderSeo = (path: string, lang: string) => {
  i18n.changeLanguage(lang);
  return render(
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[path]}>
          <Seo title="Test" description="Test desc" path={path} />
        </MemoryRouter>
      </I18nextProvider>
    </HelmetProvider>
  );
};

const getLinks = () =>
  Array.from(document.head.querySelectorAll('link')).map((l) => ({
    rel: l.getAttribute('rel'),
    hreflang: l.getAttribute('hreflang'),
    href: l.getAttribute('href'),
  }));

describe('SEO hreflang & canonical', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  const paths = ['/', '/products', '/materials', '/projects', '/blog', '/about', '/contact', '/faq'];

  paths.forEach((path) => {
    SUPPORTED.forEach((lang) => {
      it(`emits clean canonical & hreflang for ${path} (${lang})`, async () => {
        renderSeo(path, lang);
        await waitFor(() => {
          const links = getLinks();
          const canonical = links.find((l) => l.rel === 'canonical');
          expect(canonical).toBeTruthy();
          expect(canonical!.href).not.toMatch(/[?&]lang=/);
          expect(canonical!.href?.endsWith(path)).toBe(true);

          const hreflangs = links.filter((l) => l.rel === 'alternate' && l.hreflang);
          // 4 langs + x-default
          expect(hreflangs.length).toBeGreaterThanOrEqual(SUPPORTED.length + 1);
          hreflangs.forEach((l) => {
            expect(l.href).not.toMatch(/[?&]lang=/);
            expect(l.href?.endsWith(path)).toBe(true);
          });
          SUPPORTED.forEach((l) => {
            expect(hreflangs.find((h) => h.hreflang === l)).toBeTruthy();
          });
          expect(hreflangs.find((h) => h.hreflang === 'x-default')).toBeTruthy();
        });
      });
    });
  });
});
