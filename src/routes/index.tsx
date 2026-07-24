import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import en from "@/i18n/locales/en";
import { buildSeoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => buildSeoHead({ title: en.seo.home.title, description: en.seo.home.description, path: "/" }),
});
