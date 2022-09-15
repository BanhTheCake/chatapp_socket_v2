const db = require('../models');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const signAccessToken = (next, currentUser, exp = '1h') => {
    try {
        const token = jwt.sign(
            { user: currentUser },
            process.env.SECRET_ACCESS_TOKEN,
            { expiresIn: exp }
        );
        return token;
    } catch (error) {
        next(error);
    }
};

const signRefreshToken = (next, currentUser, exp = '24h') => {
    try {
        const token = jwt.sign(
            { user: currentUser },
            process.env.SECRET_REFRESH_TOKEN,
            { expiresIn: exp }
        );
        return token;
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        const { username, password, image, isAdmin = false } = req.body;

        const currentUser = await db.Users.findOne({ where: { username } });

        if (currentUser) {
            return res.json({
                err: true,
                message: 'Username has been taken !',
            });
        }

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    return next(err);
                }
                const newUser = await db.Users.create({
                    userId: uuidv4(),
                    username,
                    password: hash,
                    image,
                    isAdmin,
                });
                return res.json({ err: false, message: 'successful' });
            });
        });
    } catch (error) {
        return next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const currentUser = await db.Users.findOne({
            where: { username },
            raw: true,
        });
        if (!currentUser) {
            return res.json({
                err: true,
                message: 'Username or Password is incorrect !',
            });
        }

        bcrypt.compare(password, currentUser.password, function (err, result) {
            if (err) {
                return next(err);
            }
            if (!result) {
                return res.json({
                    err: true,
                    message: 'Username or Password is incorrect !',
                });
            }
            delete currentUser.password;

            const accessToken = signAccessToken(next, currentUser);
            const refreshToken = signRefreshToken(next, currentUser);

            req.session.refreshToken = refreshToken;

            return res.json({
                login: true,
                token: accessToken,
                user: currentUser,
            });
        });
    } catch (error) {
        return next(error);
    }
};

const refreshToken = (req, res, next) => {
    return res.json({ refreshToken: req.session?.refreshToken });
};

const refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.session?.refreshToken;

        if (!refreshToken) {
            return res.json({
                login: false,
                message: 'You are not authenticate',
            });
        }

        const { user } = jwt.verify(
            refreshToken,
            process.env.SECRET_REFRESH_TOKEN
        );

        if (Object.keys(user).length === 0) {
            return res.json({
                login: false,
                message: 'You are not authenticate',
            });
        }

        let currentUser;

        try {
            currentUser = await db.Users.findOne({
                where: { userId: user?.userId },
                raw: true,
            });
        } catch (error) {
            next(error);
        }

        if (!currentUser) {
            return res.json({ login: false });
        }

        delete currentUser?.password;

        const newAccessToken = signAccessToken(next, currentUser);
        const newRefreshToken = signRefreshToken(next, currentUser);

        req.session.refreshToken = newRefreshToken;

        return res.json({ token: newAccessToken });
    } catch (error) {
        next(error);
    }
};

const authUserReloadPage = async (req, res, next) => {
    const refreshToken = req.session?.refreshToken;
    if (!refreshToken) {
        return res.json({ login: false });
    }

    const { user } = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);

    if (Object.keys(user).length === 0) {
        return res.json({ login: false });
    }

    let currentUser;

    try {
        currentUser = await db.Users.findOne({
            where: { userId: user?.userId },
            raw: true,
        });
    } catch (error) {
        next(error);
    }

    if (!currentUser) {
        return res.json({ login: false });
    }

    delete currentUser?.password;

    const newAccessToken = signAccessToken(next, currentUser);
    const newRefreshToken = signRefreshToken(next, currentUser);

    req.session.refreshToken = newRefreshToken;

    return res.json({
        login: true,
        user: currentUser,
        accessToken: newAccessToken,
    });
};

const logout = (req, res, next) => {
    req.session?.destroy();
    return res.json({ message: 'done' })
}

module.exports = {
    register,
    login,
    refreshToken,
    refreshAccessToken,
    authUserReloadPage,
    logout,
};
