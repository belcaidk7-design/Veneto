import { createFileRoute, notFound } from "@tanstack/react-router";
import ProductDetail from "@/pages/ProductDetail";
import NotFound from "@/pages/NotFound";
import { getProductBySlug } from "@/data/catalog";
import en from "@/i18n/locales/en";
import productContentEn from "@/i18n/locales/productContent.en";
import productContentIt from "@/i18n/locales/productContent.it";
import productContentFr from "@/i18n/locales/productContent.fr";
import productContentDe from "@/i18n/locales/productContent.de";
import { getActiveLang, type Lang } from "@/lib/active-lang";
import { activeLocale, buildSeoHead, seoText } from "@/lib/seo-head";

type ProductSeo = { seoTitle?: string; seoDescription?: string };

const PRODUCT_CONTENT: Record<Lang, Record<string, ProductSeo>> = {
  en: productContentEn as unknown as Record<string, ProductSeo>,
  it: productContentIt as unknown as Record<string, ProductSeo>,
  fr: productContentFr as unknown as Record<string, ProductSeo>,
  de: productContentDe as unknown as Record<string, ProductSeo>,
};

export const Route = createFileRoute("/products/$slug")({
  component: ProductDetail,
  loader: ({ params }) => {
    if (!getProductBySlug(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  notFoundComponent: NotFound,
  head: ({ loaderData }) => {
    const product = getProductBySlug(loaderData?.slug);
    const productsSeo = seoText("products");
    if (!product) {
      return buildSeoHead({
        title: activeLocale().notFound?.title ?? en.notFound?.title ?? "Page not found",
        description: productsSeo.description,
        path: `/products/${loaderData?.slug ?? ""}`,
        noindex: true,
      });
    }
    const lang = getActiveLang();
    const names = (activeLocale().products?.items ?? en.products.items) as Record<string, string>;
    const name = names[product.i18nKey] ?? (en.products.items as Record<string, string>)[product.i18nKey] ?? product.i18nKey;
    const content = PRODUCT_CONTENT[lang]?.[product.i18nKey] ?? PRODUCT_CONTENT.en[product.i18nKey];
    return buildSeoHead({
      title: content?.seoTitle ?? name,
      description: content?.seoDescription ?? `${name} — HQ Stones.`,
      path: `/products/${product.id}`,
      image: product.image,
    });
  },
});
