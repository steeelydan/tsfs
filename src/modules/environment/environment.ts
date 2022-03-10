import dotenv from 'dotenv';
import { checks } from '../../index.js';
import { TSFSPathConfig, EnvVars, ValidEnvValues } from '../../coreTypes';

export const setup = (
    tsfsPathConfig: TSFSPathConfig,
    requiredEnvVars: EnvVars,
    validEnvValues: ValidEnvValues,
    checkConfigFiles = true,
    checkEnv = true,
    checkPublicDir = true
): void => {
    dotenv.config({ path: tsfsPathConfig.envPath });

    if (checkConfigFiles) {
        checks.checkConfigFiles(tsfsPathConfig);
    }

    if (checkEnv) {
        checks.checkEnv(requiredEnvVars, validEnvValues);
    }

    if (checkPublicDir) {
        checks.checkPublicDir(tsfsPathConfig);
    }
};
