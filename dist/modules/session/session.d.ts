import { Sequelize } from 'sequelize/types';
import { Express, RequestHandler } from 'express';
export declare const setup: (app: Express, sequelize: Sequelize, sessionMaxAge: number) => {
    sessionMiddleware: RequestHandler;
};
