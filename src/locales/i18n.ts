import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ptBRTranslation from './pt-BR/translation.json';
import enUSTranslation from './en-US/translation.json';

const resources = {
  'pt-BR': {
    translation: ptBRTranslation,
  },
  'en-US': {
    translation: enUSTranslation,
  },
};

const getSavedLanguage = () => {
  const saved = localStorage.getItem('i18nextLng');
  if (saved) return saved;
  const browserLng = navigator.language || navigator.languages?.[0];
  if (browserLng?.startsWith('pt')) return 'pt-BR';
  return 'en-US';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    lng: getSavedLanguage(),
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
