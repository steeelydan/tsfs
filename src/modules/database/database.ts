import { Sequelize, Options } from 'sequelize';
import { DbConfig } from '../../coreTypes';

export const create = async (dbConfig: DbConfig): Promise<Sequelize> => {
    if (
        !process.env.NODE_ENV ||
        (process.env.NODE_ENV !== 'production' &&
            process.env.NODE_ENV !== 'development' &&
            process.env.NODE_ENV !== 'test')
    ) {
        throw new Error('Database init: No NODE_ENV specified.');
    }

    const sequelize = new Sequelize((dbConfig as DbConfig)[process.env.NODE_ENV] as Options);

    console.log('Database initialized, env: ' + process.env.NODE_ENV);

    return sequelize;
};
