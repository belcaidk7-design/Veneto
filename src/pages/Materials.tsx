import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { MATERIALS, PRODUCTS } from '@/data/catalog';

const Materials = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Seo
        title={t('seo.materials.title')}
        description={t('seo.materials.description')}
        path="/materials"
      />
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-prose py-16 md:py-20">
          <h1 className="font-serif text-4xl md:text-5xl">{t('materials.title')}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t('materials.subtitle')}</p>
        </div>
      </section>

      <div className="container-prose space-y-20 py-16 md:py-24">
        {MATERIALS.map((m, idx) => {
          const examples = PRODUCTS.filter((p) => p.materials.includes(m)).slice(0, 4);
          const heroImage = examples[0]?.image;
          const reverse = idx % 2 === 1;

          return (
            <article
              key={m}
              className="grid items-center gap-10 border-b border-border/60 pb-20 last:border-0 last:pb-0 md:grid-cols-2 md:gap-14"
            >
              <div className={`overflow-hidden rounded-sm ${reverse ? 'md:order-2' : ''}`}>
                {heroImage && (
                  <Link
                    to={`/products?material=${m}`}
                    className="group block aspect-[4/5] overflow-hidden"
                    aria-label={t(`materials.${m}`)}
                  >
                    <img
                      src={heroImage}
                      alt={t(`materials.${m}`)}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                )}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                  0{idx + 1} — {t('materials.title')}
                </p>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl">{t(`materials.${m}`)}</h2>
                <p className="mt-5 text-foreground/80">{t(`materials.${m}Desc`)}</p>

                <div className="mt-8">
                  <h3 className="mb-4 font-serif text-xs uppercase tracking-widest text-muted-foreground">
                    {t('materials.examples')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {examples.map((p) => (
                      <Link
                        key={p.id}
                        to={`/products/${p.id}`}
                        className="card-hover group block overflow-hidden rounded-sm border border-border/60"
                      >
                        <div className="aspect-square overflow-hidden bg-secondary">
                          <img
                            src={p.image}
                            alt={t(`products.items.${p.i18nKey}`)}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-2">
                          <p className="truncate text-xs font-medium text-foreground/85">
                            {t(`products.items.${p.i18nKey}`)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/products?material=${m}`}
                  className="mt-7 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-foreground hover:text-accent"
                >
                  {t('materials.seeAll')} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </Layout>
  );
};

export default Materials;
