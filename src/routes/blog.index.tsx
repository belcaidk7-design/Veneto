import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";
import en from "@/i18n/locales/en";
import { buildSeoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/blog/")({
  component: Blog,
  head: () => buildSeoHead({ title: en.seo.blog.title, description: en.seo.blog.description, path: "/blog" }),
});
