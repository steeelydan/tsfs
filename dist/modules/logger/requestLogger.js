import morgan from 'morgan';
export const setup = (generalLogger, app) => {
    const requestLogger = morgan(
    // @ts-ignore
    ':remote-addr - :remote-user :method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent - :response-time ms', { stream: generalLogger.stream });
    app.use(requestLogger);
};
