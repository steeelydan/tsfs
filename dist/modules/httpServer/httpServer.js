import http from 'http';
import https from 'https';
import { devTlsCert, devTlsKey } from '../../devTlsCert.js';
export const create = (app) => {
    let server;
    if (process.env.NODE_ENV === 'development') {
        server = https.createServer({
            key: devTlsKey,
            cert: devTlsCert
        }, app);
        console.info('Started a development HTTPS web server with fake TLS keys');
    }
    else {
        server = http.createServer(app);
        console.info('Started a production HTTP web server');
    }
    return server;
};
