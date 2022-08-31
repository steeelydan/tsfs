import { NextFunction, Request, Response } from 'express';
export declare const authenticateLocal: any;
export declare const mustBeAuthenticated: (req: Request, res: Response, next: NextFunction) => void;
export declare const mustBeAdmin: (req: Request, res: Response, next: NextFunction) => void;
