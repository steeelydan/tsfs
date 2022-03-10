import { Sequelize } from 'sequelize';
import { DbConfig } from './coreTypes.js';
export declare const getTestDatabase: (dbConfig: DbConfig) => Promise<Sequelize>;
