import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";
import { buildSeoHead, seoText } from "@/lib/seo-head";

export const Route = createFileRoute("/blog/")({
  component: Blog,
  head: () => buildSeoHead({ ...seoText('blog'), path: "/blog" }),
});
