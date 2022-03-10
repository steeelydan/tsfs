import { Sequelize } from 'sequelize';
import { Express } from 'express';
export declare const setup: (app: Express, sequelize: Sequelize, sessionMaxAge: number) => void;
