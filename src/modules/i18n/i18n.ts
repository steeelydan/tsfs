import i18next, { Resource } from 'i18next';
import { default as i18nextMiddleware } from 'i18next-http-middleware';
import { Express } from 'express';

export const setup = async (app: Express, translations: Resource): Promise<void> => {
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
        detection: { order: ['cookie'] }, // TBI
        preload: ['en']
    });

    app.use(i18nextMiddleware.handle(i18next));
};
