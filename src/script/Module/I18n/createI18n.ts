import {VueI18n, createI18n} from 'vue-i18n';
import {isString} from 'lodash-es';
import createTranslations from './translation';

const I18N_FALLBACK_LOCALE = 'en_US';

const getCurrentLocale = () => {
  const currentLanguage = navigator.language;
  if (isString(currentLanguage)) {
    return currentLanguage.slice(0, 2).toLowerCase();
  }
  return I18N_FALLBACK_LOCALE;
};

export const create = (): VueI18n => {
  const currentLocale = getCurrentLocale();
  return createI18n({
    fallbackLocale: I18N_FALLBACK_LOCALE,
    locale: currentLocale,
    messages: createTranslations(),
  }).global;
};

export const register = async () =>{
  return {
    i18n: create(),
  };
};
