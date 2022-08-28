const axios = require('axios');
const { response } = require('express');
const User = require('../models/User')

// news controller
module.exports = {
    getNews: async(req, res) => {
        // let newsArray;
        try{
            const options = {
                method: 'GET',
                url: `https://bing-news-search1.p.rapidapi.com/news/search`,
                params: { q: `cryptocurrency`, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
                headers: {
                    'X-BingApis-SDK': 'true',
                    'X-RapidAPI-Key': 'db3e8ae18bmshd7bb610557d438fp1e9721jsneadf0cccb21c',
                    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                }
            };
              
              axios.request(options).then(async function (response) {
                // console.log(response.data.value)
                let newsArray = response.data.value
                if(req.user){
                    const user = await User.find({_id: req.user.id})
                    res.render('news.ejs', {user: user, news: newsArray}) 
                }else {
                    res.render('news.ejs', {user: null, news: newsArray})
                }
                // res.render('news.ejs', {news: newsArray})
              }).catch(function (error) {
                  console.error(error);
              });
        }catch(err){
            console.error(err)
        }
    }
}    