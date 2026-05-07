import { useState } from 'react';
import SeoEntityEditor, { type FieldDef } from './SeoEntityEditor';
import { BLOG_AUTHORS } from '@/data/blog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const FIELDS: FieldDef[] = [
  { key: 'name', label: 'Display name', type: 'text' },
  { key: 'role', label: 'Role / job title', type: 'text' },
  { key: 'bio', label: 'Bio', type: 'textarea' },
  { key: 'avatar', label: 'Avatar URL', type: 'url' },
  {
    key: 'sameAs',
    label: 'sameAs links (JSON array of URLs)',
    type: 'longtext',
    placeholder: '["https://www.linkedin.com/in/…"]',
    help: 'Used in the Person schema for E-E-A-T signals.',
  },
];

const authors = Object.values(BLOG_AUTHORS);

const AdminAuthors = () => {
  const [key, setKey] = useState(authors[0].key);
  return (
    <div className="space-y-6">
      <div className="max-w-xs space-y-1.5">
        <Label>Author</Label>
        <Select value={key} onValueChange={(v) => setKey(v as typeof key)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {authors.map((a) => (
              <SelectItem key={a.key} value={a.key}>{a.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <SeoEntityEditor
        entityType="author"
        entityKey={key}
        title={`Author — ${authors.find((a) => a.key === key)?.name}`}
        fields={FIELDS}
      />
    </div>
  );
};

export default AdminAuthors;
