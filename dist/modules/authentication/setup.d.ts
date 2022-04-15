import passport, { PassportStatic } from 'passport';
import { Express } from 'express';
declare const setup: (app: Express, User: {
    findOne: (where: {
        where: {
            username?: string;
            id?: string;
        };
    }) => any;
}) => {
    passport: PassportStatic;
};
export { setup };
