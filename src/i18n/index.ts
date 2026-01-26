import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import pl from './locales/pl.json';

// Detect language from URL path (e.g., /en or /pl)
const getLanguageFromPath = (): string => {
  const path = window.location.pathname;
  const langMatch = path.match(/^\/(pl|en)/);
  return langMatch ? langMatch[1] : 'pl';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: { translation: pl },
      en: { translation: en },
    },
    lng: getLanguageFromPath(),
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
