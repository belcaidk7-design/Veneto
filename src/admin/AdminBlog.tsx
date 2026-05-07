import { useState } from 'react';
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
    </div>
  );
};

export default AdminBlog;
