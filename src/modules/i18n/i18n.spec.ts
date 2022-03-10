import supertest from 'supertest';
import express, { Request, Response } from 'express';
import { i18n } from '../..';

beforeAll(() => {
    process.env.NODE_ENV = 'test';
});

describe('i18n: Setup', () => {
    it('has no i18n attached without init', async () => {
        const app = express();

        let request: undefined | Express.Request;

        app.get('/', (req: Request, res: Response) => {
            request = req;
            return res.send('Hello headers');
        });

        await supertest(app).get('/');

        expect(request?.i18n).toBeUndefined();
        expect(request?.t).toBeUndefined();
    });

    it('has i18n attached after init', async () => {
        const app = express();

        await i18n.setup(app, {
            en: {
                translation: {
                    common: {
                        appTitle: 'App'
                    }
                }
            }
        });

        let request: undefined | Express.Request;

        app.get('/', (req: Request, res: Response) => {
            request = req;
            return res.send('Hello headers');
        });

        await supertest(app).get('/');

        expect(request?.i18n).not.toBeUndefined();
        expect(typeof request?.t).toBe('function');
    });
});
