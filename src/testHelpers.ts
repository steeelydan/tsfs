import { Sequelize } from 'sequelize/types';
import { Database } from '.';
import { TSFSDbConfig } from './types.js';

export const getTestDatabase = async (dbConfig: TSFSDbConfig): Promise<Sequelize> => {
    process.env.NODE_ENV = 'test';

    const db = await Database.create(dbConfig);

    return db;
};
