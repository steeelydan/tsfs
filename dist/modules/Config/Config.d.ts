import { Environment } from '../../types.js';
/**
 * TSFSs Config
 */
export declare class Config {
    private static environment;
    /**
     * Reads the .env file and prepares process.env & checks if all environment variables are set
     */
    static setupEnvironment: (envPathAbsolute: string) => void;
    static getEnvironment: () => Environment;
}
