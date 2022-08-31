import { create } from 'express-handlebars';
import i18next from 'i18next';
import fs from 'fs';
const setupHandlebars = (app, manifestFilePath) => {
    console.log('Client manifest updated.');
    let assetMap;
    if (fs.existsSync(manifestFilePath)) {
        assetMap = JSON.parse(fs.readFileSync(manifestFilePath, 'utf-8'));
    }
    else {
        throw new Error('No assets manifest file found.');
    }
    const hbs = create({
        extname: 'hbs',
        helpers: {
            i18n: (translationPath) => {
                return i18next.t(translationPath);
            },
            asset: (assetKey) => {
                return 'assets/' + assetMap[assetKey];
            }
        }
    });
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
};
export const setup = (app, tsfsPathConfig) => {
    if (!tsfsPathConfig.manifestFilePath) {
        throw new Error('Manifest file path has to be configured');
    }
    if (!tsfsPathConfig.viewsDirPath) {
        throw new Error('Views path has to be configured');
    }
    if (process.env.NODE_ENV === 'development') {
        setupHandlebars(app, tsfsPathConfig.manifestFilePath);
        fs.watchFile(tsfsPathConfig.manifestFilePath, { interval: 100 }, () => {
            if (!tsfsPathConfig.manifestFilePath) {
                throw new Error('Manifest file path has to be configured');
            }
            setupHandlebars(app, tsfsPathConfig.manifestFilePath);
        });
    }
    else {
        setupHandlebars(app, tsfsPathConfig.manifestFilePath);
    }
    app.set('views', tsfsPathConfig.viewsDirPath);
    app.use((req, res, next) => {
        res.locals.csrfToken = req.csrfToken();
        next();
    });
};
