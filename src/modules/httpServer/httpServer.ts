import http from 'http';
import https from 'https';
import { Express } from 'express';
import { devTlsCert, devTlsKey } from '../../devTlsCert.js';

export const create = (app: Express): http.Server | https.Server => {
    let server;

    if (process.env.NODE_ENV === 'development') {
        server = https.createServer(
            {
                key: devTlsKey,
                cert: devTlsCert
            },
            app
        );

        console.info('Started a development HTTPS web server with fake TLS keys');
    } else {
        server = http.createServer(app);

        console.info('Started a production HTTP web server');
    }

    return server;
};
