import { useEffect, useState } from "react"
import axios from "axios"
import TableRow from './TableRow'


const Table = () => {

    const [currencies, setCurrencies] = useState([])

    useEffect(() => {
        const fetchCurrencyData = async () => {
            const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            setCurrencies(res.data)
        }
        fetchCurrencyData()
    }, [])
    
// TODO - ADD SORT METHODS FOR EACH TABLE HEAD

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Symb</th>
                        <th>Currency</th>
                        <th>Price</th>
                        <th>Market Cap (CAD)</th>
                        <th>Circulating Supply</th>
                        <th>24h Volume(CAD)</th>
                        <th>24h %</th>
                    </tr>
                </thead>
                <tbody>
                    {currencies.map((currency, i) => (
                    <TableRow key={i} currency={currency} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table