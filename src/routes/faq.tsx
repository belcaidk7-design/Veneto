import { createFileRoute } from "@tanstack/react-router";
import Faq from "@/pages/Faq";
import { buildSeoHead, seoText } from "@/lib/seo-head";

export const Route = createFileRoute("/faq")({
  component: Faq,
  head: () => buildSeoHead({ ...seoText('faq'), path: "/faq" }),
});
