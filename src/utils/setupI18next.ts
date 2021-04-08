import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translations from '../translations';

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en },
      ru: { translation: translations.ru },
    },
    fallbackLng: 'en',
  });

dayjs.locale(i18next.language);
dayjs.extend(LocalizedFormat);
