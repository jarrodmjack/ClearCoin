const express = require('express')
const router = express.Router()
const portfolioController = require('../controllers/portfolio')


router.get('/', portfolioController.getPortfolio)
router.put('/addCurrencyToPortfolio', portfolioController.addCurrencyToPortfolio)


module.exports = router