import { Options } from 'sequelize/types';
import { Logger } from 'winston';
export declare type ValidNodeEnvs = 'development' | 'production' | 'test';
export declare type Environment = {
    NODE_ENV: ValidNodeEnvs;
    SESSION_SECRET: null | string;
    PORT: number;
};
export declare type TSFSCreationAttributes<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export declare type TSFSTestRole = 'admin' | 'editor' | 'user';
export declare type TSFSRequestUser = {
    id: string;
    username: string;
    role: string;
};
declare global {
    namespace Express {
        interface User extends TSFSRequestUser {
        }
    }
}
export declare type TSFSLogger = Logger;
export declare type TSFSRequiredEnvVars = string[];
export declare type TSFSValidEnvValues = Record<string, string[] | ((...args: string[]) => boolean)>;
interface TSFSSequelizeOptions extends Options {
    dialect: 'sqlite' | 'postgres';
}
export declare type TSFSDbConfig = {
    development?: TSFSSequelizeOptions;
    test?: TSFSSequelizeOptions;
    production?: TSFSSequelizeOptions;
};
export {};
