import helmet from 'helmet';
export const setup = (app, helmetConfiguration) => {
    if (helmetConfiguration) {
        app.use(helmet(helmetConfiguration));
    }
    else {
        app.use(helmet());
    }
};
