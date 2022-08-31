import csurf from 'csurf';
import { Express } from 'express';

const setup = (app: Express): void => {
    const csrfProtection = csurf({
        cookie: false
    });

    app.use(csrfProtection);
};

export { setup };
