import i18next from 'i18next';
import { default as i18nextMiddleware } from 'i18next-http-middleware';
export const setup = async (app, translations, defaultLanguage) => {
    if (!translations) {
        throw new Error('No translations configured.');
    }
    await i18next.init({
        lng: defaultLanguage,
        debug: false,
        resources: translations,
        fallbackLng: defaultLanguage
    });
    await i18next.use(i18nextMiddleware.LanguageDetector).init({
        detection: { order: ['cookie'] },
        preload: [defaultLanguage]
    });
    app.use(i18nextMiddleware.handle(i18next));
};
