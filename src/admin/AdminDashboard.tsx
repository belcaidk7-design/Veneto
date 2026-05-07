import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BLOG_POSTS } from '@/data/blog';
import { PRODUCTS } from '@/data/catalog';

const sections = [
  { to: '/admin/pages', title: 'Static pages', desc: 'Home, Products, Contact, About, Blog…' },
  { to: '/admin/blog', title: 'Blog articles', desc: `${BLOG_POSTS.length} articles` },
  { to: '/admin/products', title: 'Products', desc: `${PRODUCTS.length} product pages` },
  { to: '/admin/faq', title: 'FAQ sections', desc: 'Contact & Products FAQ' },
  { to: '/admin/authors', title: 'Authors (E-E-A-T)', desc: 'Bios, roles, links' },
];

const AdminDashboard = () => {
  const { data: count } = useQuery({
    queryKey: ['seo_content_count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('seo_content')
        .select('*', { count: 'exact', head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl">SEO Admin</h1>
        <p className="mt-1 text-muted-foreground">
          {count ?? 0} override{count === 1 ? '' : 's'} stored. All other content falls back to
          the site defaults.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
          <Link key={s.to} to={s.to}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="font-serif text-lg">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{s.desc}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
