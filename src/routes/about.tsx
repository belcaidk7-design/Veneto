import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";
import { buildSeoHead, seoText } from "@/lib/seo-head";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => buildSeoHead({ ...seoText('about'), path: "/about" }),
});
