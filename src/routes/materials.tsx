import { createFileRoute } from "@tanstack/react-router";
import Materials from "@/pages/Materials";
import en from "@/i18n/locales/en";
import { buildSeoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/materials")({
  component: Materials,
  head: () =>
    buildSeoHead({ title: en.seo.materials.title, description: en.seo.materials.description, path: "/materials" }),
});
