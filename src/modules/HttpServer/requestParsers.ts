import express, { Express } from 'express';

export const setup = (app: Express): void => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
};
