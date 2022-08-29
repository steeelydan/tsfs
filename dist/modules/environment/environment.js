import dotenv from 'dotenv';
import { Base } from '../../index.js';
export const setup = (tsfsPathConfig, requiredEnvVars, validEnvValues, checkConfigFiles = true, checkEnv = true, checkPublicDir = true) => {
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
