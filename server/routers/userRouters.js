const express = require('express')
const router = express.Router()
const authController = require('../controllers/authControllers')
const userControllers = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')
const db = require('../models')

router.get('/getAllUsers', authMiddleware.verifyToken, userControllers.getAllUser)
router.get('/getCurrentUser', authMiddleware.verifyToken, userControllers.getCurrentUser)
router.get('/getFriendList', authMiddleware.verifyToken, userControllers.getFriendList)
router.post('/addFriend', authMiddleware.verifyToken, userControllers.addFriend)
router.post('/searchFriendList', authMiddleware.verifyToken, userControllers.searchFriend)
router.post('/setImageUser', authMiddleware.verifyToken, userControllers.setImageUser)

module.exports = router