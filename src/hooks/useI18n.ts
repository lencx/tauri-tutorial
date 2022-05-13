import { useTranslation } from 'react-i18next';

export default function useI18n(ns: string[]) {
  const { t } = useTranslation(ns);
  return t;
}