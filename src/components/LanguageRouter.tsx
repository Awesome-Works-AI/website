import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet, useParams } from 'react-router-dom';

const SUPPORTED_LANGUAGES = ['pl', 'en'];
const DEFAULT_LANGUAGE = 'pl';

export function LanguageRouter() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && SUPPORTED_LANGUAGES.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  // If no language or invalid language, redirect to default
  if (!lang || !SUPPORTED_LANGUAGES.includes(lang)) {
    return <Navigate to={`/${DEFAULT_LANGUAGE}`} replace />;
  }

  return <Outlet />;
}

export function LanguageRedirect() {
  // Detect browser language or use default
  const browserLang = navigator.language.split('-')[0];
  const targetLang = SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : DEFAULT_LANGUAGE;
  
  return <Navigate to={`/${targetLang}`} replace />;
}
