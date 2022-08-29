import { TSFSDbConfig } from '../../types';
import { Sequelize } from 'sequelize';
export declare const create: (dbConfig: TSFSDbConfig) => Promise<Sequelize>;
