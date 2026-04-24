import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { PROJECTS, PROJECT_TYPES, ProjectType } from '@/data/projects';

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<ProjectType | 'all'>('all');

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  return (
    <Layout>
      <Seo
        title={t('seo.projects.title')}
        description={t('seo.projects.description')}
        path="/projects"
      />
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-prose py-16 md:py-20">
          <h1 className="font-serif text-4xl md:text-5xl">{t('projects.title')}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t('projects.subtitle')}</p>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background">
        <div className="container-prose flex flex-wrap items-center gap-3 py-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t('projects.filterBy')}:
          </span>
          {(['all', ...PROJECT_TYPES] as const).map((type) => {
            const on = filter === type;
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`rounded-sm border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                  on
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border bg-background text-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {t(`projects.types.${type}`)}
              </button>
            );
          })}
        </div>
      </section>

      <div className="container-prose py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="card-hover group flex flex-col overflow-hidden rounded-sm border border-border/60 bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={p.image}
                  alt={t(`projects.items.${p.i18nKey}.title`)}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                  {t(`projects.types.${p.type}`)}
                </p>
                <h2 className="font-serif text-xl">{t(`projects.items.${p.i18nKey}.title`)}</h2>
                <p className="text-sm text-muted-foreground">
                  {t(`projects.items.${p.i18nKey}.location`)}
                </p>
                <p className="flex-1 text-sm text-foreground/80">
                  {t(`projects.items.${p.i18nKey}.description`)}
                </p>
                <div className="flex flex-wrap gap-1.5 border-t border-border/60 pt-4">
                  {p.materials.map((m) => (
                    <span
                      key={m}
                      className="inline-block rounded-sm border border-accent/40 bg-accent/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent"
                    >
                      {t(`materials.${m}`)}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
