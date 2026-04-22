import { useTranslation } from 'react-i18next';
import { Mail, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-prose py-16 md:py-20">
          <h1 className="font-serif text-4xl md:text-5xl">{t('contact.title')}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="container-prose grid gap-12 py-16 md:grid-cols-5 md:py-20">
        <div className="md:col-span-3">
          <h2 className="font-serif text-2xl">{t('contact.formTitle')}</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
        <aside className="md:col-span-2">
          <h2 className="font-serif text-2xl">{t('contact.infoTitle')}</h2>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-accent" />
              <div>
                <p className="font-medium">{t('contact.infoCompany')}</p>
                <p className="text-muted-foreground">{t('contact.infoLocation')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-accent" />
              <a href={`mailto:${t('contact.infoEmail')}`} className="hover:text-accent">
                {t('contact.infoEmail')}
              </a>
            </div>
          </div>

          <h3 className="mt-10 font-serif text-lg">{t('contact.findUs')}</h3>
          <div className="mt-4 aspect-[4/3] overflow-hidden rounded-sm border border-border/60">
            <iframe
              title="HQ Stones location"
              src="https://www.google.com/maps?q=Italy&output=embed"
              loading="lazy"
              className="h-full w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </section>
    </Layout>
  );
};

export default Contact;
