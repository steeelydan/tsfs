import passport from 'passport';
export const authenticateLocal = passport.authenticate('local');
export const mustBeAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403).json({ msg: 'Not authorized' });
    }
};
export const mustBeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ msg: 'Not authorized' });
    }
};
