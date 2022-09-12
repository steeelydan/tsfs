import { TSFSDbConfig } from '../../types';
import { Sequelize } from 'sequelize';

export const create = async (dbConfig: TSFSDbConfig): Promise<Sequelize> => {
    if (
        !process.env.NODE_ENV ||
        (process.env.NODE_ENV !== 'production' &&
            process.env.NODE_ENV !== 'development' &&
            process.env.NODE_ENV !== 'test')
    ) {
        throw new Error('Database init: No NODE_ENV specified.');
    }

    const config = dbConfig[process.env.NODE_ENV];

    if (!config) {
        throw new Error('Database init: No configuration for NODE_ENV ' + process.env.NODE_ENV);
    }

    const sequelize = new Sequelize(config);

    console.log('Database initialized, env: ' + process.env.NODE_ENV);

    return sequelize;
};
