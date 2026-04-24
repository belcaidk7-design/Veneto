import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import Lightbox from '@/components/Lightbox';
import QuoteModal from '@/components/QuoteModal';
import { Button } from '@/components/ui/button';
import { FINISHES, getProductBySlug, getRelatedProducts } from '@/data/catalog';

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

  return (
    <Layout>
      <Seo
        title={name}
        description={t('productDetail.metaDescription', { name })}
        path={`/products/${product.id}`}
        image={product.image}
      />

      <div className="container-prose pt-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {t('nav.products')}
        </Link>
      </div>

      <article className="container-prose grid gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-14">
        <button
          onClick={() => setLightbox(true)}
          className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary"
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

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            {t(`categories.${product.category}`)}
          </p>
          <h1 className="mt-3 font-serif text-3xl md:text-5xl">{name}</h1>

          <p className="mt-6 text-foreground/85">
            {t('productDetail.description', { name, defaultValue: t(`categories.${product.category}Desc`) })}
          </p>

          <div className="mt-8">
            <h2 className="mb-3 font-serif text-xs uppercase tracking-widest text-muted-foreground">
              {t('productDetail.materials')}
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
              {t('productDetail.finishes')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {FINISHES.map((f) => (
                <span
                  key={f}
                  className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs uppercase tracking-wider text-foreground/80"
                >
                  {t(`finishes.${f}`)}
                </span>
              ))}
            </div>
          </div>

          <Button
            size="lg"
            onClick={() => setQuoteOpen(true)}
            className="mt-10 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {t('products.requestQuote')}
          </Button>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border/60 bg-secondary/40 py-16">
          <div className="container-prose">
            <h2 className="mb-8 font-serif text-2xl">{t('productDetail.related')}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="card-hover group flex flex-col overflow-hidden rounded-sm border border-border/60 bg-card"
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
