import { create } from 'express-handlebars';
import i18next from 'i18next';
import fs from 'fs';
const setupHandlebars = (app, viewsInBuildDirPath, manifestFilePath, layoutsDirPath) => {
    console.log('Client manifest updated.');
    let assetMap = null;
    if (manifestFilePath) {
        if (fs.existsSync(manifestFilePath)) {
            assetMap = JSON.parse(fs.readFileSync(manifestFilePath, 'utf-8'));
        }
        else {
            throw new Error('No assets manifest file found.');
        }
    }
    const hbs = create({
        extname: 'hbs',
        defaultLayout: false,
        layoutsDir: layoutsDirPath,
        // FIXME layout dir
        helpers: {
            i18n: (translationPath) => {
                return i18next.t(translationPath);
            },
            asset: assetMap
                ? (assetKey) => {
                    return assetMap[assetKey];
                }
                : undefined
        }
    });
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
};
/**
 *
 * @param app The Express app
 * @param viewsInBuildDirPath The path for the views. When using TS, choose the templates in the build dir.
 * @param manifestFilePath The path for the bundler-generated manifest file (only webpack supported atm)
 * @param layoutsDirPath The path for handlebars layouts (optional; uses viewsInBuildDirPath/layouts per default)
 */
export const setup = (app, viewsInBuildDirPath, manifestFilePath, layoutsDirPath) => {
    if (!viewsInBuildDirPath) {
        throw new Error('Views path has to be configured');
    }
    setupHandlebars(app, viewsInBuildDirPath, manifestFilePath, layoutsDirPath);
    if (process.env.NODE_ENV === 'development') {
        if (manifestFilePath) {
            console.log(`Views engine setup in development mode with manifest file path.\nViews path: ${viewsInBuildDirPath}\nManifest file path: ${manifestFilePath}\nWatching manifest file path.`);
            fs.watchFile(manifestFilePath, { interval: 100 }, () => {
                setupHandlebars(app, viewsInBuildDirPath, manifestFilePath, layoutsDirPath);
            });
        }
        else {
            console.log(`Views engine setup in development mode without manifest file.\nViews path: ${viewsInBuildDirPath}`);
        }
    }
    else {
        if (manifestFilePath) {
            console.log(`Views engine setup in production mode with manifest file.\nViews path: ${viewsInBuildDirPath}\n Manifest file path: ${manifestFilePath}`);
        }
        else {
            console.log(`Views engine setup in production mode without manifest file.\nViews path: ${viewsInBuildDirPath}`);
        }
    }
    app.set('views', viewsInBuildDirPath);
    // FIXME CSRF Token
    // app.use((req, res, next) => {
    //     res.locals.csrfToken = req.csrfToken();
    //     next();
    // });
};
