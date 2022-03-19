import { database } from '.';
export const getTestDatabase = async (dbConfig) => {
    process.env.NODE_ENV = 'test';
    const db = await database.create(dbConfig);
    return db;
};
