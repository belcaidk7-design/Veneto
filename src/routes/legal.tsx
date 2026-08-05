import { createFileRoute } from "@tanstack/react-router";
import Legal from "@/pages/Legal";
import { activeLocale, buildSeoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/legal")({
  component: Legal,
  head: () => {
    const l = activeLocale();
    return buildSeoHead({ title: l.legal.title, description: l.legal.subtitle, path: "/legal" });
  },
});
