import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Download, Mountain, Hammer, Sparkles, Truck, MapPin, Hand, Compass, Boxes, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import Reveal from '@/components/Reveal';
import Testimonials from '@/components/Testimonials';
import { Button } from '@/components/ui/button';
import { CATEGORIES, MATERIALS } from '@/data/catalog';
import { PROJECTS } from '@/data/projects';
import heroMarble from '@/assets/hero-marble.jpg';
import exteriorImg from '@/assets/category-exterior.jpg';
import interiorImg from '@/assets/category-interior.jpg';
import slabsImg from '@/assets/category-slabs.jpg';

const CATEGORY_IMAGES: Record<string, string> = {
  exterior: exteriorImg,
  interior: interiorImg,
  slabs: slabsImg,
};

const WHY_ITEMS = [
  { key: 'origin', Icon: MapPin },
  { key: 'custom', Icon: Hand },
  { key: 'advice', Icon: Compass },
  { key: 'logistics', Icon: Boxes },
] as const;

const CRAFT_STEPS = [
  { key: 'extraction', Icon: Mountain },
  { key: 'cutting', Icon: Hammer },
  { key: 'finishing', Icon: Sparkles },
  { key: 'delivery', Icon: Truck },
] as const;

const Index = () => {
  const { t } = useTranslation();
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <Layout>
      <Seo
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        path="/"
        image={heroMarble}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'HQ Stones',
          description: t('seo.home.description'),
          areaServed: 'Italy',
          address: { '@type': 'PostalAddress', addressCountry: 'IT' },
        }}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
        <img
          src={heroMarble}
          alt="Calacatta marble"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-foreground/75 via-foreground/45 to-transparent" />
        <div className="container-prose py-24 md:py-32">
          <div className="max-w-2xl animate-fade-in">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              {t('hero.eyebrow')}
            </p>
            <h1 className="font-serif text-4xl leading-tight text-background sm:text-5xl md:text-6xl">
              {t('hero.headline')}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-background/85">{t('hero.subline')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/products">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/40 bg-transparent text-background hover:bg-background hover:text-foreground"
              >
                <a href="/catalogue.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  {t('hero.downloadCta')}
                </a>
              </Button>
            </div>
            <p className="mt-8 text-xs uppercase tracking-widest text-background/70">
              {t('hero.reassurance')}
            </p>
          </div>
        </div>
      </section>

      {/* Why HQ Stones */}
      <section className="container-prose py-20 md:py-28">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl">{t('home.whyTitle')}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t('home.whySubtitle')}</p>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_ITEMS.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={i * 80}>
              <div className="card-hover flex h-full flex-col gap-4 rounded-sm border border-border/60 bg-card p-7">
                <Icon className="h-7 w-7 text-accent" />
                <h3 className="font-serif text-lg">{t(`home.why.${key}.title`)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`home.why.${key}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container-prose">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl">{t('home.categoriesTitle')}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t('home.categoriesSubtitle')}</p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat} delay={i * 100}>
                <Link
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
                    <p className="mt-2 text-sm leading-relaxed text-background/85">
                      {t(`categories.${cat}Desc`)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-accent">
                      {t('hero.cta')} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Materials strip */}
      <section className="container-prose py-20 md:py-28">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl">{t('home.materialsTitle')}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t('home.materialsSubtitle')}</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex flex-wrap gap-3">
            {MATERIALS.map((m) => (
              <Link
                key={m}
                to={`/products?material=${m}`}
                className="rounded-sm border border-foreground/20 bg-background px-5 py-2.5 text-sm font-medium uppercase tracking-wider text-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                {t(`materials.${m}`)}
              </Link>
            ))}
            <Link
              to="/materials"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-accent hover:underline"
            >
              {t('materials.title')} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Craft teaser */}
      <section className="bg-foreground py-20 text-background md:py-28">
        <div className="container-prose">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl">{t('home.craftTeaserTitle')}</h2>
              <p className="mt-3 leading-relaxed text-background/75">
                {t('home.craftTeaserSubtitle')}
              </p>
            </div>
          </Reveal>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CRAFT_STEPS.map(({ key, Icon }, i) => (
              <Reveal key={key} delay={i * 100} as="li">
                <div className="flex h-full flex-col gap-4 border-l-2 border-accent/60 bg-background/5 p-6">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-2xl text-accent">0{i + 1}</span>
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl">{t(`craft.steps.${key}.title`)}</h3>
                  <p className="text-sm leading-relaxed text-background/75">
                    {t(`craft.steps.${key}.body`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={400}>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/40 bg-transparent text-background hover:bg-background hover:text-foreground"
              >
                <Link to="/craft">
                  {t('home.craftTeaserCta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projects teaser */}
      <section className="container-prose py-20 md:py-28">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl">{t('home.projectsTeaserTitle')}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {t('home.projectsTeaserSubtitle')}
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-foreground hover:text-accent"
            >
              {t('home.projectsTeaserCta')} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <Link
                to="/projects"
                className="card-hover group block overflow-hidden rounded-sm border border-border/60 bg-card"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={p.image}
                    alt={t(`projects.items.${p.i18nKey}.title`)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest text-accent">
                    {t(`projects.types.${p.type}`)}
                  </p>
                  <h3 className="mt-2 font-serif text-lg">
                    {t(`projects.items.${p.i18nKey}.title`)}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {t(`projects.items.${p.i18nKey}.location`)}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <div className="bg-secondary/30">
        <Testimonials />
      </div>

      {/* About teaser */}
      <section className="container-prose py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl">{t('home.aboutTitle')}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t('home.aboutBody')}</p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="mt-8 border-foreground text-foreground hover:bg-foreground hover:text-background"
            >
              <Link to="/contact">{t('home.aboutCta')}</Link>
            </Button>
          </Reveal>
          <Reveal delay={120}>
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
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-foreground py-20 text-background md:py-24">
        <div className="container-prose grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-5xl">{t('home.finalCtaTitle')}</h2>
            <p className="mt-4 max-w-xl text-background/80">{t('home.finalCtaBody')}</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/contact">
                  {t('home.finalCtaButton')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-xs uppercase tracking-widest text-background/70">
                {t('home.finalCtaCall')}
              </p>
              <a
                href="tel:+390000000000"
                className="inline-flex items-center gap-2 text-background hover:text-accent"
              >
                <Phone className="h-4 w-4" />
                +39 000 000 0000
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
