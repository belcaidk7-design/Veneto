import { createFileRoute } from "@tanstack/react-router";
import Craft from "@/pages/Craft";
import { buildSeoHead, seoText } from "@/lib/seo-head";

export const Route = createFileRoute("/savoir-faire")({
  component: Craft,
  head: () =>
    buildSeoHead({ ...seoText('craft'), path: "/savoir-faire" }),
});
