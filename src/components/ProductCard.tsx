import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import QuoteModal from './QuoteModal';
import { Product } from '@/data/catalog';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const name = t(`products.items.${product.i18nKey}`);

  return (
    <>
      <article className="card-hover group flex flex-col overflow-hidden rounded-sm border border-border/60 bg-card">
        <Link
          to={`/products/${product.id}`}
          className="relative block aspect-[4/3] overflow-hidden bg-secondary"
          aria-label={name}
        >
          {!loaded && <Skeleton className="absolute inset-0 h-full w-full rounded-none" />}
          <img
            src={product.image}
            alt={name}
            loading="lazy"
            width={800}
            height={600}
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
        </Link>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap gap-1.5">
            {product.materials.map((m) => (
              <span
                key={m}
                className="inline-block rounded-sm border border-accent/40 bg-accent/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent"
              >
                {t(`materials.${m}`)}
              </span>
            ))}
          </div>
          <h3 className="font-serif text-lg leading-tight text-foreground">
            <Link to={`/products/${product.id}`} className="gold-underline">
              {name}
            </Link>
          </h3>
          <div className="mt-auto pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(true)}
              className="w-full border-foreground/80 text-foreground hover:bg-foreground hover:text-background"
            >
              {t('products.requestQuote')}
            </Button>
          </div>
        </div>
      </article>

      <QuoteModal open={open} onOpenChange={setOpen} productLabel={name} productCategory={product.category} />
    </>
  );
};

export default ProductCard;
