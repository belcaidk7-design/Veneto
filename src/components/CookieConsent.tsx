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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/98 backdrop-blur shadow-2xl">
      <div className="container-prose flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-foreground/85">
          <span className="font-medium">{t('cookie.title')}</span>{' '}
          <span className="text-muted-foreground">{t('cookie.body')}</span>
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handle('declined')}
            className="border-foreground/30"
          >
            {t('cookie.decline')}
          </Button>
          <Button
            size="sm"
            onClick={() => handle('accepted')}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {t('cookie.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
