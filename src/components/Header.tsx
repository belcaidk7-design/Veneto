import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Phone, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

// TODO: replace with real phone number
const PHONE_NUMBER = '+390000000000';

const Header = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/products', label: t('nav.products') },
    { to: '/materials', label: t('nav.materials') },
    { to: '/projects', label: t('nav.projects') },
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

        <nav className="hidden items-center gap-7 lg:flex">
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

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${PHONE_NUMBER}`}
            aria-label={t('header.callAria')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-foreground hover:text-accent"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            aria-label="Menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-foreground hover:text-accent"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
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

      <span className="hidden">{location.pathname}</span>
    </header>
  );
};

export default Header;
