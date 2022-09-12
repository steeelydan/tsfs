import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import isAbsolute from 'is-absolute';
import { Environment, ValidNodeEnvs } from '../../types.js';
// import { checkConfigFiles, checkEnv, checkPublicDir } from '../checks/checks.js';

const validateAndCastEnvValues = (
    rawNodeEnv: string | undefined,
    rawPort: string | undefined,
    rawSessionSecret: string | undefined
): Environment => {
    if (!rawNodeEnv) {
        throw new Error('NODE_ENV env variable must be set.');
    }

    if (!rawPort) {
        throw new Error('PORT env variable must be set.');
    }

    if (!rawSessionSecret) {
        throw new Error('SESSION_SECRET env variable must be set.');
    }

    const nodeEnvCheckValues: ValidNodeEnvs[] = ['development', 'production', 'test'];

    if (!nodeEnvCheckValues.includes(rawNodeEnv as ValidNodeEnvs)) {
        throw new Error('NODE_ENV env variable must be one of: development, test, production');
    }

    if (isNaN(parseInt(rawPort))) {
        throw new Error('PORT env variable must be a valid port number');
    }

    return { NODE_ENV: rawNodeEnv as ValidNodeEnvs, PORT: parseInt(rawPort), SESSION_SECRET: rawSessionSecret };
};

/**
 * TSFSs Config
 */
export class Config {
    private static environment: Environment;

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
     * @param dotEnvFileDir .env file directory. If not specified, env vars are read from the shell environment.
     */
    static setupEnvironment = (dotEnvFileDir?: string): void => {
        if (dotEnvFileDir) {
            if (!isAbsolute(dotEnvFileDir)) {
                throw new Error('Environment path must be absolute. Current value: ' + dotEnvFileDir);
            }

            const envFilePath = path.join(dotEnvFileDir, '.env');

            if (!fs.existsSync(envFilePath) || !fs.lstatSync(envFilePath).isFile()) {
                throw new Error('No .env file found under: ' + envFilePath);
            }

            console.log('Reading environment variables from .env file');

            dotenv.config({ path: envFilePath });
        } else {
            console.log('Reading environment variables from shell');
        }

        this.environment = validateAndCastEnvValues(process.env.NODE_ENV, process.env.PORT, process.env.SESSION_SECRET);

        if (this.environment) {
            console.info('TSFS initialized in environment: ' + this.environment.NODE_ENV);
        }
    };
    static getEnvironment = (): Environment => {
        if (!this.environment) {
            throw new Error('Environment has to be initialized with Config.setupEnvironment()');
        }

        return this.environment;
    };
}
