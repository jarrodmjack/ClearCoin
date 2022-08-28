// Portfolio controller
const User = require('../models/User')

module.exports = {
    getPortfolio: async (req, res) => {
        try {
            if(req.user){
                const user = await User.find({_id: req.user.id})
                console.log(user)
                res.render('portfolio.ejs', {user: req.user})
            }else {
                console.log('no user')
               res.redirect('/login')
            }
          res.render('portfolio.ejs')
        } catch (err) {
            console.error(err)
        }

    }
}    