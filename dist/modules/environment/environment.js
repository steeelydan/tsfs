import dotenv from 'dotenv';
import { Checks } from '../../index.js';
export const setup = (tsfsPathConfig, requiredEnvVars, validEnvValues, checkConfigFiles = true, checkEnv = true, checkPublicDir = true) => {
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
