import express, { Request, Response } from 'express';
import supertest from 'supertest';
import { Cookies } from '../..';

describe('Cookies', () => {
    it('Does not have cookies without middleware', async () => {
        const app = express();

        let reqCookies;

        app.get('/', (req: Request, res: Response) => {
            reqCookies = req.cookies;
            return res.send('without cookies');
        });

        await supertest(app).get('/').set('Cookie', ['testcookie=1234']);

        expect(reqCookies).toBe(undefined);
    });

    it('Has cookies with middleware', async () => {
        const app = express();
        Cookies.setup(app);

        let reqCookies;

        app.get('/', (req: Request, res: Response) => {
            reqCookies = req.cookies;
            return res.send('with cookies');
        });

        await supertest(app).get('/').set('Cookie', ['testcookie=1234', 'cookie2=hello']);

        expect(reqCookies).toEqual({ testcookie: '1234', cookie2: 'hello' });
    });
});
