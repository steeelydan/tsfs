import passport, { PassportStatic } from 'passport';
import { Express } from 'express';
import * as PassportLocal from 'passport-local';
import bcrypt from 'bcryptjs';

const setup = (
    app: Express,
    User: { findOne: (where: { where: { username?: string; id?: string; email?: string } }) => any } /* FIXME */,
    usernamePropertyOverride?: string,
    passwordPropertyOverride?: string
): { passport: PassportStatic } => {
    const LocalStrategy = PassportLocal.Strategy;

    const verifyCallback = async (
        username: string,
        password: string,
        done: (err: Error | null, user?: Express.User | false) => void
    ): Promise<void> => {
        let user;
        if (!usernamePropertyOverride) {
            user = await User.findOne({
                where: {
                    username
                }
            });
        } else {
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
        } else {
            isValid = await bcrypt.compare(password, user[passwordPropertyOverride]);
        }

        if (isValid) {
            console.log('login by ' + username);

            return done(null, user);
        } else {
            console.log('failed login by ' + username);

            return done(null, false);
        }
    };

    const strategy = new LocalStrategy(
        {
            passwordField: passwordPropertyOverride || 'password',
            usernameField: usernamePropertyOverride || 'username'
        },
        verifyCallback
    );

    passport.use(strategy);

    // Attach a user property with the user id as value to req.passport
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Attach req.user object
    passport.deserializeUser(async (userId: string | undefined, done) => {
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
