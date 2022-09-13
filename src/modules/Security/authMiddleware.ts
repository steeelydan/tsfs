import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export const authenticateLocal = passport.authenticate('local', { userProperty: 'email' });

export const mustBeAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).json({ msg: 'Not authorized' });
    }
};

export const mustBeAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ msg: 'Not authorized' });
    }
};
