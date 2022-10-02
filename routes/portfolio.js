const express = require('express')
const router = express.Router()
const portfolioController = require('../controllers/portfolio')


router.get('/', portfolioController.getPortfolio)
router.put('/addCurrencyToPortfolio', portfolioController.addCurrencyToPortfolio)
router.put('/addQtyToCurrency', portfolioController.addQtyToCurrency)
router.delete('/deleteTransaction/:id', portfolioController.deleteTransaction)
// router.delete('/deleteCurrency', portfolioController.deleteCurrency)


module.exports = router