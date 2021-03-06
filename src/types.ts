import { Logger } from 'winston';

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

export type TSFSPathConfig = {
    publicDirPath?: string;
    envPath?: string;
    manifestFilePath?: string;
    viewsDirPath?: string;
    logfileDirPath?: string;
};

export type TSFSRequiredEnvVars = string[];

export type TSFSValidEnvValues = Record<string, string[] | ((...args: string[]) => boolean)>;

export type TSFSDbOptions = {
    logging: boolean;
    storage: string;
    dialect: 'sqlite';
};

export type TSFSDbConfig = {
    development?: TSFSDbOptions;
    test?: TSFSDbOptions;
    production?: TSFSDbOptions;
};
