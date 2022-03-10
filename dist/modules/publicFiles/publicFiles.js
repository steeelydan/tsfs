import express from 'express';
import { checkIfPathExistsAndIsAbsolute } from '../../helpers.js';
export const serve = (app, tsfsPathConfig) => {
    checkIfPathExistsAndIsAbsolute(tsfsPathConfig.publicDirPath, 'publicDirPath');
    tsfsPathConfig.publicDirPath && app.use(express.static(tsfsPathConfig.publicDirPath));
};
