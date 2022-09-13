// Portfolio controller
const User = require('../models/User')
const axios = require('axios')

module.exports = {
    getPortfolio: async (req, res) => {
        try {
            if (req.user) {
                const user = await User.find({ _id: req.user.id })
                const data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=250&page=1&sparkline=false')

                res.render('portfolio.ejs', { user: req.user, currencies: data.data, portfolioItems: user[0].portfolio })
            } else {
                res.redirect('/login')
            }
        } catch (err) {
            console.error(err)
        }
    },

    addCurrencyToPortfolio: async (req, res) => {

        try {
            const data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=250&page=1&sparkline=false')
            const user = await User.findOne({ _id: req.user.id })
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
            } else { //update qty
                await User.findOneAndUpdate(
                    { _id: req.user.id },
                    { $set: { "portfolio.$[currency].qty": portfolioCurrencySearch.qty += incomingCurrency.qty } },
                    {
                        arrayFilters: [{ "currency.id": incomingCurrency.id }],
                        new: true
                    },
                )
            }
            res.render('portfolio.ejs', {
                user: req.user,
                currencies: data.data,
                portfolioItems: user.portfolio
            })
        } catch (err) {
            console.error(err)
        }
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



    // deleteCurrency: async (req, res) => {
    //     try {
    //             const user = await User.find({ _id: req.user.id })
    //             const data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=250&page=1&sparkline=false')


    //     } catch (err) {
    //         console.error(err)
    //     }
    // },




}    