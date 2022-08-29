import path from 'path';
import supertest from 'supertest';
import express, { Request, Response } from 'express';
import { Cookies } from '../..';
import { CsrfProtection } from '../..';
import { RequestParsers } from '../..';
import { Session } from '../..';
import { getTestDatabase } from '../../testHelpers.js';
import { TSFSDbConfig } from '../../types';

export const dbConfig: TSFSDbConfig = {
    test: {
        logging: false,
        storage: path.resolve('data/db-test.sqlite3'),
        dialect: 'sqlite'
    }
};

describe('CsrfProtection', () => {
    it('Does not have session, does not have csrfToken() on the req without middleware', async () => {
        process.env.SESSION_SECRET = '1234';
        const sequelize = await getTestDatabase(dbConfig);
        const app = express();
        RequestParsers.setup(app);
        Cookies.setup(app);
        Session.setup(app, sequelize, 300);

        let csrf;
        let requestSession;

        app.get('/', (req: Request, res: Response) => {
            csrf = req.csrfToken();
            requestSession = req.session;
            return res.json('okay');
        });

        await supertest(app).get('/');
        expect(requestSession).toBeUndefined();
        expect(csrf).toBeFalsy();
    });

    it('Has csrfToken() on the req with middleware', async () => {
        process.env.SESSION_SECRET = '1234';
        const sequelize = await getTestDatabase(dbConfig);
        const app = express();
        RequestParsers.setup(app);
        Cookies.setup(app);
        Session.setup(app, sequelize, 300);
        CsrfProtection.setup(app);

        let csrf;
        let requestSession;

        app.get('/', (req: Request, res: Response) => {
            csrf = req.csrfToken();
            requestSession = req.session;
            return res.json('okay');
        });

        await supertest(app).get('/');
        expect(requestSession).toBeDefined();
        expect((requestSession as any).csrfSecret).toBeTruthy();
        expect(csrf).toBeTruthy();
    });
});
