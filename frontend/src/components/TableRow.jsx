const TableRow = ({ currency }) => {
  
  return (
    <tr className="hover cursor-pointer">
      
        <td><img className="h-10 w-10" src={currency.image} alt="" /></td>
        <td><a href={`https://google.com/search?q=${currency.name}`}>{currency.name}</a></td>
        <td>${currency.current_price.toLocaleString()}</td>
        <td>${currency.market_cap.toLocaleString()}</td>
        <td>{currency.circulating_supply.toLocaleString()}</td>
        <td>${currency.total_volume.toLocaleString()}</td>
        {/* <td className="" style={{color: currency['price_change_percentage_24h'] > 0 ? 'lime' : 'red'}}>{currency.price_change_percentage_24h > 0 ? `${currency.price_change_percentage_24h}` : currency.price_change_percentage_24h}</td>
         */}
         <td className="whitespace-pre-wrap" style={{color: currency['price_change_percentage_24h'] > 0 ? 'lime' : 'red'}}>{currency.price_change_percentage_24h >= 0 && " "} {currency.price_change_percentage_24h.toFixed(2)}%</td>
    </tr>
  )
}

export default TableRow