import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './en';
import ru from './ru';

i18n.translations = {
  en,
  ru,
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;
