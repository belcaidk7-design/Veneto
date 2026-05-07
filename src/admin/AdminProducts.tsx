import { useState } from 'react';
import SeoEntityEditor, { type FieldDef } from './SeoEntityEditor';
import { PRODUCTS } from '@/data/catalog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const FIELDS: FieldDef[] = [
  { key: 'name', label: 'Product name (H1)', type: 'text' },
  { key: 'shortDescription', label: 'Short description', type: 'textarea' },
  { key: 'longDescription', label: 'Long description', type: 'longtext' },
  { key: 'seoTitle', label: 'SEO title', type: 'text' },
  { key: 'seoDescription', label: 'Meta description', type: 'textarea' },
  { key: 'imageAlt', label: 'Image alt', type: 'text' },
];

const AdminProducts = () => {
  const [id, setId] = useState(PRODUCTS[0].id);
  return (
    <div className="space-y-6">
      <div className="max-w-md space-y-1.5">
        <Label>Product</Label>
        <Select value={id} onValueChange={setId}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {PRODUCTS.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.id}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <SeoEntityEditor
        entityType="product"
        entityKey={id}
        title={`Product — ${id}`}
        fields={FIELDS}
      />
    </div>
  );
};

export default AdminProducts;
