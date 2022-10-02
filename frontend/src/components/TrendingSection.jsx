import { useState, useEffect } from "react"
import axios from 'axios'


const TrendingSection = () => {

    const [trendingCurrencies, setTrendingCurrencies] = useState([])

    useEffect(() => {
        const fetchTrendingCurrencies = async () => {
            const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')
            setTrendingCurrencies(res.data.coins)
        }
        fetchTrendingCurrencies()
    }, [])

    if(trendingCurrencies.length < 1){
        return
    }

    console.log(trendingCurrencies)

    return (
        <div className="card w-96 bg-base-300 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">🔥 Trending</h2>
                <div>
                    <span>1</span>
                    {trendingCurrencies[0].item.name}
                </div>
                <div>
                    <span>2</span>
                    {trendingCurrencies[1].item.name}
                </div>
                <div>
                    <span>3</span>
                    {trendingCurrencies[2].item.name}
                </div>
            </div>
        </div>
    )
}

export default TrendingSection