import { Sequelize } from 'sequelize';
import { DbConfig } from '../../coreTypes';
export declare const create: (dbConfig: DbConfig) => Promise<Sequelize>;
