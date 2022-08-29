import dotenv from 'dotenv';
import { Checks } from '../../index.js';
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
        Checks.checkConfigFiles(tsfsPathConfig);
    }

    if (checkEnv) {
        Checks.checkEnv(requiredEnvVars, validEnvValues);
    }

    if (checkPublicDir) {
        Checks.checkPublicDir(tsfsPathConfig);
    }
};
