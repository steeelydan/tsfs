var _a;
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import isAbsolute from 'is-absolute';
// import { checkConfigFiles, checkEnv, checkPublicDir } from '../checks/checks.js';
const validateAndCastEnvValues = (rawNodeEnv, rawPort, rawSessionSecret) => {
    if (!rawNodeEnv) {
        throw new Error('NODE_ENV env variable must be set.');
    }
    if (!rawPort) {
        throw new Error('PORT env variable must be set.');
    }
    if (!rawSessionSecret) {
        throw new Error('SESSION_SECRET env variable must be set.');
    }
    const nodeEnvCheckValues = ['development', 'production', 'test'];
    if (!nodeEnvCheckValues.includes(rawNodeEnv)) {
        throw new Error('NODE_ENV env variable must be one of: development, test, production');
    }
    if (isNaN(parseInt(rawPort))) {
        throw new Error('PORT env variable must be a valid port number');
    }
    return { NODE_ENV: rawNodeEnv, PORT: parseInt(rawPort), SESSION_SECRET: rawSessionSecret };
};
/**
 * TSFSs Config
 */
export class Config {
}
_a = Config;
// /**
//  * Verifies existence of required config files
//  */
// static checkConfigFiles = checkConfigFiles;
// /**
//  * Checks if all required environment variables are set.
//  *
//  * @param requiredEnvVars List of required environment variables
//  * @param validEnvValues Valid values for env variables. Can be an array of values or a function returning true if value is valid.
//  */
// static checkEnv = checkEnv;
// /**
//  * Checks existence of public dir in build folder.
//  *
//  * If not exists, probably client has not been built yet.
//  */
// static checkPublicDir = checkPublicDir;
/**
 * Reads the .env file and prepares process.env & checks if all environment variables are set
 */
Config.setupEnvironment = (dotEnvFilePath) => {
    if (dotEnvFilePath) {
        if (!isAbsolute(dotEnvFilePath)) {
            throw new Error('Environment path must be absolute. Current value: ' + dotEnvFilePath);
        }
        const envFilePath = path.join(dotEnvFilePath, '.env');
        if (!fs.existsSync(envFilePath) || !fs.lstatSync(envFilePath).isFile()) {
            throw new Error('No .env file found under: ' + envFilePath);
        }
        dotenv.config({ path: envFilePath });
    }
    _a.environment = validateAndCastEnvValues(process.env.NODE_ENV, process.env.PORT, process.env.SESSION_SECRET);
    if (_a.environment) {
        console.info('TSFS initialized in environment: ' + _a.environment.NODE_ENV);
    }
};
Config.getEnvironment = () => {
    if (!_a.environment) {
        throw new Error('Environment has to be initialized with Config.setupEnvironment()');
    }
    return _a.environment;
};
