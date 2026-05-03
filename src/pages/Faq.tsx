import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ_KEYS = [
  'samples',
  'delivery',
  'leadTime',
  'maintenance',
  'finishes',
  'warranty',
  'minimumOrder',
  'installation',
  'pricing',
  'custom',
];

const Faq = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Seo
        title={t('seo.faq.title')}
        description={t('seo.faq.description')}
        path="/faq"
        breadcrumbs={[
          { name: t('nav.home'), path: '/' },
          { name: t('nav.faq'), path: '/faq' },
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_KEYS.map((k) => ({
            '@type': 'Question',
            name: t(`faq.items.${k}.q`),
            acceptedAnswer: { '@type': 'Answer', text: t(`faq.items.${k}.a`) },
          })),
        }}
      />
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-prose py-16 md:py-20">
          <h1 className="font-serif text-4xl md:text-5xl">{t('faq.title')}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t('faq.subtitle')}</p>
        </div>
      </section>

      <div className="container-prose py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_KEYS.map((k) => (
              <AccordionItem key={k} value={k}>
                <AccordionTrigger className="text-left font-serif text-lg">
                  {t(`faq.items.${k}.q`)}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80">
                  {t(`faq.items.${k}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
