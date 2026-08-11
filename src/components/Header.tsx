import { useState } from 'react';
import { Link, NavLink, useLocation } from '@/lib/router-compat';
import { useTranslation } from 'react-i18next';
import { Menu, Phone, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const PHONE_NUMBER = '+393294432741';

const Header = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/products', label: t('nav.products') },
    { to: '/materials', label: t('nav.materials') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/savoir-faire', label: t('nav.craft') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-prose flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          to="/"
          className="shrink-0 font-serif text-xl tracking-wide md:text-2xl"
          onClick={() => setOpen(false)}
        >
          HQ <span className="text-accent">Stones</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `gold-underline whitespace-nowrap text-sm font-medium uppercase tracking-wider transition-colors ${
                  isActive ? 'text-accent active' : 'text-foreground/80 hover:text-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Link
            to="/contact"
            className="inline-flex h-10 items-center justify-center rounded-sm bg-accent px-5 text-xs font-medium uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {t('nav.contact')}
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={`tel:${PHONE_NUMBER}`}
            aria-label={t('header.callAria')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-foreground hover:text-accent"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            aria-label="Menu"
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-foreground hover:text-accent"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <div className="container-prose flex flex-col gap-0.5 py-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-sm px-2 py-2.5 text-sm font-medium uppercase tracking-wider ${
                    isActive ? 'text-accent' : 'text-foreground/80'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-sm bg-accent px-5 text-xs font-medium uppercase tracking-wider text-accent-foreground"
            >
              {t('nav.contact')}
            </Link>
            <div className="mt-3 border-t border-border/60 pt-3">
              <LanguageSwitcher align="start" />
            </div>
          </div>
        </div>
      )}

      <span className="hidden">{location.pathname}</span>
    </header>
  );
};

export default Header;
