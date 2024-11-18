import { I18n } from 'i18n-js';
import { Platform } from 'react-native';
import enTranslations from './translations/en.json';
import hiTranslations from './translations/hi.json';
import bnTranslations from './translations/bn.json';

const i18n = new I18n({
  en: enTranslations,
  hi: hiTranslations,
  bn: bnTranslations,
});

// Handle RTL/LTR based on platform
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export const getDirectionForLocale = (locale: string) => {
  return Platform.select({
    web: locale === 'ar' ? 'rtl' : 'ltr',
    default: 'ltr', // Mobile platforms handle RTL automatically
  });
};

export default i18n; 