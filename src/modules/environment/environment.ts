import dotenv from 'dotenv';
import { Base } from '../../index.js';
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
        Base.Checks.checkConfigFiles(tsfsPathConfig);
    }

    if (checkEnv) {
        Base.Checks.checkEnv(requiredEnvVars, validEnvValues);
    }

    if (checkPublicDir) {
        Base.Checks.checkPublicDir(tsfsPathConfig);
    }
};
