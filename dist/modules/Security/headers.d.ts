import helmet from 'helmet';
import { Express } from 'express';
declare type ExtractedHelmetOptions = Parameters<typeof helmet>[0];
export declare const setup: (app: Express, helmetConfiguration?: ExtractedHelmetOptions) => void;
export {};
