import { Database } from '.';
export const getTestDatabase = async (dbConfig) => {
    process.env.NODE_ENV = 'test';
    const db = await Database.create(dbConfig);
    return db;
};
