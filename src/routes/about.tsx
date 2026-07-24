import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";
import en from "@/i18n/locales/en";
import { buildSeoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => buildSeoHead({ title: en.seo.about.title, description: en.seo.about.description, path: "/about" }),
});
