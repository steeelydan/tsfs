import http from 'http';
import https from 'https';
import fs from 'fs';
import { Express } from 'express';

export const create = (app: Express): http.Server | https.Server => {
    let server;

    if (process.env.NODE_ENV === 'development') {
        server = https.createServer(
            {
                key: fs.readFileSync(new URL('../../../ssl-dev/server.key', import.meta.url)),
                cert: fs.readFileSync(new URL('../../../ssl-dev/server.cert', import.meta.url))
            },
            app
        );
    } else {
        server = http.createServer(app);
    }

    return server;
};
