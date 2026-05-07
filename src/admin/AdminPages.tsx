import { useState } from 'react';
import SeoEntityEditor, { type FieldDef } from './SeoEntityEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const PAGES = [
  { key: 'home', label: 'Home' },
  { key: 'products', label: 'Products' },
  { key: 'materials', label: 'Materials' },
  { key: 'projects', label: 'Projects' },
  { key: 'craft', label: 'Savoir-faire' },
  { key: 'about', label: 'About' },
  { key: 'blog', label: 'Blog index' },
  { key: 'faq', label: 'FAQ' },
  { key: 'contact', label: 'Contact' },
];

const FIELDS: FieldDef[] = [
  { key: 'seoTitle', label: 'SEO title (<60 chars)', type: 'text' },
  { key: 'seoDescription', label: 'Meta description (<160 chars)', type: 'textarea' },
  { key: 'ogImage', label: 'OG image URL', type: 'url' },
  { key: 'imageAlt', label: 'OG image alt text', type: 'text' },
];

const AdminPages = () => {
  const [page, setPage] = useState(PAGES[0].key);
  return (
    <div className="space-y-6">
      <div className="max-w-xs space-y-1.5">
        <Label>Page</Label>
        <Select value={page} onValueChange={setPage}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {PAGES.map((p) => (
              <SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <SeoEntityEditor
        entityType="page"
        entityKey={page}
        title={`SEO — ${PAGES.find((p) => p.key === page)?.label}`}
        subtitle="Override the title, meta description and social image per language."
        fields={FIELDS}
      />
    </div>
  );
};

export default AdminPages;
