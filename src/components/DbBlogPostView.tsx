import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/router-compat';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import Markdown, { markdownWordCount } from '@/components/Markdown';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { DbBlogPost } from '@/lib/blog-db.functions';
import placeholder from '@/assets/placeholder-stone.jpg';

const SITE_URL = 'https://hq-stones.com';

/** Renders a database-driven article with the same visual system as static posts. */
const DbBlogPostView = ({ post }: { post: DbBlogPost }) => {
  const { t, i18n } = useTranslation();
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' });

  const published = post.published_at ?? post.publish_at ?? post.updated_at;
  const updated = post.updated_at ?? published;
  const cover = post.hero_image_url || placeholder;
  const imageAlt = post.image_alt || post.title;
  const description = post.meta_description || post.excerpt || post.title;
  const wordCount = markdownWordCount(post.body_md);
  const readingMin = Math.max(1, Math.round(wordCount / 220));
  const path = `/blog/${post.slug}`;
  const categoryLabel = post.category
    ? (t(`blog.categories.${post.category}`, { defaultValue: post.category }) as string)
    : undefined;

  const jsonLd: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description,
      ...(post.hero_image_url ? { image: { '@type': 'ImageObject', url: post.hero_image_url, caption: imageAlt } } : {}),
      datePublished: published,
      dateModified: updated,
      inLanguage: post.lang,
      ...(categoryLabel ? { articleSection: categoryLabel } : {}),
      wordCount,
      timeRequired: `PT${readingMin}M`,
      author: post.author
        ? { '@type': 'Person', name: post.author, worksFor: { '@type': 'Organization', name: 'HQ Stones' } }
        : { '@type': 'Organization', name: 'HQ Stones', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'HQ Stones', logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png` } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
    },
  ];
  if (post.faq.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }

  return (
    <Layout>
      <Seo
        title={post.meta_title || post.title}
        description={description}
        path={path}
        image={post.hero_image_url ?? undefined}
        imageAlt={imageAlt}
        type="article"
        breadcrumbs={[
          { name: t('nav.home'), path: '/' },
          { name: t('nav.blog'), path: '/blog' },
          { name: post.title, path },
        ]}
        jsonLd={jsonLd}
      />
      <article lang={post.lang}>
        <div className="relative h-[55vh] min-h-[360px] w-full overflow-hidden">
          <img src={cover} alt={imageAlt} width={1280} height={832} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
          <div className="container-prose absolute inset-x-0 bottom-0 pb-12">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-background/80 hover:text-accent">
              <ArrowLeft className="h-3.5 w-3.5" /> {t('blog.backToBlog')}
            </Link>
            {categoryLabel && (
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">{categoryLabel}</p>
            )}
            <h1 className="mt-3 max-w-3xl font-serif text-3xl text-background md:text-5xl">{post.title}</h1>
            {post.author && (
              <p className="mt-4 text-sm text-background/80">
                {t('blog.by')} {post.author}
              </p>
            )}
            <p className="mt-1 text-xs text-background/70">
              {t('blog.publishedOn')} <time dateTime={published}>{fmt(published)}</time>
              {updated.slice(0, 10) !== published.slice(0, 10) && (
                <>
                  <span className="mx-1.5 opacity-60">·</span>
                  {t('blog.updatedOn')} <time dateTime={updated}>{fmt(updated)}</time>
                </>
              )}
              <span className="mx-1.5 opacity-60">·</span>
              {t('blog.readingTime', { min: readingMin })}
            </p>
          </div>
        </div>

        <div className="container-prose py-16 md:py-20">
          <div className="prose-stone mx-auto max-w-2xl space-y-5 text-lg leading-relaxed text-foreground/90">
            {post.excerpt && <p className="font-serif text-xl text-foreground">{post.excerpt}</p>}
            <Markdown source={post.body_md} />
          </div>

          {post.faq.length > 0 && (
            <section className="mx-auto mt-14 max-w-2xl rounded-sm border border-border/60 bg-secondary/30 p-6" aria-labelledby="post-faq-heading">
              <h2 id="post-faq-heading" className="font-serif text-2xl">{t('blog.faqTitle')}</h2>
              <Accordion type="single" collapsible className="mt-4 w-full">
                {post.faq.map((it, i) => (
                  <AccordionItem key={i} value={`q-${i}`}>
                    <AccordionTrigger className="text-left font-serif text-base">{it.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-foreground/85">{it.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          {post.internal_links.length > 0 && (
            <nav className="mx-auto mt-10 max-w-2xl rounded-sm border border-border/60 p-6" aria-labelledby="post-links-heading">
              <h2 id="post-links-heading" className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                {t('blog.internalLinksTitle')}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {post.internal_links.map((l, i) => (
                  <li key={i}>
                    {l.url.startsWith('/') && !l.url.startsWith('//') ? (
                      <Link to={l.url} className="inline-flex items-center gap-1.5 hover:text-accent">
                        {l.label} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <a href={l.url} className="inline-flex items-center gap-1.5 hover:text-accent">
                        {l.label} <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {post.sources.length > 0 && (
            <aside className="mx-auto mt-10 max-w-2xl rounded-sm border border-border/60 p-6" aria-labelledby="post-sources-heading">
              <h2 id="post-sources-heading" className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{t('blog.sourcesTitle')}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-foreground/85">
                {post.sources.map((s, i) => (
                  <li key={i}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="underline-offset-2 hover:text-accent hover:underline">{s.label}</a>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <p className="mx-auto mt-8 max-w-2xl text-xs text-muted-foreground">
            {t('blog.lastReviewed')} <time dateTime={updated}>{fmt(updated)}</time>
          </p>

          <aside className="mx-auto mt-10 max-w-2xl rounded-sm border border-border/60 bg-secondary/40 p-6" aria-labelledby="post-cta-heading">
            <h2 id="post-cta-heading" className="font-serif text-xl">{t('xlinks.blogPostCtaTitle')}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t('xlinks.blogPostCtaBody')}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/materials" className="inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-wider text-accent hover:underline">
                {t('xlinks.discoverMaterials')} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-wider text-foreground hover:text-accent">
                {t('xlinks.seeCatalog')} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-wider text-foreground hover:text-accent">
                {t('xlinks.contactUs')} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </Layout>
  );
};

export default DbBlogPostView;
