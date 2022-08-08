// const { response } = require('express')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.port || 3450
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