import http from 'http';
import https from 'https';
import { Express } from 'express';
export declare const create: (app: Express) => http.Server | https.Server;
