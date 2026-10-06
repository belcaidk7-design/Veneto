import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export interface DbFaq { q: string; a: string }
export interface DbLink { label: string; url: string }

export interface DbBlogPost {
  slug: string;
  lang: string;
  category: string | null;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  excerpt: string | null;
  body_md: string;
  faq: DbFaq[];
  sources: DbLink[];
  internal_links: DbLink[];
  hero_image_url: string | null;
  image_alt: string | null;
  author: string | null;
  publish_at: string | null;
  published_at: string | null;
  updated_at: string;
}

export type DbBlogSummary = Pick<
  DbBlogPost,
  "slug" | "lang" | "category" | "title" | "excerpt" | "hero_image_url" | "image_alt" | "publish_at" | "published_at" | "updated_at"
>;

function publicClient() {
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ??
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
    process.env["SUPABASE_ANON_KEY"];
  if (!url || !key) return null;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

const asArray = <T,>(v: unknown, check: (x: Record<string, unknown>) => T | null): T[] =>
  Array.isArray(v)
    ? v.flatMap((x) => (x && typeof x === "object" ? [check(x as Record<string, unknown>)].filter(Boolean) as T[] : []))
    : [];

const toFaq = (x: Record<string, unknown>): DbFaq | null =>
  typeof x.q === "string" && typeof x.a === "string" ? { q: x.q, a: x.a } : null;
const toLink = (x: Record<string, unknown>): DbLink | null => {
  const url = typeof x.url === "string" ? x.url : typeof x.href === "string" ? x.href : null;
  const label = typeof x.label === "string" ? x.label : typeof x.title === "string" ? x.title : url;
  return url && label ? { label, url } : null;
};

const SUMMARY_COLS = "slug,lang,category,title,excerpt,hero_image_url,image_alt,publish_at,published_at,updated_at";

/** Published/due DB posts (RLS restricts to published + publish_at <= now). */
export const listDbPosts = createServerFn({ method: "GET" }).handler(async (): Promise<DbBlogSummary[]> => {
  try {
    const sb = publicClient();
    if (!sb) return [];
    const { data, error } = await sb
      .from("blog_posts")
      .select(SUMMARY_COLS)
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(300);
    if (error) {
      console.error("listDbPosts", error.message);
      return [];
    }
    return (data ?? []) as DbBlogSummary[];
  } catch (e) {
    console.error("listDbPosts", e);
    return [];
  }
});

export const getDbPost = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }): Promise<DbBlogPost | null> => {
    try {
      const sb = publicClient();
      if (!sb) return null;
      const { data: rows, error } = await sb
        .from("blog_posts")
        .select("*")
        .eq("slug", data.slug)
        .eq("status", "published")
        .order("updated_at", { ascending: false })
        .limit(1);
      if (error || !rows?.[0]) return null;
      const r = rows[0] as Record<string, unknown>;
      return {
        slug: r.slug as string,
        lang: (r.lang as string) || "en",
        category: (r.category as string) ?? null,
        title: r.title as string,
        meta_title: (r.meta_title as string) ?? null,
        meta_description: (r.meta_description as string) ?? null,
        excerpt: (r.excerpt as string) ?? null,
        body_md: (r.body_md as string) ?? "",
        faq: asArray(r.faq, toFaq),
        sources: asArray(r.sources, toLink),
        internal_links: asArray(r.internal_links, toLink),
        hero_image_url: (r.hero_image_url as string) ?? null,
        image_alt: (r.image_alt as string) ?? null,
        author: (r.author as string) ?? null,
        publish_at: (r.publish_at as string) ?? null,
        published_at: (r.published_at as string) ?? null,
        updated_at: r.updated_at as string,
      };
    } catch (e) {
      console.error("getDbPost", e);
      return null;
    }
  });
