import i18next from 'i18next';
import { default as i18nextMiddleware } from 'i18next-http-middleware';
export const setup = async (app, translations) => {
    if (!translations) {
        throw new Error('No translations configured.');
    }
    await i18next.init({
        lng: 'en',
        debug: false,
        resources: translations,
        fallbackLng: 'en'
    });
    await i18next.use(i18nextMiddleware.LanguageDetector).init({
        detection: { order: ['cookie'] },
        preload: ['en']
    });
    app.use(i18nextMiddleware.handle(i18next));
};
