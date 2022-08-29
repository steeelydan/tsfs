import { setup as setupAuthentication } from './modules/authentication/setup.js';
import { authenticateLocal, mustBeAdmin, mustBeAuthenticated } from './modules/authentication/middleware.js';
import { checkConfigFiles, checkPublicDir, checkEnv } from './modules/checks/checks.js';
import { setup as setupCookies } from './modules/cookies/cookies.js';
import { setup as setupCsrfProtection } from './modules/csrfProtection/csrfProtection.js';
import { create as createDatabase } from './modules/database/database.js';
import { setup as setupEnvironment } from './modules/environment/environment.js';
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
import { setup as setupViewEngine } from './modules/viewEngine/viewEngine.js';
export * from './types.js';
export const Authentication = {
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
};
export const Checks = {
    /**
     * Verifies existence of required config files
     */
    checkConfigFiles,
    /**
     * Checks if all required environment variables are set.
     *
     * @param requiredEnvVars List of required environment variables
     * @param validEnvValues Valid values for env variables. Can be an array of values or a function returning true if value is valid.
     */
    checkEnv,
    /**
     * Checks existence of public dir in build folder.
     *
     * If not exists, probably client has not been built yet.
     */
    checkPublicDir
};
export const Cookies = {
    setup: setupCookies
};
export const CsrfProtection = {
    /**
     * Sets up CSRF protection via the double submit cookie pattern
     * (https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie)
     *
     * Requires cookie parser middleware before!
     *
     * @param app Express application
     */
    setup: setupCsrfProtection
};
export const Database = {
    /**
     * Sets up a database instance according to model definitions.
     *
     * @returns Sequelize instance
     */
    create: createDatabase
};
export const Environment = {
    /**
     * Reads the .env file and prepares process.env, checks if all environment variables are set & checks if public dir exists
     */
    setup: setupEnvironment
};
export const Headers = {
    setup: setupHeaders
};
/**
 * TSFS's implementation of a Node server.
 */
export const HttpServer = {
    /**
     * Create the application server.
     *
     * Fake HTTPS in dev; HTTP in prod (where you'll certainly use a proxy in front of it)
     *
     * @param app: Express application
     * @returns a Node HTTP(S) server
     */
    create: createHttpServer
};
export const I18n = {
    setup: setupI18n
};
export const Loggers = {
    createGeneralLogger,
    setupRequestLogger
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
export const PublicFiles = {
    serve: servePublicFiles
};
export const RateLimiting = {
    /**
     * Creates a rate limiting middleware with the specified allowed hits per minute.
     *
     * @param hitsPerMinute The allowed requests per minute per user/IP
     */
    createRateLimiter: createRateLimiter
};
export const RequestParsers = {
    /**
     * Enables query string (req.query) & json body (req.body) parsing
     *
     * @param app Express application
     */
    setup: setupRequestParsers
};
export const Session = {
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
};
export const ViewEngine = {
    setup: setupViewEngine
};
export const TSFS = {
    Authentication,
    Checks,
    Cookies,
    CsrfProtection,
    Database,
    Environment,
    Headers,
    HttpServer,
    I18n,
    Loggers,
    Performance,
    PublicFiles,
    RateLimiting,
    RequestParsers,
    Session,
    ViewEngine
};
