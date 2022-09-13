import passport from 'passport';
export const authenticateLocal = passport.authenticate('local', { userProperty: 'email' });
export const mustBeAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403).json({ msg: 'Not authorized' });
    }
};
// export const mustHaveRole = <UserRolesType extends string>(
//     role: UserRolesType,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): void => {
//     if (req.user && req.user.role === role) {
//         next();
//     } else {
//         res.status(403).json({ msg: 'Not authorized' });
//     }
// };
