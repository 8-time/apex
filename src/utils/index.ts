import * as locale from 'date-fns/locale';
import i18n from '../localization';

// eslint-disable-next-line import/prefer-default-export
export const getDateFnsCurrentLocale = (): Locale | undefined => {
  const currentLocaleSign = i18n.currentLocale().slice(0, 2);
  const dateLocale =
    (currentLocaleSign === 'en' && 'enUS') ||
    (currentLocaleSign === 'ru' && 'ru') ||
    undefined;

  return dateLocale && locale[dateLocale];
};
