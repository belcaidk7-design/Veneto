import { createFileRoute } from "@tanstack/react-router";
import Products from "@/pages/Products";
import { buildSeoHead, seoText } from "@/lib/seo-head";

export const Route = createFileRoute("/products/")({
  component: Products,
  head: () =>
    buildSeoHead({ ...seoText('products'), path: "/products" }),
});
