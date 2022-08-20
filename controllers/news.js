
// news controller
module.exports = {
    getNews: async(req, res) => {
        try{

            res.render('news.ejs')
        }catch(err){
            console.error(err)
        }
    }
}    