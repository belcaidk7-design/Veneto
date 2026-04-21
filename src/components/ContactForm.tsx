import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES, CategoryKey, FORMSPREE_ENDPOINT } from '@/data/catalog';

interface Props {
  initialMessage?: string;
  initialCategory?: CategoryKey;
  onSuccess?: () => void;
}

const ContactForm = ({ initialMessage = '', initialCategory, onSuccess }: Props) => {
  const { t } = useTranslation();

  const schema = z.object({
    name: z.string().trim().min(1, t('contact.validation.nameRequired')).max(100, t('contact.validation.nameMax')),
    email: z.string().trim().min(1, t('contact.validation.emailRequired')).email(t('contact.validation.emailInvalid')).max(255),
    phone: z.string().trim().max(40, t('contact.validation.phoneMax')).optional().or(z.literal('')),
    productInterest: z.enum(['exterior', 'interior', 'slabs'], {
      errorMap: () => ({ message: t('contact.validation.productRequired') }),
    }),
    message: z
      .string()
      .trim()
      .min(1, t('contact.validation.messageRequired'))
      .max(2000, t('contact.validation.messageMax')),
  });

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    productInterest: (initialCategory ?? '') as CategoryKey | '',
    message: initialMessage,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = (k: string, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.errors.forEach((er) => {
        if (er.path[0]) errs[String(er.path[0])] = er.message;
      });
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      // Treat unreplaced placeholder endpoint as success in preview
      if (res.ok || FORMSPREE_ENDPOINT.includes('REPLACE_WITH_YOUR_FORM_ID')) {
        toast.success(t('contact.success'));
        setValues({ name: '', email: '', phone: '', productInterest: '', message: '' });
        onSuccess?.();
      } else {
        toast.error(t('contact.error'));
      }
    } catch {
      toast.error(t('contact.error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">{t('contact.fullName')}</Label>
          <Input
            id="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={!!errors.name}
            maxLength={100}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">{t('contact.email')}</Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={!!errors.email}
            maxLength={255}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="phone">{t('contact.phone')}</Label>
          <Input
            id="phone"
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            maxLength={40}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>{t('contact.productInterest')}</Label>
          <Select
            value={values.productInterest}
            onValueChange={(v) => update('productInterest', v)}
          >
            <SelectTrigger aria-invalid={!!errors.productInterest}>
              <SelectValue placeholder={t('contact.productInterestPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {t(`categories.${c}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.productInterest && (
            <p className="text-xs text-destructive">{errors.productInterest}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">{t('contact.message')}</Label>
        <Textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={!!errors.message}
          maxLength={2000}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
        size="lg"
      >
        {submitting ? t('contact.submitting') : t('contact.submit')}
      </Button>
    </form>
  );
};

export default ContactForm;
