import { Sequelize } from 'sequelize/types';
import { TSFSDbConfig } from './types.js';
export declare const getTestDatabase: (dbConfig: TSFSDbConfig) => Promise<Sequelize>;
