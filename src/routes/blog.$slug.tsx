import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import NotFound from "@/pages/NotFound";
import { BLOG_POSTS } from "@/data/blog";
import en from "@/i18n/locales/en";
import { buildSeoHead } from "@/lib/seo-head";

const postSeo = en.blog.posts as unknown as Record<
  string,
  { seoTitle?: string; seoDescription?: string; title?: string; excerpt?: string; imageAlt?: string }
>;

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
    if (!post) {
      return buildSeoHead({
        title: en.notFound?.title ?? "Page not found",
        description: en.seo.blog.description,
        path: `/blog/${loaderData?.slug ?? ""}`,
        noindex: true,
      });
    }
    const seo = postSeo[post.i18nKey] ?? {};
    return buildSeoHead({
      title: seo.seoTitle ?? seo.title ?? en.seo.blog.title,
      description: seo.seoDescription ?? seo.excerpt ?? en.seo.blog.description,
      path: `/blog/${post.slug}`,
      image: post.cover,
      imageAlt: seo.imageAlt,
      type: "article",
    });
  },
});
