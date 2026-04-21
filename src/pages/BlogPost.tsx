import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { BLOG_POSTS } from '@/data/blog';

const BlogPost = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Layout>
        <div className="container-prose py-32 text-center">
          <h1 className="font-serif text-3xl">404</h1>
          <Link to="/blog" className="mt-4 inline-block text-accent">
            {t('blog.backToBlog')}
          </Link>
        </div>
      </Layout>
    );
  }

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' });

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const body = t(`blog.posts.${post.i18nKey}.body`) as string;

  return (
    <Layout>
      <article>
        <div className="relative h-[55vh] min-h-[360px] w-full overflow-hidden">
          <img
            src={post.cover}
            alt={t(`blog.posts.${post.i18nKey}.title`)}
            width={1280}
            height={832}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
          <div className="container-prose absolute inset-x-0 bottom-0 pb-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-background/80 hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {t('blog.backToBlog')}
            </Link>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              {t(`blog.categories.${post.category}`)}
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-3xl text-background md:text-5xl">
              {t(`blog.posts.${post.i18nKey}.title`)}
            </h1>
            <p className="mt-4 text-sm text-background/80">
              {t('blog.by')} {t(`blog.posts.${post.i18nKey}.author`)} · {fmt(post.date)}
            </p>
          </div>
        </div>

        <div className="container-prose py-16 md:py-20">
          <div className="prose-stone mx-auto max-w-2xl space-y-5 text-lg leading-relaxed text-foreground/90">
            {body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-border/60 bg-secondary/40 py-16">
        <div className="container-prose">
          <h2 className="mb-8 font-serif text-2xl">{t('blog.relatedTitle')}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="card-hover group flex gap-4 overflow-hidden rounded-sm border border-border/60 bg-background p-3"
              >
                <div className="aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-sm sm:w-40">
                  <img
                    src={p.cover}
                    alt={t(`blog.posts.${p.i18nKey}.title`)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-xs uppercase tracking-widest text-accent">
                    {t(`blog.categories.${p.category}`)}
                  </p>
                  <h3 className="mt-1.5 font-serif text-lg">{t(`blog.posts.${p.i18nKey}.title`)}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-foreground/70 group-hover:text-accent">
                    {t('blog.readMore')} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
