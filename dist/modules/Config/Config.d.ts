import { Environment } from '../../types.js';
/**
 * TSFSs Config
 */
export declare class Config {
    private static environment;
    /**
     * Reads the .env file and prepares process.env & checks if all environment variables are set
     * @param dotEnvFileDir .env file directory. If not specified, env vars are read from the shell environment.
     */
    static setupEnvironment: (dotEnvFileDir?: string) => void;
    static getEnvironment: () => Environment;
}
