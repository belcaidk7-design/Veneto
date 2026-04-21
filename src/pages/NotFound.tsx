import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="container-prose flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="font-serif text-7xl text-accent">404</p>
        <h1 className="mt-4 font-serif text-3xl">{t('notFound.title')}</h1>
        <p className="mt-3 text-muted-foreground">{t('notFound.body')}</p>
        <Button asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/">{t('notFound.cta')}</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
