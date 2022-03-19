import dotenv from 'dotenv';
import { checks } from '../../index.js';
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
        checks.checkConfigFiles(tsfsPathConfig);
    }

    if (checkEnv) {
        checks.checkEnv(requiredEnvVars, validEnvValues);
    }

    if (checkPublicDir) {
        checks.checkPublicDir(tsfsPathConfig);
    }
};
