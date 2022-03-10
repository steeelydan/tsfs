import dotenv from 'dotenv';
import { checks } from '../../index.js';
export const setup = (tsfsPathConfig, requiredEnvVars, validEnvValues, checkConfigFiles = true, checkEnv = true, checkPublicDir = true) => {
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
