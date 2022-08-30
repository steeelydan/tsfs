import dotenv from 'dotenv';
import { Config } from '../..';
export const setup = (tsfsPathConfig, requiredEnvVars, validEnvValues, checkConfigFiles = true, checkEnv = true, checkPublicDir = true) => {
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
