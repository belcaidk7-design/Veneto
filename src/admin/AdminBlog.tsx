import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import SeoEntityEditor, { type FieldDef } from './SeoEntityEditor';
import { BLOG_POSTS } from '@/data/blog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const FIELDS: FieldDef[] = [
  { key: 'title', label: 'Title (H1)', type: 'text' },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
  { key: 'seoTitle', label: 'SEO title', type: 'text' },
  { key: 'seoDescription', label: 'Meta description', type: 'textarea' },
  { key: 'imageAlt', label: 'Cover image alt', type: 'text' },
  {
    key: 'body',
    label: 'Body (markdown ## / ###)',
    type: 'longtext',
    help: 'Use ## for H2, ### for H3, blank line between paragraphs.',
  },
  {
    key: 'faq',
    label: 'FAQ (JSON array of {q, a})',
    type: 'longtext',
    placeholder: '[{"q":"…","a":"…"}]',
    help: 'Strict JSON. Leave empty for no FAQ.',
  },
  {
    key: 'sources',
    label: 'Sources (JSON array of {label, url})',
    type: 'longtext',
    placeholder: '[{"label":"…","url":"https://…"}]',
  },
];

const AdminBlog = () => {
  const [slug, setSlug] = useState(BLOG_POSTS[0].slug);
  const post = BLOG_POSTS.find((p) => p.slug === slug)!;
  return (
    <div className="space-y-6">
      <div className="max-w-md space-y-1.5">
        <Label>Article</Label>
        <Select value={slug} onValueChange={setSlug}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {BLOG_POSTS.map((p) => (
              <SelectItem key={p.slug} value={p.slug}>{p.slug}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <SeoEntityEditor
        entityType="blog"
        entityKey={slug}
        title={`Article — ${post.slug}`}
        subtitle={`Published ${post.date} · Updated ${post.updated}`}
        fields={FIELDS}
      />
      <DbPostsReadOnly />
    </div>
  );
};

/** Read-only list of published database posts (managed by automation). */
const DbPostsReadOnly = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['blog_posts_admin_ro'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('slug,lang,title,published_at,updated_at')
        .order('updated_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return data ?? [];
    },
  });
  return (
    <section className="rounded-sm border border-border/60 p-5">
      <h2 className="font-serif text-lg">Database articles (read-only)</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Published by automation. Edit them at the source; SEO overrides above apply to built-in articles only.
      </p>
      {isLoading ? (
        <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
      ) : !data?.length ? (
        <p className="mt-3 text-sm text-muted-foreground">No published database articles yet.</p>
      ) : (
        <ul className="mt-3 divide-y divide-border/60 text-sm">
          {data.map((p) => (
            <li key={`${p.slug}-${p.lang}`} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" className="hover:text-accent">
                {p.title}
              </a>
              <span className="text-xs uppercase text-muted-foreground">
                {p.lang} · {String(p.published_at ?? p.updated_at).slice(0, 10)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AdminBlog;
