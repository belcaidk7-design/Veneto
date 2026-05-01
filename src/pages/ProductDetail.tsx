import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Sparkles,
  Hammer,
  Ruler,
  Mail,
  MapPin,
  Award,
  CheckCircle2,
} from 'lucide-react';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import Reveal from '@/components/Reveal';
import Lightbox from '@/components/Lightbox';
import QuoteModal from '@/components/QuoteModal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { getProductBySlug, getRelatedProducts } from '@/data/catalog';

const BENEFIT_ICONS = {
  durability: Sparkles,
  aesthetic: Hammer,
  custom: Ruler,
} as const;

const FAQ_KEYS = ['leadTime', 'sample', 'install', 'pricing'] as const;

const ProductDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const product = getProductBySlug(slug);
  const [lightbox, setLightbox] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  if (!product) {
    return (
      <Layout>
        <Seo title={t('notFound.title')} description={t('notFound.body')} path={`/products/${slug ?? ''}`} />
        <div className="container-prose py-32 text-center">
          <h1 className="font-serif text-3xl">404</h1>
          <Link to="/products" className="mt-4 inline-block text-accent">
            ← {t('nav.products')}
          </Link>
        </div>
      </Layout>
    );
  }

  const name = t(`products.items.${product.i18nKey}`);
  const related = getRelatedProducts(product, 3);
  const categoryLabel = t(`categories.${product.category}`);

  return (
    <Layout>
      <Seo
        title={name}
        description={t('productDetail.metaDescription', { name })}
        path={`/products/${product.id}`}
        image={product.image}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name,
          image: product.image,
          description: t('productDetail.description', { name }),
          category: categoryLabel,
          brand: { '@type': 'Brand', name: 'HQ Stones' },
        }}
      />

      {/* Breadcrumb */}
      <div className="container-prose pt-8">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-accent">{t('productDetail.breadcrumb.home')}</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-accent">{t('productDetail.breadcrumb.products')}</Link>
          <span>/</span>
          <span className="text-foreground/80">{name}</span>
        </nav>
        <Link
          to="/products"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {t('nav.products')}
        </Link>
      </div>

      {/* Hero product */}
      <article className="container-prose grid gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-14">
        <Reveal>
          <button
            onClick={() => setLightbox(true)}
            className="group relative block aspect-[4/5] w-full overflow-hidden rounded-sm bg-secondary"
            aria-label={t('productDetail.zoom')}
          >
            <img
              src={product.image}
              alt={name}
              width={1024}
              height={1280}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 transition-opacity group-hover:opacity-100">
              <Maximize2 className="h-4 w-4" />
            </span>
          </button>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">{categoryLabel}</p>
          <h1 className="mt-3 font-serif text-3xl md:text-5xl">{name}</h1>

          <p className="mt-6 text-foreground/85 leading-relaxed">
            {t('productDetail.description', { name })}
          </p>

          <div className="mt-8">
            <h2 className="mb-3 font-serif text-xs uppercase tracking-widest text-muted-foreground">
              {t('productDetail.materialsTitle')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((m) => (
                <Link
                  key={m}
                  to={`/products?material=${m}`}
                  className="rounded-sm border border-accent/40 bg-accent/5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {t(`materials.${m}`)}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-3 font-serif text-xs uppercase tracking-widest text-muted-foreground">
              {t('productDetail.formatsTitle')}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {product.formats.map((f) => (
                <li
                  key={f}
                  className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs uppercase tracking-wider text-foreground/80"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <Button
            size="lg"
            onClick={() => setQuoteOpen(true)}
            className="mt-10 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {t('products.requestQuote')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Reveal>
      </article>

      {/* Benefits */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container-prose">
          <Reveal>
            <h2 className="font-serif text-2xl md:text-3xl">{t('productDetail.benefitsTitle')}</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {(Object.keys(BENEFIT_ICONS) as Array<keyof typeof BENEFIT_ICONS>).map((key, i) => {
              const Icon = BENEFIT_ICONS[key];
              return (
                <Reveal key={key} delay={i * 100}>
                  <div className="flex h-full flex-col gap-4 rounded-sm border border-border/60 bg-card p-7">
                    <Icon className="h-7 w-7 text-accent" />
                    <h3 className="font-serif text-xl">
                      {t(`productDetail.benefits.${key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`productDetail.benefits.${key}.body`)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recommended finishes (per product) */}
      <section className="container-prose py-16 md:py-20">
        <Reveal>
          <h2 className="font-serif text-2xl md:text-3xl">{t('productDetail.finishesTitle')}</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {product.recommendedFinishes.map((f, i) => (
            <Reveal key={f} delay={i * 70}>
              <div className="h-full rounded-sm border border-border/60 bg-card p-6">
                <h3 className="font-serif text-lg">{t(`finishes.${f}`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`finishes.${f}Desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Uses + Care for the materials of this product */}
      <section className="bg-secondary/40 py-16 md:py-20">
        <div className="container-prose grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-2xl md:text-3xl">{t('productDetail.usesTitle')}</h2>
            <ul className="mt-6 space-y-3">
              {product.materials.flatMap((m) => {
                const list = t(`materials.uses.${m}`, { returnObjects: true }) as string[];
                return list.slice(0, 3).map((use, idx) => (
                  <li key={`${m}-${idx}`} className="flex items-start gap-3 text-sm text-foreground/85">
                    <span className="mt-2 h-1 w-3 flex-shrink-0 bg-accent" />
                    <span>
                      <span className="font-medium">{t(`materials.${m}`)} :</span> {use}
                    </span>
                  </li>
                ));
              })}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="font-serif text-2xl md:text-3xl">{t('productDetail.careTitle')}</h2>
            <div className="mt-6 space-y-5">
              {product.materials.map((m) => (
                <div key={m}>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {t(`materials.${m}`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`materials.care.${m}`)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-prose py-16 md:py-20">
        <Reveal>
          <h2 className="font-serif text-2xl md:text-3xl">{t('productDetail.faqTitle')}</h2>
        </Reveal>
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="mt-8">
            {FAQ_KEYS.map((key) => (
              <AccordionItem key={key} value={key} className="border-border/60">
                <AccordionTrigger className="text-left font-serif text-base hover:text-accent">
                  {t(`productDetail.productFaq.${key}.q`)}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {t(`productDetail.productFaq.${key}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="bg-foreground py-16 text-background md:py-20">
        <div className="container-prose grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl">{t('productDetail.quoteCtaTitle')}</h2>
            <p className="mt-4 max-w-xl text-background/80">{t('productDetail.quoteCtaBody')}</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                onClick={() => setQuoteOpen(true)}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {t('products.requestQuote')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/40 bg-transparent text-background hover:bg-background hover:text-foreground"
              >
                <Link to="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  {t('nav.contact')}
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border/60 bg-secondary/40 py-16">
          <div className="container-prose">
            <Reveal>
              <h2 className="mb-8 font-serif text-2xl">{t('productDetail.relatedTitle')}</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <Link
                    to={`/products/${p.id}`}
                    className="card-hover group flex h-full flex-col overflow-hidden rounded-sm border border-border/60 bg-card"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-secondary">
                      <img
                        src={p.image}
                        alt={t(`products.items.${p.i18nKey}`)}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <h3 className="font-serif text-base">{t(`products.items.${p.i18nKey}`)}</h3>
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Lightbox src={product.image} alt={name} open={lightbox} onClose={() => setLightbox(false)} />
      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        productLabel={name}
        productCategory={product.category}
      />
    </Layout>
  );
};

export default ProductDetail;
