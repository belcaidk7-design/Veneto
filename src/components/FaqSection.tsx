import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqSectionProps {
  /** i18n namespace under `faq`, e.g. "contact" or "products" */
  namespace: string;
  /** Item keys, must match `faq.<namespace>.items.<key>` */
  itemKeys: string[];
}

export const buildFaqJsonLd = (
  t: (k: string) => string,
  namespace: string,
  itemKeys: string[],
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: itemKeys.map((k) => ({
    '@type': 'Question',
    name: t(`faq.${namespace}.items.${k}.q`),
    acceptedAnswer: {
      '@type': 'Answer',
      text: t(`faq.${namespace}.items.${k}.a`),
    },
  })),
});

const FaqSection = ({ namespace, itemKeys }: FaqSectionProps) => {
  const { t } = useTranslation();
  return (
    <section className="border-t border-border/60 bg-secondary/30">
      <div className="container-prose py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl">
            {t(`faq.${namespace}.title`)}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(`faq.${namespace}.subtitle`)}
          </p>
          <Accordion type="single" collapsible className="mt-8 w-full">
            {itemKeys.map((k) => (
              <AccordionItem key={k} value={k}>
                <AccordionTrigger className="text-left font-serif text-lg">
                  {t(`faq.${namespace}.items.${k}.q`)}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80">
                  {t(`faq.${namespace}.items.${k}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
