import { Options } from 'sequelize/types';
import { Logger } from 'winston';

export type ValidNodeEnvs = 'development' | 'production' | 'test';

export type Environment = {
    NODE_ENV: ValidNodeEnvs;
    SESSION_SECRET: null | string;
    PORT: number;
};

export type TSFSCreationAttributes<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export type TSFSUserRole = 'admin' | 'user';

export type TSFSRequestUser = {
    id: string;
    username: string;
    role: string;
};

declare global {
    namespace Express {
        interface User extends TSFSRequestUser {}
    }
}

export type TSFSLogger = Logger;

export type TSFSRequiredEnvVars = string[];

export type TSFSValidEnvValues = Record<string, string[] | ((...args: string[]) => boolean)>;

interface TSFSSequelizeOptions extends Options {
    dialect: 'sqlite' | 'postgres';
}

export type TSFSDbConfig = {
    development?: TSFSSequelizeOptions;
    test?: TSFSSequelizeOptions;
    production?: TSFSSequelizeOptions;
};
