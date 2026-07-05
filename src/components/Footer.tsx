import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Footer = () => {
  const { t } = useTranslation();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/products', label: t('nav.products') },
    { to: '/materials', label: t('nav.materials') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/about', label: t('nav.about') },
    { to: '/savoir-faire', label: t('nav.craft') },
    { to: '/faq', label: t('nav.faq') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="mt-24 border-t border-border/60 bg-foreground text-background">
      <div className="container-prose grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="font-serif text-2xl">
            HQ <span className="text-accent">Stones</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-background/70">{t('footer.tagline')}</p>
        </div>

        <div>
          <h4 className="mb-4 font-serif text-sm uppercase tracking-widest text-accent">
            {t('footer.navigation')}
          </h4>
          <ul className="space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-background/70 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="mb-4 font-serif text-sm uppercase tracking-widest text-accent">
              {t('footer.language')}
            </h4>
            <LanguageSwitcher align="start" />
          </div>
          <div>
            <h4 className="mb-4 font-serif text-sm uppercase tracking-widest text-accent">
              {t('footer.follow')}
            </h4>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-background/20 text-background/70 transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-prose flex flex-col gap-2 py-6 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2025 HQ Stones. {t('footer.rights')}</span>
          <Link to="/legal" className="hover:text-accent">
            {t('footer.legal', { defaultValue: 'Legal notice' })}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
