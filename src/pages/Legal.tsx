import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

const Legal = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Seo
        title={t('seoLegal.title')}
        description={t('seoLegal.description')}
        path="/legal"
        breadcrumbs={[
          { name: t('nav.home'), path: '/' },
          { name: t('legal.title'), path: '/legal' },
        ]}
      />
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-prose py-16 md:py-20">
          <h1 className="font-serif text-4xl md:text-5xl">{t('legal.title')}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t('legal.subtitle')}</p>
        </div>
      </section>

      <section className="container-prose py-16 md:py-20">
        <div className="max-w-3xl space-y-10 text-sm leading-relaxed">
          <div>
            <h2 className="font-serif text-2xl">{t('legal.editorTitle')}</h2>
            <div className="mt-4 space-y-1 text-muted-foreground">
              <p><span className="text-foreground">ARKYBIOX EOOD</span></p>
              <p>Ulitsa Georgi Dimitrov 1, 3129 Darmantsi, Bulgaria</p>
              <p>VAT: BG207398758</p>
              <p>
                Email: <a href="mailto:info@hq-stones.com" className="text-accent hover:underline">info@hq-stones.com</a>
              </p>
              <p>
                Tel: <a href="tel:+393294432741" className="text-accent hover:underline">+39 329 443 2741</a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl">{t('legal.hostTitle')}</h2>
            <p className="mt-4 text-muted-foreground">{t('legal.hostBody')}</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl">{t('legal.dataTitle')}</h2>
            <div className="mt-4 space-y-3 text-muted-foreground">
              <p>{t('legal.dataCollect')}</p>
              <p>{t('legal.dataRetention')}</p>
              <p>{t('legal.dataRights')}</p>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl">{t('legal.cookiesTitle')}</h2>
            <p className="mt-4 text-muted-foreground">{t('legal.cookiesBody')}</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl">{t('legal.ipTitle')}</h2>
            <p className="mt-4 text-muted-foreground">{t('legal.ipBody')}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Legal;
