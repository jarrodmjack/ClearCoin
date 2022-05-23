
// let tbody = document.querySelector('#cryptocurrencies')


// fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
// .then(res => res.json()) 
// .then(data => { 




//   console.log(data)
//   console.log(data.coingecko_rank)
//   console.log(data.name)
//   console.log(data.symbol)
//   console.log(data.market_data.current_price.cad)
//   console.log(data.market_data.market_cap.cad)
//   console.log(data.market_data.circulating_supply)
//   console.log(data.market_data.total_volume.cad)
//   console.log(data.market_data.price_change_percentage_1h_in_currency.cad)
//   console.log(data.market_data.price_change_percentage_24h_in_currency.cad)


//   document.querySelector('#btcRank').innerText = data.coingecko_rank
//   document.querySelector('#btcName').innerText = data.name
//   document.querySelector('#btcSymbol').innerText = data.symbol
//   document.querySelector('#btcPrice').innerText = data.market_data.current_price.cad
//   document.querySelector('#btcMarketCap').innerText = data.market_data.market_cap.cad
//   document.querySelector('#btcCircSupply').innerText = data.market_data.circulating_supply
//   document.querySelector('#btcVolume').innerText = data.market_data.total_volume.cad
//   document.querySelector('#btcPercentageChange1Hour').innerText = data.market_data.price_change_percentage_1h_in_currency.cad.toFixed(2)
//   document.querySelector('#btcPercentageChange24Hour').innerText = data.market_data.price_change_percentage_24h_in_currency.cad.toFixed(2)


//   for(let i = 1; i < 10; i++){
//     const tr = document.createElement('tr')
//     for(let j = 1; j < 10; j++){
//       const td = document.createElement('td')
//       tr.appendChild(td)
//     }
//     tbody.appendChild(tr)
//   }


// })
// .catch(err => {
//     console.log(`error ${err}`)
// });



// class Currency{
//   constructor(rank, name, symbol, priceCad, mCap, circ, vol, OneHrPerc, twoFourPerc){
//     this.rank = rank
//     this.name = name
//     this.symbol = symbol 
//     this.priceCad = priceCad
//     this.mCap = mCap 
//     this.circ = circ 
//     this.vol = vol
//     this.OneHrPerc = OneHrPerc
//     this.twoFourPerc = twoFourPerc
//   }
// }

// const btc = new Currency()












// Market data rather than individual coin data



let tbody = document.querySelector('#cryptocurrencies')
let newRow = document.querySelector('tr')


fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false")
.then(res => res.json()) 
.then(data => { 
  console.log(data)
  console.log(data[0].image)
  console.log(data[0].name)
  console.log(data[0].current_price)
  console.log(data[0].market_cap)
  console.log(data[0].circulating_supply)
  console.log(data[0].total_volume)
  console.log(data[0].price_change_percentage_24h)
  // console.log(data[0].symbol) //<--- may add symbol after?
  
  console.log(data)



for(let i = 0; i < 10; i++){
    const tr = document.createElement('tr')
 
    tbody.appendChild(tr)

    // for(let j = 1; j < 6; j++){
    //   const td = document.createElement('td')
    //   tr.appendChild(td)
    //   td.innerText = data[i].name
    // }
     const td = document.createElement('td')
      tr.appendChild(td)
      td.innerText = data[i].name
    // console.log(data[i].name)
  }

  


  // data.forEach(item => {
  //   const tr = document.createElement('tr')
  //   tbody.appendChild(tr)
  // });

  

})
.catch(err => {
    console.log(`error ${err}`)
});


