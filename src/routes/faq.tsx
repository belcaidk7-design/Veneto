import { createFileRoute } from "@tanstack/react-router";
import Faq from "@/pages/Faq";
import en from "@/i18n/locales/en";
import { buildSeoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/faq")({
  component: Faq,
  head: () => buildSeoHead({ title: en.seo.faq.title, description: en.seo.faq.description, path: "/faq" }),
});
