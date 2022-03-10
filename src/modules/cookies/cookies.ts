import { Express } from 'express';
import cookieParser from 'cookie-parser';

export const setup = (app: Express): void => {
    app.use(cookieParser(process.env.SESSION_SECRET));
};
