


// Portfolio controller
module.exports = {
    getPortfolio: async (req, res) => {

        try {
            const coins = await db.collection('coins').find().toArray()
            const coinArray = coins[0].coin
            console.log(coins)
            res.render('portfolio.ejs', { coins: coinArray })
        } catch (err) {
            console.error(err)
        }

    }
}    