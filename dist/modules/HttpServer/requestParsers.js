import express from 'express';
export const setup = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
};
