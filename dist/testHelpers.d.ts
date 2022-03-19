import { Sequelize } from 'sequelize';
import { TSFSDbConfig } from './types.js';
export declare const getTestDatabase: (dbConfig: TSFSDbConfig) => Promise<Sequelize>;
