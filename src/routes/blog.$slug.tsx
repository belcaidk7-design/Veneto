import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import NotFound from "@/pages/NotFound";
import { BLOG_POSTS } from "@/data/blog";
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
  component: BlogPost,
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { slug: params.slug };
  },
  notFoundComponent: NotFound,
  head: ({ loaderData }) => {
    const post = BLOG_POSTS.find((p) => p.slug === loaderData?.slug);
    const blogSeo = seoText("blog");
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
