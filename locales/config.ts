import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// https://github.com/i18next/i18next-browser-languageDetector
import LanguageDetector from 'i18next-browser-languagedetector';

import { fmtI18n } from '@/utils/tools';

import common from './common';
import tip from './tip';
// views
import dashboard from './dashboard';
import tools from './tools';
import game from './game';
import rules from './rules';

const i18nData = fmtI18n(common, tip, dashboard, tools, game, rules);

export const resources = i18nData[0];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // lng: 'en',
    fallbackLng: 'en',
    resources,
    ns: i18nData[1],
    detection: {
      caches: ['localStorage', 'sessionStorage', 'cookie'],
      lookupQuerystring: 'ombLng',
      lookupCookie: 'ombLng',
      lookupLocalStorage: 'ombLng',
      lookupSessionStorage: 'ombLng',
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });