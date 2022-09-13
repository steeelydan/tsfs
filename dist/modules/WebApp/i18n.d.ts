import { Resource } from 'i18next';
import { Express } from 'express';
export declare const setup: (app: Express, translations: Resource, defaultLanguage: 'de' | 'en') => Promise<void>;
