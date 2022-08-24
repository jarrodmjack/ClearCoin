// const { response } = require('express')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.port || 3450
const axios = require("axios");
const newsRoute = require('./routes/news');
const aboutRoute = require('./routes/about');
const { getAboutPage } = require('./controllers/about');
require('dotenv').config()





let db,
    dbConnectionStr = process.env.DB_STRING, //database connection string from .env file
    dbName = 'clearcoin' // declare database name



    MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //support older mongo version 
    .then(client => {
        console.log(`Connected to ${dbName} Database`) //show successful connection to database
        db = client.db(dbName) // storing database information in a variable
    })

//  middleware
app.set('view engine', 'ejs') // render ejs for the client side
app.use(express.static('public')) // serve all files in public folder
app.use(express.urlencoded({ extended: true })) // middleware for parsing bodies from URL
app.use(express.json()) // It parses incoming JSON requests and puts the parsed data in req

// Initialize routes

app.use('/news', newsRoute)
app.use('/about', aboutRoute)


app.get('/', async (request, response) => {
    response.render('index.ejs')
})


app.get('/portfolio', async (request, response) => { 

    const coins = await db.collection('coins').find().toArray()
    const coinArray = coins[0].coin
    // console.log(coinArray)
    response.render('portfolio.ejs', {coins: coinArray})
})
    

app.get('/getCurrentCoins', async(req, res) => {
    const coinList = await db.collection('coins').find().toArray()
    const coins = coinList[0].coin
    res.json(coins)
})


// app.get('/news', async(req, res) => {
//     let news;
//     const options = {
//         method: 'GET',
//         url: `https://bing-news-search1.p.rapidapi.com/news/search`,
//         params: { q: `cryptocurrency`, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
//         headers: {
//             'X-BingApis-SDK': 'true',
//             'X-RapidAPI-Key': 'db3e8ae18bmshd7bb610557d438fp1e9721jsneadf0cccb21c',
//             'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
//         }
//     };
      
//       axios.request(options).then(function (response) {
//         console.log(response.data)
//         // console.log(news)
//       }).catch(function (error) {
//           console.error(error);
//       });
//     // res.render('news.ejs', { newsData: news })
//     // console.log(news)
// })



app.post('/addCoinsToDb', (req, res) => {
    db.collection('coins').insertOne({coin: req.body.coin})
    .then(result => {
        console.log('Coin added')
        res.json('coin added')
    })
    .catch(error => console.error(error))
})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})