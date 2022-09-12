import express from 'express';
import { existsSync, lstatSync } from 'fs';
import isAbsolute from 'is-absolute';
export const serve = (app, publicFilesPath) => {
    if (!existsSync(publicFilesPath)) {
        throw new Error('Public files path does not exist: ' + publicFilesPath);
    }
    if (!isAbsolute(publicFilesPath) || !lstatSync(publicFilesPath).isDirectory()) {
        throw new Error('Public files path must be absolute and a directory. Received: ' + publicFilesPath);
    }
    app.use(express.static(publicFilesPath));
};
