import { TSFSPathConfig, EnvVars, ValidEnvValues } from '../../coreTypes';
export declare const checkConfigFiles: (tsfsPathConfig: TSFSPathConfig) => void;
export declare const checkPublicDir: (tsfsPathConfig: TSFSPathConfig) => void;
export declare const checkEnv: (requiredEnvVars: EnvVars | undefined, validEnvValues: ValidEnvValues | undefined) => void;
