import { setup as setupAuthentication } from './modules/authentication/setup.js';
import { authenticateLocal, mustBeAdmin, mustBeAuthenticated } from './modules/authentication/middleware.js';
import { setup as setupCookies } from './modules/cookies/cookies.js';
import { setup as setupCsrfProtection } from './modules/csrfProtection/csrfProtection.js';
import { create as createDatabase } from './modules/database/database.js';
import { setup as setupHeaders } from './modules/headers/headers.js';
import { create as createHttpServer } from './modules/httpServer/httpServer.js';
import { setup as setupI18n } from './modules/i18n/i18n.js';
import { create as createGeneralLogger } from './modules/logger/generalLogger.js';
import { setup as setupRequestLogger } from './modules/logger/requestLogger.js';
import { useCompression } from './modules/performance/performance.js';
import { serve as servePublicFiles } from './modules/publicFiles/publicFiles.js';
import { createRateLimiter } from './modules/rateLimiting/rateLimiting.js';
import { setup as setupRequestParsers } from './modules/requestParsers/requestParsers.js';
import { setup as setupSession } from './modules/session/session.js';
import { setup as setupTemplating } from './modules/viewEngine/viewEngine.js';
export * from './types.js';
export * from './modules/Config/Config.js';
/**
 * I18n, Logging, PublicFiles, Session, Templating
 */
export const WebApp = {
    I18n: {
        setup: setupI18n
    },
    Logging: {
        createGeneralLogger,
        setupRequestLogger
    },
    PublicFiles: {
        serve: servePublicFiles
    },
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
        setup: setupSession
    },
    Templating: {
        setup: setupTemplating
    }
};
/**
 * TSFS's implementation of a Node server.
 */
export const HttpServer = {
    Cookies: {
        setup: setupCookies
    },
    /**
     * Create the application server.
     *
     * Fake HTTPS in dev; HTTP in prod (where you'll certainly use a proxy in front of it)
     *
     * @param app: Express application
     * @returns a Node HTTP(S) server
     */
    create: createHttpServer,
    RequestParsers: {
        /**
         * Enables query string (req.query) & json body (req.body) parsing
         *
         * @param app Express application
         */
        setup: setupRequestParsers
    }
};
/**
 * Authentication, CSRF Protection, rate limiting, headers
 */
export const Security = {
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
        setup: setupAuthentication,
        /**
         * Middleware to authenticate a request if **username** & **password** fields in query or body are correct.
         * Typically used at the /login endpoint.
         * Wrapper around Passport's authenticate('local').
         * Creates a session. Requires authentication to be setup.
         */
        authenticateLocal,
        /**
         * Middleware to block unauthenticated requests from accessing the endpoint
         *
         * @param req Express request
         * @param res Express response
         * @param next Express next
         */
        mustBeAuthenticated,
        /**
         * Middleware to block non-admin requests from accessing the endpoint
         *
         * @param req Express request
         * @param res Express response
         * @param next Express next
         */
        mustBeAdmin
    },
    CsrfProtection: {
        /**
         * Sets up CSRF protection via the double submit cookie pattern
         * (https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie)
         *
         * Requires cookie parser middleware before!
         *
         * @param app Express application
         */
        setup: setupCsrfProtection
    },
    Headers: {
        setup: setupHeaders
    },
    RateLimiting: {
        /**
         * Creates a rate limiting middleware with the specified allowed hits per minute.
         *
         * @param hitsPerMinute The allowed requests per minute per user/IP
         */
        createRateLimiter: createRateLimiter
    }
};
export const Database = {
    /**
     * Sets up a database instance according to model definitions.
     *
     * @returns Sequelize instance
     */
    create: createDatabase
};
export const Performance = {
    /**
     * Compression for lower response sizes
     *
     * Overrides res.end() etc. -> has to be in front of middlewares who might send a response
     *
     * @param app Express Application
     */
    useCompression
};
