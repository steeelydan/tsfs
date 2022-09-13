import { ExpressHandlebars } from 'express-handlebars';
import { Express } from 'express';
/**
 *
 * @param app The Express app
 * @param viewsInBuildDirPath The path for the views. When using TS, choose the templates in the build dir.
 * @param manifestFilePath The path for the bundler-generated manifest file (only webpack supported atm)
 * @param layoutsDirPath The path for handlebars layouts (optional; uses viewsInBuildDirPath/layouts per default)
 */
export declare const setup: (app: Express, viewsInBuildDirPath: string, manifestFilePath?: string, layoutsDirPath?: string) => ExpressHandlebars;
