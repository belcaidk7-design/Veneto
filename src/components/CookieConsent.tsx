import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'hqs-cookie-consent';

const CookieConsent = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = window.setTimeout(() => setVisible(true), 800);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const handle = (value: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('cookie.title')}
      className="fixed bottom-3 left-3 right-3 z-50 max-w-sm rounded-sm border border-border/60 bg-background/98 p-3 shadow-lg backdrop-blur sm:left-4 sm:right-auto sm:bottom-4"
    >
      <p className="text-xs leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">{t('cookie.title')}</span>{' '}
        {t('cookie.body')}
      </p>
      <div className="mt-2.5 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handle('declined')}
          className="h-8 border-foreground/30 px-3 text-xs"
        >
          {t('cookie.decline')}
        </Button>
        <Button
          size="sm"
          onClick={() => handle('accepted')}
          className="h-8 bg-accent px-3 text-xs text-accent-foreground hover:bg-accent/90"
        >
          {t('cookie.accept')}
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
