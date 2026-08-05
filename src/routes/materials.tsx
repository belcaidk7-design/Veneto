import { createFileRoute } from "@tanstack/react-router";
import Materials from "@/pages/Materials";
import { buildSeoHead, seoText } from "@/lib/seo-head";

export const Route = createFileRoute("/materials")({
  component: Materials,
  head: () =>
    buildSeoHead({ ...seoText('materials'), path: "/materials" }),
});
