// Portfolio controller
const User = require('../models/User')
const axios = require('axios')

module.exports = {
    getPortfolio: async (req, res) => {
        try {
            if (req.user) {
                const user = await User.find({ _id: req.user.id })
                console.log(user)
                const data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=250&page=1&sparkline=false')

                res.render('portfolio.ejs', { user: req.user, currencies: data.data, portfolioItems: user[0].portfolio })
            } else {
                // console.log('no user')
                res.redirect('/login')
            }
            //   res.render('portfolio.ejs')
        } catch (err) {
            console.error(err)
        }
    },

    addCurrencyToPortfolio: async (req, res) => {

        try {
            const data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=250&page=1&sparkline=false')
            const user = await User.findOne({ _id: req.user.id })
            console.log(user)
            const incomingCurrency = req.body.currency
            const portfolioArray = user.portfolio
            const portfolioCurrencySearch = portfolioArray.find(item => item.name === incomingCurrency.name)
            if (!portfolioCurrencySearch) { //if no match is found in database
                console.log('item does not exist')
                await User.findOneAndUpdate(
                    { _id: req.user.id },
                    {
                        $push: { portfolio: incomingCurrency }
                    })
                    res.redirect('/portfolio')
            } else { //update qty
                await User.findOneAndUpdate(
                    { _id: req.user.id },
                    { $set: { "portfolio.$[currency].qty": portfolioCurrencySearch.qty += incomingCurrency.qty } },
                    {
                        arrayFilters: [{ "currency.id": incomingCurrency.id }],
                        new: true
                    },
            )

            console.log(user.portfolio)
            res.render('portfolio.ejs', {
                user: req.user,
                currencies: data.data,
                portfolioItems: user.portfolio
            })
        }
        } catch (err) {
            console.error(err)
        }

    }




}    