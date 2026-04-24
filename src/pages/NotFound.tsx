import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import heroMarble from '@/assets/hero-marble.jpg';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Seo title={t('notFound.title')} description={t('notFound.body')} path="/404" />
      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
        <img
          src={heroMarble}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-foreground/75" />
        <div className="container-prose py-24 text-center text-background">
          <p className="font-serif text-7xl text-accent md:text-8xl">404</p>
          <h1 className="mt-4 font-serif text-3xl md:text-4xl">{t('notFound.title')}</h1>
          <p className="mt-3 text-background/80">{t('notFound.body')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/">{t('notFound.cta')}</Link>
            </Button>
            <Button asChild variant="outline" className="border-background/40 bg-transparent text-background hover:bg-background hover:text-foreground">
              <Link to="/products">{t('nav.products')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
