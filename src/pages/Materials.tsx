import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import Reveal from '@/components/Reveal';
import { MATERIALS, PRODUCTS, FINISHES } from '@/data/catalog';

const Materials = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Seo
        title={t('seo.materials.title')}
        description={t('seo.materials.description')}
        path="/materials"
        breadcrumbs={[
          { name: t('nav.home'), path: '/' },
          { name: t('nav.materials'), path: '/materials' },
        ]}
      />
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-prose py-16 md:py-20">
          <Reveal>
            <h1 className="font-serif text-4xl md:text-5xl">{t('materials.title')}</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">{t('materials.subtitle')}</p>
          </Reveal>

          {/* Quick nav */}
          <Reveal delay={100}>
            <nav className="mt-8 flex flex-wrap gap-2">
              {MATERIALS.map((m) => (
                <a
                  key={m}
                  href={`#${m}`}
                  className="rounded-sm border border-foreground/20 bg-background px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors hover:border-accent hover:text-accent"
                >
                  {t(`materials.${m}`)}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      <div className="container-prose space-y-24 py-16 md:py-24">
        {MATERIALS.map((m, idx) => {
          const examples = PRODUCTS.filter((p) => p.materials.includes(m)).slice(0, 4);
          const heroImage = examples[0]?.image;
          const reverse = idx % 2 === 1;
          const uses = t(`materials.uses.${m}`, { returnObjects: true }) as string[];
          // Recommend all finishes that appear on at least one product of this material
          const recFinishes = Array.from(
            new Set(
              PRODUCTS.filter((p) => p.materials.includes(m)).flatMap((p) => p.recommendedFinishes),
            ),
          ).filter((f) => FINISHES.includes(f));

          return (
            <article
              key={m}
              id={m}
              className="grid scroll-mt-24 items-start gap-10 border-b border-border/60 pb-24 last:border-0 last:pb-0 md:grid-cols-2 md:gap-14"
            >
              <Reveal className={reverse ? 'md:order-2' : ''}>
                <div className="overflow-hidden rounded-sm">
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
              </Reveal>

              <Reveal delay={120}>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                  0{idx + 1} · {t('materials.title')}
                </p>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl">{t(`materials.${m}`)}</h2>
                <p className="mt-5 leading-relaxed text-foreground/85">
                  {t(`materials.${m}Desc`)}
                </p>

                {/* Typical uses */}
                <div className="mt-8">
                  <h3 className="mb-3 font-serif text-xs uppercase tracking-widest text-muted-foreground">
                    {t('materials.typicalUses')}
                  </h3>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {uses.map((u) => (
                      <li key={u} className="flex items-start gap-2 text-sm text-foreground/85">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended finishes */}
                {recFinishes.length > 0 && (
                  <div className="mt-7">
                    <h3 className="mb-3 font-serif text-xs uppercase tracking-widest text-muted-foreground">
                      {t('materials.finishesTitle')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recFinishes.map((f) => (
                        <span
                          key={f}
                          className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs uppercase tracking-wider text-foreground/80"
                        >
                          {t(`finishes.${f}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Care */}
                <div className="mt-7 rounded-sm border-l-2 border-accent bg-secondary/50 p-5">
                  <h3 className="mb-2 font-serif text-xs uppercase tracking-widest text-accent">
                    {t('materials.careTitle')}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {t(`materials.care.${m}`)}
                  </p>
                </div>

                {/* Examples */}
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
              </Reveal>
            </article>
          );
        })}
      </div>

      {/* Final CTA */}
      <section className="bg-foreground py-16 text-background md:py-20">
        <div className="container-prose text-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl">{t('home.finalCtaTitle')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-background/80">{t('home.finalCtaBody')}</p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-7 py-3 text-sm font-medium uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90"
            >
              {t('home.finalCtaButton')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Materials;
