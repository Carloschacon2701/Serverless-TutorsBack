import i18n from "..";

interface Handler {
  event: {
    headers: {
      "Accept-Language": string;
    };
  };
}

export const i18nMiddleware = () => {
  return {
    before: async (handler: Handler) => {
      const language = handler.event.headers["Accept-Language"] || "en";

      await i18n.changeLanguage(language);
    },
  };
};
