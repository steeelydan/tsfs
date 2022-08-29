import http from 'http';
import https from 'https';
export const create = (app, devSslKey, devSslCert) => {
    let server;
    if (process.env.NODE_ENV === 'development') {
        if (!devSslKey || !devSslCert) {
            throw new Error('Must specify ssl key & cert for dev server.');
        }
        server = https.createServer({
            key: devSslKey,
            cert: devSslCert
        }, app);
        console.info('Started a development HTTPS web server with fake TLS keys');
    }
    else {
        server = http.createServer(app);
        console.info('Started a production HTTP web server');
    }
    return server;
};
