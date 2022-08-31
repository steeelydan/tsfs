import rateLimit from 'express-rate-limit';
export const createRateLimiter = (hitsPerMinute) => {
    return rateLimit({
        windowMs: 60 * 1000,
        max: hitsPerMinute
    });
};
