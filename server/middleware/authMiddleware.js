const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit')
const { MemoryStore } = require('express-rate-limit')

const verifyToken = (req, res, next) => {
    try {
        const tokenHash = req.headers.authorization
        if (!tokenHash) {
            return res.status(401).json({message: 'You are not authenticate'})
        }
        const token = tokenHash.split(' ')[1]

        if (!token) {
            return res.status(401).json({message: 'You are not authenticate'})
        }
        const { user } = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN)

        if (!user || !user?.userId ) {
            return res.status(401).json({message: 'You are not authenticate'})
        }

        req.userId = user.userId
        req.isAdmin = user.isAdmin
        next()

    } catch (error) {
        next(error)
    }
}

const apiLimiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 100, 
	standardHeaders: true,
	store: new MemoryStore(),
})

module.exports = { verifyToken, apiLimiter }