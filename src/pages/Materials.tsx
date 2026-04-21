import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { MATERIALS, PRODUCTS } from '@/data/catalog';

const Materials = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-prose py-16 md:py-20">
          <h1 className="font-serif text-4xl md:text-5xl">{t('materials.title')}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t('materials.subtitle')}</p>
        </div>
      </section>

      <div className="container-prose space-y-16 py-16 md:py-20">
        {MATERIALS.map((m, idx) => {
          const examples = PRODUCTS.filter((p) => p.materials.includes(m)).slice(0, 5);
          return (
            <article
              key={m}
              className={`grid items-start gap-10 border-b border-border/60 pb-16 last:border-0 last:pb-0 md:grid-cols-3 ${
                idx % 2 === 1 ? '' : ''
              }`}
            >
              <div className="md:col-span-1">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                  0{idx + 1}
                </p>
                <h2 className="mt-2 font-serif text-3xl">{t(`materials.${m}`)}</h2>
              </div>
              <div className="md:col-span-2">
                <p className="text-foreground/80">{t(`materials.${m}Desc`)}</p>

                <div className="mt-8">
                  <h3 className="mb-3 font-serif text-sm uppercase tracking-widest text-muted-foreground">
                    {t('materials.examples')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {examples.map((p) => (
                      <Link
                        key={p.id}
                        to="/products"
                        className="rounded-sm border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
                      >
                        {t(`products.items.${p.i18nKey}`)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Layout>
  );
};

export default Materials;
