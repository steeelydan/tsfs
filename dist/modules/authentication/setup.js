import passport from 'passport';
import * as PassportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
const setup = (app, User /* FIXME */) => {
    const LocalStrategy = PassportLocal.Strategy;
    const verifyCallback = async (username, password, done) => {
        const user = await User.findOne({
            where: {
                username
            }
        });
        if (!user) {
            console.log('no user');
            return done(null, false);
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            console.log('login by ' + username);
            return done(null, user);
        }
        else {
            console.log('failed login by ' + username);
            return done(null, false);
        }
    };
    const strategy = new LocalStrategy(verifyCallback);
    passport.use(strategy);
    // Attach a user property with the user id as value to req.passport
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    // Attach req.user object
    passport.deserializeUser(async (userId, done) => {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        done(null, user);
    });
    app.use(passport.initialize());
    app.use(passport.session());
};
export { setup };
