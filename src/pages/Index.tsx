import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CATEGORIES, MATERIALS } from '@/data/catalog';
import heroMarble from '@/assets/hero-marble.jpg';
import exteriorImg from '@/assets/category-exterior.jpg';
import interiorImg from '@/assets/category-interior.jpg';
import slabsImg from '@/assets/category-slabs.jpg';

const CATEGORY_IMAGES: Record<string, string> = {
  exterior: exteriorImg,
  interior: interiorImg,
  slabs: slabsImg,
};

const Index = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden">
        <img
          src={heroMarble}
          alt="Calacatta marble"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        <div className="container-prose py-24 md:py-32">
          <div className="max-w-2xl animate-fade-in">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Italia
            </p>
            <h1 className="font-serif text-4xl leading-tight text-background sm:text-5xl md:text-6xl">
              {t('hero.headline')}
            </h1>
            <p className="mt-6 text-lg text-background/85">{t('hero.subline')}</p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link to="/products">
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-prose py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl">{t('home.categoriesTitle')}</h2>
          <p className="mt-3 text-muted-foreground">{t('home.categoriesSubtitle')}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to="/products"
              className="card-hover group relative block aspect-[4/5] overflow-hidden rounded-sm"
            >
              <img
                src={CATEGORY_IMAGES[cat]}
                alt={t(`categories.${cat}`)}
                loading="lazy"
                width={1280}
                height={896}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-background">
                <h3 className="font-serif text-2xl">{t(`categories.${cat}`)}</h3>
                <p className="mt-2 text-sm text-background/85">{t(`categories.${cat}Desc`)}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-accent">
                  {t('hero.cta')} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Materials strip */}
      <section className="bg-secondary/60 py-20 md:py-28">
        <div className="container-prose">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl">{t('home.materialsTitle')}</h2>
            <p className="mt-3 text-muted-foreground">{t('home.materialsSubtitle')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {MATERIALS.map((m) => (
              <Link
                key={m}
                to="/materials"
                className="rounded-sm border border-foreground/20 bg-background px-5 py-2.5 text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {t(`materials.${m}`)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="container-prose py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">{t('home.aboutTitle')}</h2>
            <p className="mt-4 text-muted-foreground">{t('home.aboutBody')}</p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="mt-8 border-foreground text-foreground hover:bg-foreground hover:text-background"
            >
              <Link to="/contact">{t('home.aboutCta')}</Link>
            </Button>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-sm">
            <img
              src={interiorImg}
              alt="Interior"
              loading="lazy"
              width={1280}
              height={896}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
