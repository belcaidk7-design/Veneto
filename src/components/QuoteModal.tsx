import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ContactForm from './ContactForm';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productLabel?: string;
  productCategory?: 'exterior' | 'interior' | 'slabs';
}

const QuoteModal = ({ open, onOpenChange, productLabel, productCategory }: Props) => {
  const { t } = useTranslation();
  const initialMessage = productLabel ? `${productLabel} — ` : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{t('modal.quoteTitle')}</DialogTitle>
          <DialogDescription>{t('modal.quoteSubtitle')}</DialogDescription>
        </DialogHeader>
        <ContactForm
          initialMessage={initialMessage}
          initialCategory={productCategory}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;

// helper for buttons elsewhere
export const useQuoteModalState = () => {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
};
