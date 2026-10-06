import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";
import { listDbPosts } from "@/lib/blog-db.functions";
import { buildSeoHead, seoText } from "@/lib/seo-head";

export const Route = createFileRoute("/blog/")({
  component: BlogRoute,
  loader: async () => ({ dbPosts: await listDbPosts() }),
  head: () => buildSeoHead({ ...seoText('blog'), path: "/blog" }),
});

function BlogRoute() {
  const { dbPosts } = Route.useLoaderData();
  return <Blog dbPosts={dbPosts} />;
}
