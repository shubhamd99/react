import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

import moment from "moment";

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languagedetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      format: (value, format, lng) => {
        if (format === "uppercase") return value.toUpperCase();
        if (value instanceof Date) {
          if (format === "DATE_HUGE") {
            return new Intl.DateTimeFormat(lng, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(value);
          }
          if (format === "DATE_LONG") {
            return moment(value).locale(lng).format("LLLL");
          }
          if (format === "TIME_SIMPLE") {
            return moment(value).locale(lng).format("LT");
          }
        }

        if (format === "currency") {
          const currencyMap = {
            en: "USD",
            hi: "INR",
            es: "EUR",
          };
          return new Intl.NumberFormat(lng, {
            style: "currency",
            currency: currencyMap[lng] || "USD",
          }).format(value);
        }
        if (format === "NUMBER") {
          return new Intl.NumberFormat(lng).format(value);
        }
        return value;
      },
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
