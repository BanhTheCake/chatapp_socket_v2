const express = require('express')
const router = express.Router()
const authController = require('../controllers/authControllers')
const db = require('../models')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/getRefreshToken', authController.refreshToken)
router.get('/refreshAccessToken', authController.refreshAccessToken)
router.get('/authUserReloadPage', authController.authUserReloadPage)
router.get('/logout', authController.logout)

module.exports = router