import http from 'http';
import https from 'https';
import { Express } from 'express';
export declare const create: (app: Express, devSslKey?: string | undefined, devSslCert?: string | undefined) => http.Server | https.Server;
