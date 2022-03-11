import http from 'http';
import https from 'https';
import { Express } from 'express';

export const create = (app: Express, devSslKey?: string, devSslCert?: string): http.Server | https.Server => {
    let server;

    if (process.env.NODE_ENV === 'development') {
        if (!devSslKey || !devSslCert) {
            throw new Error('Must specify ssl key & cert for dev server.');
        }

        server = https.createServer(
            {
                key: devSslKey,
                cert: devSslCert
            },
            app
        );
    } else {
        server = http.createServer(app);
    }

    return server;
};
