import { createFileRoute } from "@tanstack/react-router";
import Projects from "@/pages/Projects";
import { buildSeoHead, seoText } from "@/lib/seo-head";

export const Route = createFileRoute("/projects")({
  component: Projects,
  head: () =>
    buildSeoHead({ ...seoText('projects'), path: "/projects" }),
});
