// const axios = require('axios');
// const { response } = require('express');


// about controller
module.exports = {
    getAboutPage: async(req, res) => {
        // let newsArray;
        try{
            res.render('about.ejs')
        }catch(err){
            console.error(err)
        }
    }
}    