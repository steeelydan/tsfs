/// <reference types="express" />
/// <reference types="qs" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="passport" />
export * from './types.js';
export * from './modules/Config/Config.js';
/**
 * I18n, Logging, PublicFiles, Session, Templating
 */
export declare const WebApp: {
    I18n: {
        setup: (app: import("express").Express, translations: import("i18next").Resource, defaultLanguage: "de" | "en") => Promise<void>;
    };
    PublicFiles: {
        serve: (app: import("express").Express, publicFilesPath: string) => void;
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
        setup: (app: import("express").Express, sequelize: import("sequelize").Sequelize, sessionMaxAge: number) => {
            sessionMiddleware: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        };
    };
    Templating: {
        setup: (app: import("express").Express, viewsInBuildDirPath: string, manifestFilePath?: string | undefined, layoutsDirPath?: string | undefined) => void;
    };
};
/**
 * TSFS's implementation of a Node server.
 */
export declare const HttpServer: {
    Cookies: {
        setup: (app: import("express").Express) => void;
    };
    /**
     * Create the application server.
     *
     * Fake HTTPS in dev; HTTP in prod (where you'll certainly use a proxy in front of it)
     *
     * @param app: Express application
     * @returns a Node HTTP(S) server
     */
    create: (app: import("express").Express) => import("http").Server | import("https").Server;
    RequestParsers: {
        /**
         * Enables query string (req.query) & json body (req.body) parsing
         *
         * @param app Express application
         */
        setup: (app: import("express").Express) => void;
    };
};
export declare const Logger: {
    createGeneralLogger: (logfileDirPath: string) => import("winston").Logger;
    setupRequestLogger: (generalLogger: import("winston").Logger, app: import("express").Express) => void;
};
/**
 * Authentication, CSRF Protection, rate limiting, headers
 */
export declare const Security: {
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
                    email?: string | undefined;
                };
            }) => any;
        }, usernamePropertyOverride?: string | undefined, passwordPropertyOverride?: string | undefined) => {
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
    Headers: {
        setup: (app: import("express").Express, helmetConfiguration?: Readonly<import("helmet").HelmetOptions> | undefined) => void;
    };
    RateLimiting: {
        /**
         * Creates a rate limiting middleware with the specified allowed hits per minute.
         *
         * @param hitsPerMinute The allowed requests per minute per user/IP
         */
        createRateLimiter: (hitsPerMinute: number) => import("express-rate-limit").RateLimitRequestHandler;
    };
};
export declare const Database: {
    /**
     * Sets up a database instance according to model definitions.
     *
     * @returns Sequelize instance
     */
    create: (dbConfig: import("./types.js").TSFSDbConfig) => Promise<import("sequelize").Sequelize>;
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
