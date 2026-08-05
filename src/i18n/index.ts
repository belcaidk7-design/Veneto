import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en';
import it from './locales/it';
import fr from './locales/fr';
import de from './locales/de';
import productContentFr from './locales/productContent.fr';
import productContentEn from './locales/productContent.en';
import productContentIt from './locales/productContent.it';
import productContentDe from './locales/productContent.de';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { ...en, productContent: productContentEn } },
      it: { translation: { ...it, productContent: productContentIt } },
      fr: { translation: { ...fr, productContent: productContentFr } },
      de: { translation: { ...de, productContent: productContentDe } },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'it', 'fr', 'de'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
      lookupCookie: 'hqs-lang',
      lookupLocalStorage: 'hqs-lang',
      cookieMinutes: 525600,
      cookieOptions: { path: '/', sameSite: 'lax' },
    },
  });

export default i18n;
