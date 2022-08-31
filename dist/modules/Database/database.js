import { Sequelize } from 'sequelize';
export const create = async (dbConfig) => {
    if (!process.env.NODE_ENV ||
        (process.env.NODE_ENV !== 'production' &&
            process.env.NODE_ENV !== 'development' &&
            process.env.NODE_ENV !== 'test')) {
        throw new Error('Database init: No NODE_ENV specified.');
    }
    const sequelize = new Sequelize(dbConfig[process.env.NODE_ENV]);
    console.log('Database initialized, env: ' + process.env.NODE_ENV);
    return sequelize;
};
