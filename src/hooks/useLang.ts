import i18n from 'i18next';
import { useState, useEffect } from 'react';

export const useGetLang = () => {
  const [lang, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLang = () => setLanguage(i18n.language);
    i18n.on('languageChanged', handleLang);

    return () => i18n.on('removed', handleLang);
  }, []);

  return lang;
};

export const useSetLang = () => (value: string) =>
  i18n.changeLanguage(value);
