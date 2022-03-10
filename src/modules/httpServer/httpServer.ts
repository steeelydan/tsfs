import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Express } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const create = (app: Express): http.Server | https.Server => {
    let server;

    if (process.env.NODE_ENV === 'development') {
        server = https.createServer(
            {
                key: fs.readFileSync(path.join(__dirname, '../../../ssl-dev/server.key'), 'utf-8'),
                cert: fs.readFileSync(path.join(__dirname, '../../../ssl-dev/server.cert'), 'utf-8')
            },
            app
        );
    } else {
        server = http.createServer(app);
    }

    return server;
};
