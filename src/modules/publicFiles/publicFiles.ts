import express, { Express } from 'express';
import { checkIfPathExistsAndIsAbsolute } from '../../helpers.js';
import { TSFSPathConfig } from '../../types';

export const serve = (app: Express, tsfsPathConfig: TSFSPathConfig): void => {
    checkIfPathExistsAndIsAbsolute(tsfsPathConfig.publicDirPath, 'publicDirPath');
    tsfsPathConfig.publicDirPath && app.use(express.static(tsfsPathConfig.publicDirPath));
};
