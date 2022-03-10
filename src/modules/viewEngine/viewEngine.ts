import { create } from 'express-handlebars';
import i18next from 'i18next';
import fs from 'fs';
import { Express } from 'express';
import { TSFSPathConfig } from '../../coreTypes';

const setupHandlebars = (app: Express, manifestFilePath: string): void => {
    console.log('Client manifest updated.');
    let assetMap: Record<string, string>;

    if (fs.existsSync(manifestFilePath)) {
        assetMap = JSON.parse(fs.readFileSync(manifestFilePath, 'utf-8'));
    } else {
        throw new Error('No assets manifest file found.');
    }

    const hbs = create({
        extname: 'hbs',
        helpers: {
            i18n: (translationPath: string) => {
                return i18next.t(translationPath);
            },
            asset: (assetKey: string) => {
                return 'assets/' + assetMap[assetKey];
            }
        }
    });

    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
};

export const setup = (app: Express, tsfsPathConfig: TSFSPathConfig): void => {
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
    } else {
        setupHandlebars(app, tsfsPathConfig.manifestFilePath);
    }

    app.set('views', tsfsPathConfig.viewsDirPath);

    app.use((req, res, next) => {
        res.locals.csrfToken = req.csrfToken();
        next();
    });
};
