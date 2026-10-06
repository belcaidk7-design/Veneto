import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import NotFound from "@/pages/NotFound";
import DbBlogPostView from "@/components/DbBlogPostView";
import { BLOG_POSTS } from "@/data/blog";
import { getDbPost, pickDbVersion } from "@/lib/blog-db.functions";
import { getActiveLang } from "@/lib/active-lang";
import { useTranslation } from "react-i18next";
import en from "@/i18n/locales/en";
import { activeLocale, buildSeoHead, seoText } from "@/lib/seo-head";

type PostSeo = {
  seoTitle?: string;
  seoDescription?: string;
  title?: string;
  excerpt?: string;
  imageAlt?: string;
};

const postSeoFor = (key: string): PostSeo => {
  const locale = activeLocale().blog?.posts as unknown as Record<string, PostSeo> | undefined;
  const fallback = en.blog.posts as unknown as Record<string, PostSeo>;
  return locale?.[key] ?? fallback[key] ?? {};
};

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostRoute,
  loader: async ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    if (post) return { slug: params.slug, dbVersions: null };
    // Static articles take precedence; otherwise look up a published DB post.
    const dbVersions = await getDbPost({ data: { slug: params.slug } });
    if (!dbVersions.length) throw notFound();
    return { slug: params.slug, dbVersions };
  },
  notFoundComponent: NotFound,
  errorComponent: NotFound,
  head: ({ loaderData }) => {
    const blogSeo = seoText("blog");
    const db = pickDbVersion(loaderData?.dbVersions, getActiveLang());
    if (db) {
      return buildSeoHead({
        title: db.meta_title || db.title,
        description: db.meta_description || db.excerpt || blogSeo.description,
        path: `/blog/${db.slug}`,
        image: db.hero_image_url ?? undefined,
        imageAlt: db.image_alt ?? db.title,
        type: "article",
      });
    }
    const post = BLOG_POSTS.find((p) => p.slug === loaderData?.slug);
    if (!post) {
      return buildSeoHead({
        title: activeLocale().notFound?.title ?? en.notFound?.title ?? "Page not found",
        description: blogSeo.description,
        path: `/blog/${loaderData?.slug ?? ""}`,
        noindex: true,
      });
    }
    const seo = postSeoFor(post.i18nKey);
    return buildSeoHead({
      title: seo.seoTitle ?? seo.title ?? blogSeo.title,
      description: seo.seoDescription ?? seo.excerpt ?? blogSeo.description,
      path: `/blog/${post.slug}`,
      image: post.cover,
      imageAlt: seo.imageAlt,
      type: "article",
    });
  },
});

function BlogPostRoute() {
  const { dbVersions } = Route.useLoaderData();
  const { i18n } = useTranslation();
  const dbPost = pickDbVersion(dbVersions, i18n.language);
  if (dbPost) return <DbBlogPostView post={dbPost} />;
  return <BlogPost />;
}
