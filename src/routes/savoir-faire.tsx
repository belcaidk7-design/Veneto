import { createFileRoute } from "@tanstack/react-router";
import Craft from "@/pages/Craft";
import en from "@/i18n/locales/en";
import { buildSeoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/savoir-faire")({
  component: Craft,
  head: () =>
    buildSeoHead({ title: en.seo.craft.title, description: en.seo.craft.description, path: "/savoir-faire" }),
});
