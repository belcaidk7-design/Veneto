import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import Lightbox from '@/components/Lightbox';
import {
  CATALOG_FAMILIES,
  CATALOG_PLATES,
  CatalogFamily,
} from '@/data/catalogPlates';

const Catalog = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<CatalogFamily | 'all'>('all');
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const filtered = useMemo(
    () => (active === 'all' ? CATALOG_PLATES : CATALOG_PLATES.filter((p) => p.family === active)),
    [active],
  );

  return (
    <Layout>
      <Seo
        title={t('seo.catalog.title')}
        description={t('seo.catalog.description')}
        path="/catalog"
        breadcrumbs={[
          { name: t('nav.home'), path: '/' },
          { name: t('nav.catalog'), path: '/catalog' },
        ]}
      />

      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-prose py-16 md:py-20">
          <h1 className="font-serif text-4xl md:text-5xl">{t('catalog.title')}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t('catalog.subtitle')}</p>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-b border-border/60 bg-background/95 backdrop-blur md:top-20">
        <div className="container-prose flex flex-wrap items-center gap-2 py-4">
          <button
            onClick={() => setActive('all')}
            className={`rounded-sm border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
              active === 'all'
                ? 'border-accent bg-accent text-accent-foreground'
                : 'border-border hover:border-accent hover:text-accent'
            }`}
          >
            {t('catalog.all')}
          </button>
          {CATALOG_FAMILIES.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-sm border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                active === f
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border hover:border-accent hover:text-accent'
              }`}
            >
              {t(`catalog.families.${f}`)}
            </button>
          ))}
        </div>
      </section>

      <div className="container-prose py-16 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((plate) => {
            const label = t(`catalog.families.${plate.family}`);
            const alt = `${label} – ${plate.refs}`;
            return (
              <button
                key={plate.id}
                onClick={() => setLightbox({ src: plate.image, alt })}
                className="group flex flex-col overflow-hidden rounded-sm border border-border bg-background text-left transition-shadow hover:shadow-md"
              >
                <div className="aspect-[3/4] overflow-hidden bg-secondary/40">
                  <img
                    src={plate.image}
                    alt={alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-border/60 px-4 py-3">
                  <span className="font-serif text-base">{label}</span>
                  <span className="rounded-sm bg-secondary px-2 py-1 text-xs font-medium tracking-wider text-muted-foreground">
                    {plate.refs}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">{t('products.noResults')}</p>
        )}
      </div>

      <Lightbox
        open={!!lightbox}
        src={lightbox?.src ?? ''}
        alt={lightbox?.alt ?? ''}
        onClose={() => setLightbox(null)}
      />
    </Layout>
  );
};

export default Catalog;
