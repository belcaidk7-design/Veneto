import { useTranslation } from 'react-i18next';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import ContactForm from '@/components/ContactForm';

const PHONE = '+39 000 000 0000';
const PHONE_TEL = '+390000000000';
const WHATSAPP = '390000000000';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Seo
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        path="/contact"
        breadcrumbs={[
          { name: t('nav.home'), path: '/' },
          { name: t('nav.contact'), path: '/contact' },
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: t('seo.contact.title'),
          url: '/contact',
          mainEntity: {
            '@type': 'Organization',
            name: 'HQ Stones',
            telephone: PHONE,
            email: 'info@hqstones.example',
            areaServed: 'Worldwide',
          },
        }}
      />
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
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-accent" />
              <a href={`tel:${PHONE_TEL}`} className="hover:text-accent">
                {PHONE}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 text-accent" />
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                WhatsApp
              </a>
            </div>
          </div>

        </aside>
      </section>
    </Layout>
  );
};

export default Contact;
