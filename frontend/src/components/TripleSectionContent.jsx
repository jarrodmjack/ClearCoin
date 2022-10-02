import TrendingSection from "./TrendingSection"
import { useState, useEffect } from "react"
import axios from 'axios'

const TripleSectionContent = () => {

  const [trendingCurrencies, setTrendingCurrencies] = useState([])

  useEffect(() => {
    const fetchTrendingCurrencies = async () => {
      const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')
      // console.log(res.data.coins)
      setTrendingCurrencies(res.data.coins)
    }
    fetchTrendingCurrencies()
  }, [])

  return (
    <div className="w-full flex justify-between my-20">
      <TripleSection trending={trendingCurrencies} />
      {/* <TripleSection />
      <TripleSection /> */}
    </div>
  )
}

export default TripleSectionContent