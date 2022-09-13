import passport from 'passport';
import * as PassportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
const setup = (app, User /* FIXME */, usernamePropertyOverride, passwordPropertyOverride) => {
    const LocalStrategy = PassportLocal.Strategy;
    const verifyCallback = async (username, password, done) => {
        let user;
        if (!usernamePropertyOverride) {
            user = await User.findOne({
                where: {
                    username
                }
            });
        }
        else {
            user = await User.findOne({
                where: {
                    [usernamePropertyOverride]: username
                }
            });
        }
        if (!user) {
            console.log('no user');
            return done(null, false);
        }
        let isValid;
        if (!passwordPropertyOverride) {
            isValid = await bcrypt.compare(password, user.password);
        }
        else {
            isValid = await bcrypt.compare(password, user[passwordPropertyOverride]);
        }
        if (isValid) {
            console.log('login by ' + username);
            return done(null, user);
        }
        else {
            console.log('failed login by ' + username);
            return done(null, false);
        }
    };
    const strategy = new LocalStrategy({
        passwordField: passwordPropertyOverride || 'password',
        usernameField: usernamePropertyOverride || 'username'
    }, verifyCallback);
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
    return { passport };
};
export { setup };
