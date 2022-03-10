import rateLimit from 'express-rate-limit';
// FIXME this cannot be hard-coded
export const authRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20
});
