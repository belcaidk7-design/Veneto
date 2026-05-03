import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import extraction from '@/assets/craft/extraction.jpg';
import cutting from '@/assets/craft/cutting.jpg';
import finishing from '@/assets/craft/finishing.jpg';
import delivery from '@/assets/craft/delivery.jpg';

const STEPS = [
  { key: 'extraction', image: extraction },
  { key: 'cutting', image: cutting },
  { key: 'finishing', image: finishing },
  { key: 'delivery', image: delivery },
];

const Craft = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Seo
        title={t('seo.craft.title')}
        description={t('seo.craft.description')}
        path="/savoir-faire"
        breadcrumbs={[
          { name: t('nav.home'), path: '/' },
          { name: t('nav.craft'), path: '/savoir-faire' },
        ]}
      />
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-prose py-16 md:py-20">
          <h1 className="font-serif text-4xl md:text-5xl">{t('craft.title')}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t('craft.subtitle')}</p>
        </div>
      </section>

      <div className="container-prose space-y-20 py-16 md:py-24">
        {STEPS.map((step, idx) => {
          const reverse = idx % 2 === 1;
          return (
            <article
              key={step.key}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-14"
            >
              <div className={`overflow-hidden rounded-sm ${reverse ? 'md:order-2' : ''}`}>
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={step.image}
                    alt={t(`craft.steps.${step.key}.title`)}
                    loading="lazy"
                    width={1280}
                    height={896}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                  {String(idx + 1).padStart(2, '0')} — {t('craft.step')}
                </p>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl">
                  {t(`craft.steps.${step.key}.title`)}
                </h2>
                <p className="mt-5 text-foreground/85">
                  {t(`craft.steps.${step.key}.body`)}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </Layout>
  );
};

export default Craft;
