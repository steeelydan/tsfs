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

    if (!(config.dialect === 'postgres' || config.dialect === 'sqlite')) {
        throw new Error('Database init: dialect must be either postgres or sqlite');
    }

    if (config.dialect === 'postgres') {
        if (!process.env.POSTGRES_HOST) {
            throw new Error('Database init: POSTGRES_HOST must be set in environment variables');
        }
        if (!process.env.POSTGRES_PORT) {
            throw new Error('Database init: POSTGRES_PORT must be set in environment variables');
        }
        if (!process.env.POSTGRES_USERNAME) {
            throw new Error('Database init: POSTGRES_USERNAME must be set in environment variables');
        }
        if (!process.env.POSTGRES_PASSWORD) {
            throw new Error('Database init: POSTGRES_PASSWORD must be set in environment variables');
        }
        if (!process.env.POSTGRES_DATABASE) {
            throw new Error('Database init: POSTGRES_DATABASE must be set in environment variables');
        }
    }

    const sequelize = new Sequelize(config);

    if (config.dialect === 'sqlite') {
        console.log(`Database initialized, env: ${process.env.NODE_ENV}, dialect: ${config.dialect}`);
    } else {
        console.log(
            `Database initialized, env: ${process.env.NODE_ENV}, dialect: ${config.dialect}, host: ${config.host}, port: ${config.port}, username: ${config.username}, database: ${config.database}`
        );
    }

    return sequelize;
};
