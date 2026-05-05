import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { BLOG_POSTS, BLOG_AUTHORS, getRelatedPosts } from '@/data/blog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const BlogPost = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Layout>
        <Seo title={t('notFound.title')} description={t('notFound.body')} path={`/blog/${slug ?? ''}`} />
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

  const related = getRelatedPosts(post, 3);
  const title = t(`blog.posts.${post.i18nKey}.title`);
  const excerpt = t(`blog.posts.${post.i18nKey}.excerpt`);
  const body = t(`blog.posts.${post.i18nKey}.body`) as string;
  const faqItems = (t(`blog.posts.${post.i18nKey}.faq`, { returnObjects: true, defaultValue: [] }) as Array<{ q: string; a: string }>) || [];
  const sources = (t(`blog.posts.${post.i18nKey}.sources`, { returnObjects: true, defaultValue: [] }) as Array<{ label: string; url: string }>) || [];
  const author = BLOG_AUTHORS[post.authorKey];
  const authorRole = t(`blog.authors.${author.key}.role`);
  const authorBio = t(`blog.authors.${author.key}.bio`);
  const wordCount = body.trim().split(/\s+/).length;

  // Parse body into blocks (h2/h3/paragraph) from markdown-ish ## / ###
  const blocks = body.split('\n\n').map((raw, i) => {
    const trimmed = raw.trim();
    if (trimmed.startsWith('### ')) {
      return { type: 'h3' as const, text: trimmed.slice(4), key: i };
    }
    if (trimmed.startsWith('## ')) {
      return { type: 'h2' as const, text: trimmed.slice(3), key: i };
    }
    return { type: 'p' as const, text: trimmed, key: i };
  });

  const jsonLdGraph: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: excerpt,
      image: post.cover,
      datePublished: post.date,
      dateModified: post.updated,
      inLanguage: i18n.language,
      articleSection: t(`blog.categories.${post.category}`),
      wordCount,
      timeRequired: `PT${post.readingTimeMin}M`,
      author: {
        '@type': 'Person',
        name: author.name,
        jobTitle: authorRole,
        description: authorBio,
        url: author.url,
        ...(author.sameAs && author.sameAs.length ? { sameAs: author.sameAs } : {}),
        worksFor: { '@type': 'Organization', name: 'HQ Stones' },
      },
      publisher: {
        '@type': 'Organization',
        name: 'HQ Stones',
        logo: { '@type': 'ImageObject', url: '/favicon.ico' },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `/blog/${post.slug}` },
    },
  ];
  if (faqItems.length > 0) {
    jsonLdGraph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: it.a },
      })),
    });
  }

  return (
    <Layout>
      <Seo
        title={title}
        description={excerpt}
        path={`/blog/${post.slug}`}
        image={post.cover}
        type="article"
        breadcrumbs={[
          { name: t('nav.home'), path: '/' },
          { name: t('nav.blog'), path: '/blog' },
          { name: title, path: `/blog/${post.slug}` },
        ]}
        jsonLd={jsonLdGraph}
      />

      <article>
        <div className="relative h-[55vh] min-h-[360px] w-full overflow-hidden">
          <img
            src={post.cover}
            alt={title}
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
              {title}
            </h1>
            <p className="mt-4 text-sm text-background/80">
              {t('blog.by')}{' '}
              <Link to={author.url} className="underline-offset-2 hover:text-accent hover:underline">
                {author.name}
              </Link>
              <span className="mx-1.5 opacity-60">·</span>
              <span>{authorRole}</span>
            </p>
            <p className="mt-1 text-xs text-background/70">
              {t('blog.publishedOn')} <time dateTime={post.date}>{fmt(post.date)}</time>
              {post.updated && post.updated !== post.date && (
                <>
                  <span className="mx-1.5 opacity-60">·</span>
                  {t('blog.updatedOn')}{' '}
                  <time dateTime={post.updated}>{fmt(post.updated)}</time>
                </>
              )}
              <span className="mx-1.5 opacity-60">·</span>
              {t('blog.readingTime', { min: post.readingTimeMin })}
            </p>
          </div>
        </div>

        <div className="container-prose py-16 md:py-20">
          <div className="prose-stone mx-auto max-w-2xl space-y-5 text-lg leading-relaxed text-foreground/90">
            {blocks.map((b) => {
              if (b.type === 'h2')
                return (
                  <h2 key={b.key} className="mt-10 font-serif text-2xl md:text-3xl text-foreground">
                    {b.text}
                  </h2>
                );
              if (b.type === 'h3')
                return (
                  <h3 key={b.key} className="mt-6 font-serif text-xl text-foreground">
                    {b.text}
                  </h3>
                );
              return <p key={b.key}>{b.text}</p>;
            })}
          </div>

          {faqItems.length > 0 && (
            <section
              className="mx-auto mt-14 max-w-2xl rounded-sm border border-border/60 bg-secondary/30 p-6"
              aria-labelledby="post-faq-heading"
            >
              <h2 id="post-faq-heading" className="font-serif text-2xl">
                {t('blog.faqTitle')}
              </h2>
              <Accordion type="single" collapsible className="mt-4 w-full">
                {faqItems.map((it, i) => (
                  <AccordionItem key={i} value={`q-${i}`}>
                    <AccordionTrigger className="text-left font-serif text-base">
                      {it.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-foreground/85">
                      {it.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          {sources.length > 0 && (
            <aside
              className="mx-auto mt-10 max-w-2xl rounded-sm border border-border/60 p-6"
              aria-labelledby="post-sources-heading"
            >
              <h2
                id="post-sources-heading"
                className="text-xs font-medium uppercase tracking-[0.25em] text-accent"
              >
                {t('blog.sourcesTitle')}
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-foreground/85">
                {sources.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="underline-offset-2 hover:text-accent hover:underline"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <p className="mx-auto mt-8 max-w-2xl text-xs text-muted-foreground">
            {t('blog.lastReviewed')}{' '}
            <time dateTime={post.updated}>{fmt(post.updated)}</time>
          </p>

          <aside
            className="mx-auto mt-10 max-w-2xl rounded-sm border border-border/60 bg-secondary/40 p-6"
            aria-labelledby="author-bio-heading"
          >
            <p
              id="author-bio-heading"
              className="text-xs font-medium uppercase tracking-[0.25em] text-accent"
            >
              {t('blog.aboutAuthor')}
            </p>
            <p className="mt-3 font-serif text-lg">{author.name}</p>
            <p className="text-sm text-muted-foreground">{authorRole}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">{authorBio}</p>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border/60 bg-secondary/40 py-16">
          <div className="container-prose">
            <h2 className="mb-8 font-serif text-2xl">{t('blog.relatedTitle')}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="card-hover group flex gap-4 overflow-hidden rounded-sm border border-border/60 bg-background p-3"
                >
                  <div className="aspect-square w-28 shrink-0 overflow-hidden rounded-sm">
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
                    <h3 className="mt-1.5 font-serif text-base">{t(`blog.posts.${p.i18nKey}.title`)}</h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-foreground/70 group-hover:text-accent">
                      {t('blog.readMore')} <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogPost;
