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
    { to: '/blog', label: t('nav.blog') },
    { to: '/about', label: t('nav.about') },
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
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
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
        <div className="container-prose py-6 text-xs text-background/50">
          © 2025 HQ Stones. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
