import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { BLOG_CATEGORIES, BLOG_POSTS, BlogCategoryKey } from '@/data/blog';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [tag, setTag] = useState<BlogCategoryKey | 'all'>('all');

  const fmt = (date: string) =>
    new Date(date).toLocaleDateString(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' });

  const filtered = tag === 'all' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.tags.includes(tag));

  return (
    <Layout>
      <Seo
        title={t('seo.blog.title')}
        description={t('seo.blog.description')}
        path="/blog"
      />
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-prose py-16 md:py-20">
          <h1 className="font-serif text-4xl md:text-5xl">{t('blog.title')}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t('blog.subtitle')}</p>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background">
        <div className="container-prose flex flex-wrap items-center gap-3 py-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t('blog.filterBy')}:
          </span>
          {(['all', ...BLOG_CATEGORIES] as const).map((c) => {
            const on = tag === c;
            return (
              <button
                key={c}
                onClick={() => setTag(c)}
                className={`rounded-sm border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                  on
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border bg-background text-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {c === 'all' ? t('blog.allTags') : t(`blog.categories.${c}`)}
              </button>
            );
          })}
        </div>
      </section>

      <div className="container-prose py-16 md:py-20">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">{t('blog.noResults')}</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <article
                key={post.slug}
                className="card-hover group flex flex-col overflow-hidden rounded-sm border border-border/60 bg-card"
              >
                <Link to={`/blog/${post.slug}`} className="block aspect-[4/3] overflow-hidden">
                  <img
                    src={post.cover}
                    alt={t(`blog.posts.${post.i18nKey}.title`)}
                    loading="lazy"
                    width={1280}
                    height={832}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="text-accent">{t(`blog.categories.${post.category}`)}</span>
                    <span>·</span>
                    <span>{fmt(post.date)}</span>
                  </div>
                  <h2 className="mt-3 font-serif text-xl leading-snug">
                    <Link to={`/blog/${post.slug}`} className="gold-underline">
                      {t(`blog.posts.${post.i18nKey}.title`)}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
                    {t(`blog.posts.${post.i18nKey}.excerpt`)}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-foreground hover:text-accent"
                  >
                    {t('blog.readMore')} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
