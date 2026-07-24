import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";
import en from "@/i18n/locales/en";
import { buildSeoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () =>
    buildSeoHead({ title: en.seo.contact.title, description: en.seo.contact.description, path: "/contact" }),
});
