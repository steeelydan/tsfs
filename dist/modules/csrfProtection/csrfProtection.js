import csurf from 'csurf';
const setup = (app) => {
    const csrfProtection = csurf({
        cookie: false
    });
    app.use(csrfProtection);
};
export { setup };
