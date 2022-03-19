import { Logger } from 'winston';
export declare type TSFSCreationAttributes<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export declare type TSFSUserRole = 'admin' | 'user';
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
export declare type TSFSPathConfig = {
    publicDirPath?: string;
    envPath?: string;
    manifestFilePath?: string;
    viewsDirPath?: string;
    logfileDirPath?: string;
};
export declare type TSFSRequiredEnvVars = string[];
export declare type TSFSValidEnvValues = Record<string, string[] | ((...args: string[]) => boolean)>;
export declare type TSFSDbOptions = {
    logging: boolean;
    storage: string;
    dialect: 'sqlite';
};
export declare type TSFSDbConfig = {
    development?: TSFSDbOptions;
    test?: TSFSDbOptions;
    production?: TSFSDbOptions;
};
