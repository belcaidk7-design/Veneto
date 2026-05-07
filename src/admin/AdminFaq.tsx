import { useState } from 'react';
import SeoEntityEditor, { type FieldDef } from './SeoEntityEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const PAGES = [
  { key: 'contact', label: 'Contact FAQ' },
  { key: 'products', label: 'Products FAQ' },
  { key: 'faq-page', label: 'Main FAQ page' },
];

const FIELDS: FieldDef[] = [
  { key: 'title', label: 'Section title', type: 'text' },
  {
    key: 'items',
    label: 'Items (JSON array of {q, a})',
    type: 'longtext',
    placeholder: '[{"q":"…","a":"…"}]',
    help: 'Strict JSON. Becomes both the visible FAQ and the FAQPage JSON-LD.',
  },
];

const AdminFaq = () => {
  const [page, setPage] = useState(PAGES[0].key);
  return (
    <div className="space-y-6">
      <div className="max-w-xs space-y-1.5">
        <Label>FAQ section</Label>
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
        entityType="faq"
        entityKey={page}
        title={`FAQ — ${PAGES.find((p) => p.key === page)?.label}`}
        fields={FIELDS}
      />
    </div>
  );
};

export default AdminFaq;
