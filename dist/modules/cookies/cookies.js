import cookieParser from 'cookie-parser';
export const setup = (app) => {
    app.use(cookieParser(process.env.SESSION_SECRET));
};
