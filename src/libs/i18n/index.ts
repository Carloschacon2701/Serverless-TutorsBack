import i18next, { Resource } from "i18next";
import { EN } from "./locales/en";
import { ES } from "./locales/es";

const resources: Resource = {
  en: {
    translation: { ...EN },
  },
  es: {
    translation: { ...ES },
  },
};

i18next.init({
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
