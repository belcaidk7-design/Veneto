import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Award, Compass, Hammer, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import aboutImg from '@/assets/about-team.jpg';

const About = () => {
  const { t } = useTranslation();

  const values = [
    { icon: Award, title: t('about.valueQuality'), desc: t('about.valueQualityDesc') },
    { icon: Compass, title: t('about.valueExpertise'), desc: t('about.valueExpertiseDesc') },
    { icon: Hammer, title: t('about.valueCustom'), desc: t('about.valueCustomDesc') },
  ];

  return (
    <Layout>
      <Seo
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        path="/about"
      />
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-prose py-16 md:py-20">
          <h1 className="font-serif text-4xl md:text-5xl">{t('about.title')}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t('about.subtitle')}</p>
        </div>
      </section>

      <section className="container-prose grid items-start gap-12 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h2 className="font-serif text-3xl">{t('about.storyTitle')}</h2>
          <div className="mt-6 space-y-4 text-foreground/85">
            {(t('about.storyBody') as string).split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <Button
            asChild
            variant="outline"
            className="mt-8 border-foreground text-foreground hover:bg-foreground hover:text-background"
          >
            <Link to="/savoir-faire">
              {t('about.craftCta')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-sm">
          <img
            src={aboutImg}
            alt="HQ Stones workshop"
            loading="lazy"
            width={1280}
            height={896}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-foreground py-20 text-background">
        <div className="container-prose">
          <h2 className="font-serif text-3xl">{t('about.valuesTitle')}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="border-t border-accent/40 pt-6">
                <v.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 font-serif text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-background/75">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
