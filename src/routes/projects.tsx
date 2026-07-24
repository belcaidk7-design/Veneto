import { createFileRoute } from "@tanstack/react-router";
import Projects from "@/pages/Projects";
import en from "@/i18n/locales/en";
import { buildSeoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/projects")({
  component: Projects,
  head: () =>
    buildSeoHead({ title: en.seo.projects.title, description: en.seo.projects.description, path: "/projects" }),
});
