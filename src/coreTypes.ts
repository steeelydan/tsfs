import { Logger } from 'winston';

export type CreationAttributes<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

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

export type EnvVars = string[];

export type ValidEnvValues = Record<string, string[] | ((...args: string[]) => boolean)>;

export type DbOptions = {
    logging: boolean;
    storage: string;
    dialect: string;
};

export type DbConfig = {
    development?: DbOptions;
    test?: DbOptions;
    production?: DbOptions;
};

export type TestGlobal = {
    coreTestPathConfig: TSFSPathConfig;
};
