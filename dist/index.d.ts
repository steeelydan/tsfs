/// <reference types="express" />
/// <reference types="passport" />
/// <reference types="qs" />
/// <reference types="node" />
/// <reference types="node" />
export * from './types.js';
export declare const Authentication: {
    /**
     * Sets up Passport.js authentication.
     *
     * Requires prior setup: **cookies**, **requestParsers**, **session**, and your app's **models**
     *
     * @param app: Express application
     * @param User: User model
     *
     * @returns {passport: PassportStatic}
     */
    setup: (app: import("express").Express, User: {
        findOne: (where: {
            where: {
                username?: string | undefined;
                id?: string | undefined;
            };
        }) => any;
    }) => {
        passport: import("passport").PassportStatic;
    };
    /**
     * Middleware to authenticate a request if **username** & **password** fields in query or body are correct.
     * Typically used at the /login endpoint.
     * Wrapper around Passport's authenticate('local').
     * Creates a session. Requires authentication to be setup.
     */
    authenticateLocal: any;
    /**
     * Middleware to block unauthenticated requests from accessing the endpoint
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     */
    mustBeAuthenticated: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
    /**
     * Middleware to block non-admin requests from accessing the endpoint
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     */
    mustBeAdmin: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
};
export declare const Checks: {
    /**
     * Verifies existence of required config files
     */
    checkConfigFiles: (tsfsPathConfig: import("./types.js").TSFSPathConfig) => void;
    /**
     * Checks if all required environment variables are set.
     *
     * @param requiredEnvVars List of required environment variables
     * @param validEnvValues Valid values for env variables. Can be an array of values or a function returning true if value is valid.
     */
    checkEnv: (requiredEnvVars: import("./types.js").TSFSRequiredEnvVars | undefined, validEnvValues: import("./types.js").TSFSValidEnvValues | undefined) => void;
    /**
     * Checks existence of public dir in build folder.
     *
     * If not exists, probably client has not been built yet.
     */
    checkPublicDir: (tsfsPathConfig: import("./types.js").TSFSPathConfig) => void;
};
export declare const Cookies: {
    setup: (app: import("express").Express) => void;
};
export declare const CsrfProtection: {
    /**
     * Sets up CSRF protection via the double submit cookie pattern
     * (https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie)
     *
     * Requires cookie parser middleware before!
     *
     * @param app Express application
     */
    setup: (app: import("express").Express) => void;
};
export declare const Database: {
    /**
     * Sets up a database instance according to model definitions.
     *
     * @returns Sequelize instance
     */
    create: (dbConfig: import("./types.js").TSFSDbConfig) => Promise<import("sequelize/types/sequelize.js").Sequelize>;
};
export declare const Environment: {
    /**
     * Reads the .env file and prepares process.env, checks if all environment variables are set & checks if public dir exists
     */
    setup: (tsfsPathConfig: import("./types.js").TSFSPathConfig, requiredEnvVars: import("./types.js").TSFSRequiredEnvVars, validEnvValues: import("./types.js").TSFSValidEnvValues, checkConfigFiles?: boolean, checkEnv?: boolean, checkPublicDir?: boolean) => void;
};
export declare const Headers: {
    setup: (app: import("express").Express, helmetConfiguration?: Readonly<import("helmet").HelmetOptions> | undefined) => void;
};
/**
 * TSFS's implementation of a Node server.
 */
export declare const HttpServer: {
    /**
     * Create the application server.
     *
     * Fake HTTPS in dev; HTTP in prod (where you'll certainly use a proxy before it)
     *
     * @param app: Express application
     * @returns a Node HTTP(S) server
     */
    create: (app: import("express").Express) => import("http").Server | import("https").Server;
};
export declare const I18n: {
    setup: (app: import("express").Express, translations: import("i18next").Resource) => Promise<void>;
};
export declare const Loggers: {
    createGeneralLogger: (tsfsPathConfig: import("./types.js").TSFSPathConfig) => import("winston").Logger;
    setupRequestLogger: (generalLogger: import("winston").Logger, app: import("express").Express) => void;
};
export declare const Performance: {
    /**
     * Compression for lower response sizes
     *
     * Overrides res.end() etc. -> has to be in front of middlewares who might send a response
     *
     * @param app Express Application
     */
    useCompression: (app: import("express").Express) => void;
};
export declare const PublicFiles: {
    serve: (app: import("express").Express, tsfsPathConfig: import("./types.js").TSFSPathConfig) => void;
};
export declare const RateLimiting: {
    /**
     * Creates a rate limiting middleware with the specified allowed hits per minute.
     *
     * @param hitsPerMinute The allowed requests per minute per user/IP
     */
    createRateLimiter: (hitsPerMinute: number) => import("express-rate-limit").RateLimitRequestHandler;
};
export declare const RequestParsers: {
    /**
     * Enables query string (req.query) & json body (req.body) parsing
     *
     * @param app Express application
     */
    setup: (app: import("express").Express) => void;
};
export declare const Session: {
    /**
     * Sets up sessions
     *
     * @param app Express application
     * @param sequelize Sequelize instance
     * @param config Global app config
     *
     * @returns {sessionMiddleware: RequestHandler}
     */
    setup: (app: import("express").Express, sequelize: import("sequelize/types/sequelize.js").Sequelize, sessionMaxAge: number) => {
        sessionMiddleware: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    };
};
export declare const ViewEngine: {
    setup: (app: import("express").Express, tsfsPathConfig: import("./types.js").TSFSPathConfig) => void;
};
export declare const TSFS: {
    Authentication: {
        /**
         * Sets up Passport.js authentication.
         *
         * Requires prior setup: **cookies**, **requestParsers**, **session**, and your app's **models**
         *
         * @param app: Express application
         * @param User: User model
         *
         * @returns {passport: PassportStatic}
         */
        setup: (app: import("express").Express, User: {
            findOne: (where: {
                where: {
                    username?: string | undefined;
                    id?: string | undefined;
                };
            }) => any;
        }) => {
            passport: import("passport").PassportStatic;
        };
        /**
         * Middleware to authenticate a request if **username** & **password** fields in query or body are correct.
         * Typically used at the /login endpoint.
         * Wrapper around Passport's authenticate('local').
         * Creates a session. Requires authentication to be setup.
         */
        authenticateLocal: any;
        /**
         * Middleware to block unauthenticated requests from accessing the endpoint
         *
         * @param req Express request
         * @param res Express response
         * @param next Express next
         */
        mustBeAuthenticated: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
        /**
         * Middleware to block non-admin requests from accessing the endpoint
         *
         * @param req Express request
         * @param res Express response
         * @param next Express next
         */
        mustBeAdmin: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
    };
    Checks: {
        /**
         * Verifies existence of required config files
         */
        checkConfigFiles: (tsfsPathConfig: import("./types.js").TSFSPathConfig) => void;
        /**
         * Checks if all required environment variables are set.
         *
         * @param requiredEnvVars List of required environment variables
         * @param validEnvValues Valid values for env variables. Can be an array of values or a function returning true if value is valid.
         */
        checkEnv: (requiredEnvVars: import("./types.js").TSFSRequiredEnvVars | undefined, validEnvValues: import("./types.js").TSFSValidEnvValues | undefined) => void;
        /**
         * Checks existence of public dir in build folder.
         *
         * If not exists, probably client has not been built yet.
         */
        checkPublicDir: (tsfsPathConfig: import("./types.js").TSFSPathConfig) => void;
    };
    Cookies: {
        setup: (app: import("express").Express) => void;
    };
    CsrfProtection: {
        /**
         * Sets up CSRF protection via the double submit cookie pattern
         * (https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie)
         *
         * Requires cookie parser middleware before!
         *
         * @param app Express application
         */
        setup: (app: import("express").Express) => void;
    };
    Database: {
        /**
         * Sets up a database instance according to model definitions.
         *
         * @returns Sequelize instance
         */
        create: (dbConfig: import("./types.js").TSFSDbConfig) => Promise<import("sequelize/types/sequelize.js").Sequelize>;
    };
    Environment: {
        /**
         * Reads the .env file and prepares process.env, checks if all environment variables are set & checks if public dir exists
         */
        setup: (tsfsPathConfig: import("./types.js").TSFSPathConfig, requiredEnvVars: import("./types.js").TSFSRequiredEnvVars, validEnvValues: import("./types.js").TSFSValidEnvValues, checkConfigFiles?: boolean, checkEnv?: boolean, checkPublicDir?: boolean) => void;
    };
    Headers: {
        setup: (app: import("express").Express, helmetConfiguration?: Readonly<import("helmet").HelmetOptions> | undefined) => void;
    };
    HttpServer: {
        /**
         * Create the application server.
         *
         * Fake HTTPS in dev; HTTP in prod (where you'll certainly use a proxy before it)
         *
         * @param app: Express application
         * @returns a Node HTTP(S) server
         */
        create: (app: import("express").Express) => import("http").Server | import("https").Server;
    };
    I18n: {
        setup: (app: import("express").Express, translations: import("i18next").Resource) => Promise<void>;
    };
    Loggers: {
        createGeneralLogger: (tsfsPathConfig: import("./types.js").TSFSPathConfig) => import("winston").Logger;
        setupRequestLogger: (generalLogger: import("winston").Logger, app: import("express").Express) => void;
    };
    Performance: {
        /**
         * Compression for lower response sizes
         *
         * Overrides res.end() etc. -> has to be in front of middlewares who might send a response
         *
         * @param app Express Application
         */
        useCompression: (app: import("express").Express) => void;
    };
    PublicFiles: {
        serve: (app: import("express").Express, tsfsPathConfig: import("./types.js").TSFSPathConfig) => void;
    };
    RateLimiting: {
        /**
         * Creates a rate limiting middleware with the specified allowed hits per minute.
         *
         * @param hitsPerMinute The allowed requests per minute per user/IP
         */
        createRateLimiter: (hitsPerMinute: number) => import("express-rate-limit").RateLimitRequestHandler;
    };
    RequestParsers: {
        /**
         * Enables query string (req.query) & json body (req.body) parsing
         *
         * @param app Express application
         */
        setup: (app: import("express").Express) => void;
    };
    Session: {
        /**
         * Sets up sessions
         *
         * @param app Express application
         * @param sequelize Sequelize instance
         * @param config Global app config
         *
         * @returns {sessionMiddleware: RequestHandler}
         */
        setup: (app: import("express").Express, sequelize: import("sequelize/types/sequelize.js").Sequelize, sessionMaxAge: number) => {
            sessionMiddleware: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        };
    };
    ViewEngine: {
        setup: (app: import("express").Express, tsfsPathConfig: import("./types.js").TSFSPathConfig) => void;
    };
};
