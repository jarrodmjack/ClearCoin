const express = require('express')
const router = express.Router()
const newsController = require('../controllers/news')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', newsController.getNews)


module.exports = router