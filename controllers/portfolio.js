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
                
                res.render('portfolio.ejs', { user: req.user, currencies: data.data })
            } else {
                console.log('no user')
                res.redirect('/login')
            }
            //   res.render('portfolio.ejs')
        } catch (err) {
            console.error(err)
        }

    }
}    