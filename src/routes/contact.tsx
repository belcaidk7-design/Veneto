import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";
import { buildSeoHead, seoText } from "@/lib/seo-head";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () =>
    buildSeoHead({ ...seoText('contact'), path: "/contact" }),
});
