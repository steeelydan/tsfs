import { TSFSPathConfig, TSFSRequiredEnvVars, TSFSValidEnvValues } from '../../types';
export declare const checkConfigFiles: (tsfsPathConfig: TSFSPathConfig) => void;
export declare const checkPublicDir: (tsfsPathConfig: TSFSPathConfig) => void;
export declare const checkEnv: (requiredEnvVars: TSFSRequiredEnvVars | undefined, validEnvValues: TSFSValidEnvValues | undefined) => void;
