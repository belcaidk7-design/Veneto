import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/pages', label: 'Pages' },
  { to: '/admin/blog', label: 'Articles' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/faq', label: 'FAQ' },
  { to: '/admin/authors', label: 'Authors' },
];

const AdminLayout = () => {
  const { isAdmin, loading, user } = useIsAdmin();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="font-serif text-2xl">Access denied</h1>
        <p className="max-w-md text-muted-foreground">
          Your account is not authorized as an admin. Ask the site owner to grant the
          admin role to your user id: <code className="text-xs">{user.id}</code>
        </p>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <span className="font-serif text-lg">SEO Admin</span>
            <nav className="flex flex-wrap gap-1 text-sm">
              {navItems.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-1.5 transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
