export declare type CreationAttributes<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
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
export declare type TSFSPathConfig = {
    publicDirPath?: string;
    envPath?: string;
    manifestFilePath?: string;
    viewsDirPath?: string;
    logfileDirPath?: string;
};
export declare type EnvVars = string[];
export declare type ValidEnvValues = Record<string, string[] | ((...args: string[]) => boolean)>;
export declare type DbOptions = {
    logging: boolean;
    storage: string;
    dialect: string;
};
export declare type DbConfig = {
    development?: DbOptions;
    test?: DbOptions;
    production?: DbOptions;
};
export declare type TestGlobal = {
    coreTestPathConfig: TSFSPathConfig;
};
