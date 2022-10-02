// Portfolio controller
const User = require('../models/User')
const axios = require('axios')
const Transaction = require('../models/Transaction')

module.exports = {
    getPortfolio: async (req, res) => {
        try {
            if (req.user) {
                const user = (await User.find({ _id: req.user.id }).populate('portfolio'))[0]
                const data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=250&page=1&sparkline=false')
                // console.log(user)
                let difference = user['portfolio'].reduce((sum, t) => sum + (data.data.filter(c => c.symbol === t.symb)[0].current_price - t.price)*t.qty, 0)
                res.render('portfolio.ejs', { user: req.user, currencies: data.data, portfolioItems: user.portfolio.reverse(), totalProfitGainLoss: difference.toFixed(2) || '0.00' })
               
            } else {
                res.redirect('/login')
            }
        } catch (err) {
            console.error(err)
        }
    },

    addCurrencyToPortfolio: async (req, res) => {
        try {
            let user = await User.findOne({ _id: req.user.id })
            const incomingCurrency = req.body.currency
            const transaction = new Transaction({
                name: incomingCurrency.name,
                symb: incomingCurrency.id,
                price: incomingCurrency.price,
                qty: incomingCurrency.qty,
                userId: req.user.id,
            })
                await transaction.save()
                user = await User.findOneAndUpdate(
                    { _id: req.user.id },
                    {
                        $push: { portfolio: transaction._id }
                    })
                    res.status(200).end()
        } catch (err) {
            console.error(err)
        }
    },


    deleteTransaction: async(req,res) => {
        const transactionId = req.params.id
        await Transaction.findOneAndDelete({_id: transactionId})

        const user = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $pull: { portfolio: transactionId } },
            { new: true }
        )
        
        res.redirect('/portfolio')

    },


    addQtyToCurrency: async (req, res) => {
        const user = await User.findOne({ _id: req.user.id })
        const data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=250&page=1&sparkline=false')
        try {
            const incomingCurrencyId = req.body.currencyId
            const incomingQtyToAdd = req.body.qtyToAdd
            const portfolioArray = user.portfolio
            const portfolioCurrencySearch = portfolioArray.find(item => item.id === incomingCurrencyId)
            await User.findOneAndUpdate(
                { _id: req.user.id },
                { $set: { "portfolio.$[currency].qty": portfolioCurrencySearch.qty += incomingQtyToAdd } },
                {
                    arrayFilters: [{ "currency.id": incomingCurrencyId }],
                    new: true
                },
            )
           
        } catch (err) {
            console.error(err)
        }
        res.render('portfolio.ejs', {
            user: req.user,
            currencies: data.data,
            portfolioItems: user.portfolio
        })
    },

}    