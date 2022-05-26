
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












// Market data rather than individual coin data to display in table


// global vars to store a couple elements I needed
let tbody = document.querySelector('#cryptocurrencies')
let newRow = document.querySelector('tr')

// fetching data from coingeck API
fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false")
  .then(res => res.json())
  .then(data => {
    // logging to test which data I am receiving
    console.log(data)
    // console.log(data[0].image)
    // console.log(data[0].name)
    // console.log(data[0].current_price)
    // console.log(data[0].market_cap)
    // console.log(data[0].circulating_supply)
    // console.log(data[0].total_volume)
    // console.log(data[0].price_change_percentage_24h)


    /* Creating the elements for the table. Not pretty, will work on
    refactoring this part */
    for (let i = 0; i < 10; i++) {

      // table row creation and append to table body
      const tr = document.createElement('tr')
      tbody.appendChild(tr)

      // Hard coded table data for now, will work on refactoring
      const td1 = document.createElement('td')
      tr.appendChild(td1)
      td1.innerText = data[i].name
      const td2 = document.createElement('td')
      tr.appendChild(td2)
      if (data[i].current_price % 1 === 0) {
        td2.innerText = `$${data[i].current_price}`
      } else {
        td2.innerText = `$${data[i].current_price.toFixed(2)}`
      }
      const td3 = document.createElement('td')
      tr.appendChild(td3)
      td3.innerText = `$${data[i].market_cap}`
      const td4 = document.createElement('td')
      tr.appendChild(td4)
      td4.innerText = data[i].circulating_supply.toFixed(0)
      const td5 = document.createElement('td')
      tr.appendChild(td5)
      td5.innerText = `${data[i].total_volume}`
      const td6 = document.createElement('td')
      tr.appendChild(td6)
      if(data[i].price_change_percentage_24h > 0){
      td6.innerText = `${data[i].price_change_percentage_24h.toFixed(2)}%`
      td6.style.color = 'rgb(24, 180, 24)'
      }else{
        td6.innerText = `${data[i].price_change_percentage_24h.toFixed(2)}%`
      td6.style.color = 'red'
      }
      
    }


  })
  .catch(err => {
    console.log(`error ${err}`)
  });



  // fetching data from coingeck API 
fetch("https://api.coingecko.com/api/v3/search/trending")
.then(res => res.json())
.then(data => {
  console.log(data)
  console.log(data.coins[0].item.thumb)
  console.log(data.coins[0].item.name)
  console.log(data.coins[0].item.symbol)


// trending 1
  document.querySelector('#trendingNameOne').innerText = data.coins[0].item.name
  document.querySelector('#trendingSymbolOne').innerText = data.coins[0].item.symbol
  document.querySelector('#trendingIconOne').src = data.coins[0].item.thumb

// trending 2
  document.querySelector('#trendingNameTwo').innerText = data.coins[1].item.name
  document.querySelector('#trendingSymbolTwo').innerText = data.coins[1].item.symbol
  document.querySelector('#trendingIconTwo').src = data.coins[1].item.thumb

// trending 3
  document.querySelector('#trendingNameThree').innerText = data.coins[2].item.name
  document.querySelector('#trendingSymbolThree').innerText = data.coins[2].item.symbol
  document.querySelector('#trendingIconThree').src = data.coins[2].item.thumb




})
.catch(err => {
  console.log(`error ${err}`)
});
