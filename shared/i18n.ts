import i18n from 'i18next';
import HttpApi from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { ENVIRONMENT } from '@shared/config';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';

export const defaultLang = 'en';

export const i18nPromise = i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: 'http://localhost:9002/translations/{{lng}}/{{ns}}.json',
      queryStringParams: { v: ENVIRONMENT.REACT_APP_VERSION },
    },
    ns: [
      /* MISC */
      'global',
      'success',
      'error',
      'baseYupError',
      'sidebar',
      'button',

      /* COMPONENTS: app/components */
      'multiLanguageComponents',
      'imageUploadComponent',
    ],
    defaultNS: 'global',
    fallbackNS: ['global'],
    lng: getSelectedLanguage(),
    fallbackLng: defaultLang,
    supportedLngs: ['en', 'tr'],
    debug: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
  });

export type LangKeyType = 'en' | 'tr';

export const changeLanguage = (selectedLanguage: LangKeyType) => {
  i18n.changeLanguage(selectedLanguage);
};

export const getLangKey = () : LangKeyType => {
  if (i18n.language) {
    return i18n.language.split('-')[0] as LangKeyType;
  }
  return getSelectedLanguage() || defaultLang;
};

export const getFullLangKey = () => {
  const rawLanguage = i18n.language;
  if (rawLanguage === 'en') {
    return 'en_US';
  }
  if (rawLanguage === 'tr') {
    return 'tr_TR';
  }
  return rawLanguage;
};

export const t = (translationKey : string, params = {}) => {
  return i18n.t(translationKey, params);
};

export default i18n;
