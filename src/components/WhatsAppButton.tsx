import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WHATSAPP_NUMBER = '393294432741';

const WhatsAppButton = () => {
  const { t } = useTranslation();
  const message = encodeURIComponent(t('whatsapp.message'));
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp.aria')}
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl transition-transform hover:scale-110 hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
