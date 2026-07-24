import { createFileRoute } from "@tanstack/react-router";
import Legal from "@/pages/Legal";
import en from "@/i18n/locales/en";
import { buildSeoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/legal")({
  component: Legal,
  head: () => buildSeoHead({ title: en.legal.title, description: en.legal.subtitle, path: "/legal" }),
});
