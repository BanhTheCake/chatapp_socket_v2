const express = require('express')
const router = express.Router()
const messageControllers = require('../controllers/messageControllers')
const authMiddleware = require('../middleware/authMiddleware')
const db = require('../models')

router.get('/getCurrentMessage',authMiddleware.verifyToken, messageControllers.getCurrentMessage)
router.post('/newMessage', authMiddleware.verifyToken, messageControllers.addNewMessage) 

module.exports = router