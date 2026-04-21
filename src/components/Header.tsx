import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/products', label: t('nav.products') },
    { to: '/materials', label: t('nav.materials') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-prose flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="font-serif text-xl tracking-wide md:text-2xl" onClick={() => setOpen(false)}>
          HQ <span className="text-accent">Stones</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `gold-underline text-sm font-medium uppercase tracking-wider transition-colors ${
                  isActive ? 'text-accent active' : 'text-foreground/80 hover:text-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        <button
          aria-label="Menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-foreground hover:text-accent md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="container-prose flex flex-col gap-1 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-sm px-2 py-3 text-sm font-medium uppercase tracking-wider ${
                    isActive ? 'text-accent' : 'text-foreground/80'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3 border-t border-border/60 pt-4">
              <LanguageSwitcher align="start" />
            </div>
          </div>
        </div>
      )}

      {/* hidden marker so route changes re-render */}
      <span className="hidden">{location.pathname}</span>
    </header>
  );
};

export default Header;
