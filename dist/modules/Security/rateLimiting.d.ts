import { RateLimitRequestHandler } from 'express-rate-limit';
export declare const createRateLimiter: (hitsPerMinute: number) => RateLimitRequestHandler;
