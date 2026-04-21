import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, MATERIALS, MaterialKey, PRODUCTS } from '@/data/catalog';

const Products = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<MaterialKey[]>([]);

  const toggle = (m: MaterialKey) =>
    setActive((s) => (s.includes(m) ? s.filter((x) => x !== m) : [...s, m]));

  const filtered = useMemo(() => {
    if (active.length === 0) return PRODUCTS;
    return PRODUCTS.filter((p) => p.materials.some((m) => active.includes(m)));
  }, [active]);

  return (
    <Layout>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-prose py-16 md:py-20">
          <h1 className="font-serif text-4xl md:text-5xl">{t('products.title')}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t('products.subtitle')}</p>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-16 z-30 border-b border-border/60 bg-background/95 backdrop-blur md:top-20">
        <div className="container-prose flex flex-wrap items-center gap-3 py-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t('products.filterTitle')}:
          </span>
          {MATERIALS.map((m) => {
            const on = active.includes(m);
            return (
              <button
                key={m}
                onClick={() => toggle(m)}
                className={`rounded-sm border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                  on
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border bg-background text-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {t(`materials.${m}`)}
              </button>
            );
          })}
          {active.length > 0 && (
            <button
              onClick={() => setActive([])}
              className="ml-auto text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              {t('products.clearFilter')}
            </button>
          )}
        </div>
      </section>

      <div className="container-prose space-y-20 py-16 md:py-20">
        {CATEGORIES.map((cat) => {
          const items = filtered.filter((p) => p.category === cat);
          if (items.length === 0) return null;
          return (
            <section key={cat}>
              <div className="mb-8 flex items-baseline justify-between gap-4">
                <h2 className="font-serif text-2xl md:text-3xl">{t(`categories.${cat}`)}</h2>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {items.length}
                </span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">{t('products.noResults')}</p>
        )}
      </div>
    </Layout>
  );
};

export default Products;
