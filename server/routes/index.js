const authRouters = require('./authRouters');
const userRouters = require('./userRouters');
const messageRouter = require('./messageRouter');
const { apiLimiter } = require('../middleware/authMiddleware');

const routersInit = (app) => {
    app.use('/auth', authRouters);
    app.use('/message', messageRouter);
    app.use('/', apiLimiter, userRouters);
    app.use((err, req, res, next) => {
        if (err.message === 'jwt expired') {
            return res.status(401).json({ message: err.message });
        }
        return res.status(err.status || 200).json({ message: err.message });
    });
};

module.exports = routersInit;
