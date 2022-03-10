import { database } from '.';
import { Sequelize } from 'sequelize';
import { DbConfig } from './coreTypes.js';

export const getTestDatabase = async (dbConfig: DbConfig): Promise<Sequelize> => {
    process.env.NODE_ENV = 'test';

    const db = await database.create(dbConfig);

    return db;
};
