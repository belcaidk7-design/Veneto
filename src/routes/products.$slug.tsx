import { createFileRoute } from "@tanstack/react-router";
import ProductDetail from "@/pages/ProductDetail";
import { getProductBySlug } from "@/data/catalog";
import en from "@/i18n/locales/en";
import { buildSeoHead } from "@/lib/seo-head";

const productNames = en.products.items as Record<string, string>;
const productContent = (
  en as unknown as {
    productContent?: Record<string, { seoTitle?: string; seoDescription?: string }>;
  }
).productContent;

export const Route = createFileRoute("/products/$slug")({
  component: ProductDetail,
  loader: ({ params }) => ({ slug: params.slug }),
  head: ({ loaderData }) => {
    const product = getProductBySlug(loaderData?.slug);
    if (!product) {
      return buildSeoHead({
        title: en.notFound?.title ?? "Page not found",
        description: en.seo.products.description,
        path: `/products/${loaderData?.slug ?? ""}`,
        noindex: true,
      });
    }
    const name = productNames[product.i18nKey] ?? product.i18nKey;
    const content = productContent?.[product.i18nKey];
    return buildSeoHead({
      title: content?.seoTitle ?? `${name} in natural stone`,
      description:
        content?.seoDescription ??
        `${name} by HQ Stones — Italian natural stone, tailored formats and finishes, Europe-wide delivery.`,
      path: `/products/${product.id}`,
      image: product.image,
    });
  },
});
