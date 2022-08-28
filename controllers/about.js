// const axios = require('axios');
// const { response } = require('express');
const User = require('../models/User')

// about controller
module.exports = {
    getAboutPage: async(req, res) => {
        // let newsArray;
        try{
            if(req.user){
                const user = await User.find({_id: req.user.id})
                res.render('about.ejs', {user: user}) 
            }else {
                res.render('about.ejs', {user: null})
            }
           
        }catch(err){
            console.error(err)
        }
    }
}    