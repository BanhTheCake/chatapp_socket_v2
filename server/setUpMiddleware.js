const session = require('express-session');
const express = require('express');
const cors = require('cors');
const Redis = require('ioredis');
let RedisStore = require('connect-redis')(session);
require('dotenv').config();

const config = (app) => {
    const redisClient = new Redis({
        username: process.env.REDIS_SERVICE_NAME,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: process.env.REDIS_PORT || 6379,
        tls: true,
    });

    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true,
        })
    );
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.set('trust proxy', 1);
    app.use(
        session({
            store: new RedisStore({ client: redisClient }),
            secret: 'banhthecake',
            name: 'sid',
            saveUninitialized: false,
            resave: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? 'true' : 'auto',
                sameSite:
                    process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                expires: 1000 * 60 * 60 * 24 * 7,
            },
        })
    );
};

module.exports = config;
