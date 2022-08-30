import dotenv from 'dotenv';
import { Config } from '../..';
import { TSFSPathConfig, TSFSRequiredEnvVars, TSFSValidEnvValues } from '../../types';

export const setup = (
    tsfsPathConfig: TSFSPathConfig,
    requiredEnvVars: TSFSRequiredEnvVars,
    validEnvValues: TSFSValidEnvValues,
    checkConfigFiles = true,
    checkEnv = true,
    checkPublicDir = true
): void => {
    dotenv.config({ path: tsfsPathConfig.envPath });

    if (checkConfigFiles) {
        Config.checkConfigFiles(tsfsPathConfig);
    }

    if (checkEnv) {
        Config.checkEnv(requiredEnvVars, validEnvValues);
    }

    if (checkPublicDir) {
        Config.checkPublicDir(tsfsPathConfig);
    }
};
