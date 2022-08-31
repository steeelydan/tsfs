import compression from 'compression';
export const useCompression = (app) => {
    app.use(compression());
};
