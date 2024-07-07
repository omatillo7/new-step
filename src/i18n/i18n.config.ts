import { App } from "vue";
import { createI18n } from "vue-i18n";

export type LocaleType = "uz" | "ru";

export const SUPPORT_LOCALES: LocaleType[] = ["uz", "ru"];

export const DEFAULT_LOCALE: LocaleType = "uz";

const storageLocale = localStorage.getItem("lang") == "1" ? "ru" : "uz";

export const LOCALE: LocaleType = SUPPORT_LOCALES.includes(storageLocale)
  ? storageLocale
  : DEFAULT_LOCALE;

import uz from "./locales/uz.json";
import ru from "./locales/ru.json";

const i18n = createI18n({
  locale: LOCALE,
  fallbackLocale: "en",
  legacy: false,
  globalInjection: true,
  silentTranslationWarn: true,
  messages: {
    uz,
    ru,
  },
  datetimeFormats: {
    en: {
      long: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
    },
    ru: {
      long: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
    },
    uz: {
      long: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
    },
  },
  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: "USD",
      },
    },
    ru: {
      currency: {
        style: "currency",
        currency: "RUB",
      },
    },
    uz: {
      currency: {
        style: "currency",
        currency: "UZS",
        currencyDisplay: "symbol",
      },
    },
  },
});

export const setupI18n = (app: App<Element>) => {
  app.use(i18n);
};
