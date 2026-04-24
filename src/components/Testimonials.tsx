import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';

const Testimonials = () => {
  const { t } = useTranslation();
  return (
    <section className="container-prose py-20 md:py-28">
      <div className="mb-12 max-w-2xl">
        <h2 className="font-serif text-3xl md:text-4xl">{t('testimonials.title')}</h2>
        <p className="mt-3 text-muted-foreground">{t('testimonials.subtitle')}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <figure
            key={item.id}
            className="flex flex-col gap-5 rounded-sm border border-border/60 bg-card p-7"
          >
            <Quote className="h-6 w-6 text-accent" />
            <blockquote className="flex-1 font-serif text-lg leading-relaxed text-foreground/90">
              “{t(`testimonials.${item.i18nKey}.quote`)}”
            </blockquote>
            <figcaption className="border-t border-border/60 pt-4">
              <div className="text-sm font-medium text-foreground">
                {t(`testimonials.${item.i18nKey}.name`)}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {t(`testimonials.${item.i18nKey}.role`)}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
