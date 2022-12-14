const session = require('express-session');
const express = require('express');
const cors = require('cors');
// const Redis = require('ioredis');
// let RedisStore = require('connect-redis')(session);
require('dotenv').config();

const config = (app) => {
    // const redisClient = new Redis(process.env.REDIS_URL);
    app.use(
        cors({
            origin: process.env.URL_CLIENT,
            credentials: true,
        })
    );
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.set('trust proxy', 1);
    app.use(
        session({
            // store: new RedisStore({ client: redisClient }),
            secret: 'banhthecake',
            name: 'sid',
            saveUninitialized: false,
            resave: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? 'true' : 'auto',
                sameSite:
                    process.env.NODE_ENV === 'production' ? 'true' : 'lax',
                expires: 1000 * 60 * 60 * 24 * 7,
            },
        })
    );
};

module.exports = config;
