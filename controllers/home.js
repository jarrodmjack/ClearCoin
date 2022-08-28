const User = require('../models/User')

module.exports = {
    getIndex: async (req,res)=>{
        if(req.user){
            const user = await User.find({_id: req.user.id})
            console.log(user)
            res.render('index.ejs', {user: req.user})
        }else {
            console.log('no user')
            res.render('index.ejs', {user: null})
        }
    }

}


