import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { buildSeoHead, seoText } from "@/lib/seo-head";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => buildSeoHead({ ...seoText('home'), path: "/" }),
});
