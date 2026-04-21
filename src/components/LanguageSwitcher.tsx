import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LANGS: { code: 'en' | 'it' | 'fr' | 'de'; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'it', flag: '🇮🇹', label: 'IT' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
  { code: 'de', flag: '🇩🇪', label: 'DE' },
];

interface Props {
  align?: 'start' | 'center' | 'end';
}

const LanguageSwitcher = ({ align = 'end' }: Props) => {
  const { i18n, t } = useTranslation();
  const current = LANGS.find((l) => l.code === i18n.language.split('-')[0]) ?? LANGS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t('language.label')}
        className="inline-flex items-center gap-2 rounded-sm border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{current.label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-[10rem]">
        {LANGS.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`cursor-pointer text-sm ${
              current.code === lang.code ? 'text-accent font-medium' : ''
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            {t(`language.${lang.code}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
