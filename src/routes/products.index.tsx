import { createFileRoute } from "@tanstack/react-router";
import Products from "@/pages/Products";
import en from "@/i18n/locales/en";
import { buildSeoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/products/")({
  component: Products,
  head: () =>
    buildSeoHead({ title: en.seo.products.title, description: en.seo.products.description, path: "/products" }),
});
