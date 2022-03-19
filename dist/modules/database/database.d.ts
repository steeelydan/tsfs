import { Sequelize } from 'sequelize';
import { TSFSDbConfig } from '../../types';
export declare const create: (dbConfig: TSFSDbConfig) => Promise<Sequelize>;
