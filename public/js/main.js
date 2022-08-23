console.log('main.js loaded ')





// Fetching total marketcap in CAD and percentage change in marketcap over the last 24 hours
async function setGlobalCurrencyData(){

  let totalMarketCapElement = document.querySelector('#globalMarketCap')
  let percentageTextElement = document.querySelector('#globalPercChange24Hr')

  const response = await fetch('https://api.coingecko.com/api/v3/global')
  const data = await response.json()

  const totalMCap = data.data.total_market_cap.cad.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  const totalPercChange = data.data.market_cap_change_percentage_24h_usd.toFixed(2)

  totalMarketCapElement.innerText = `$${totalMCap}CAD`
  percentageTextElement.innerText = `${[totalPercChange]}%`

  if(totalPercChange < 0){
    percentageTextElement.style.color = "red"
    document.querySelector('#incOrDec').innerText = `decrease`
  }else{
    percentageTextElement.style.color = "green"
    document.querySelector('#incOrDec').innerText = `increase`
  }

  const currentdate = new Date(); 

  const time = `${currentdate.getMonth()}/${currentdate.getDate()}/${currentdate.getFullYear()} @ ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`

  document.querySelector('#globalDataUpdateTime').innerText = `Updated at ${time}`







}
setGlobalCurrencyData()








// Market data rather than individual coin data to display in table
// global vars to store a couple elements I needed
let tbody = document.querySelector('#cryptocurrencies')
let newRow = document.querySelector('tr')


// Price sort array
let priceArray = []
let coinArray = []
let dbCoinsArray = []


class Currency {
  constructor(name, price, mcap, circSupply, vol24h, perc24h) {
    this._name = name,
      this._price = price,
      this._mcap = mcap,
      this._circSupply = circSupply,
      this._vol24h = vol24h,
      this._perc24h = perc24h
  }

  get name() {
    return this._name
  }
  get price() {
    return this._price
  }
  get mcap() {
    return this._mcap
  }
  get circSupply() {
    return this._circSupply
  }
  get vol24h() {
    return this._vol24h
  }
  get perc24h() {
    return this._perc24h
  }

}



// MAIN PRICE CHART
// fetching data from coingeck API
fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false")
  .then(res => res.json())
  .then(data => {
    // logging to test which data I am receiving
    // console.log(data)
    // console.log(data[0].image)
    // console.log(data[0].name)
    // console.log(data[0].current_price)
    // console.log(data[0].market_cap)
    // console.log(data[0].circulating_supply)
    // console.log(data[0].total_volume)
    // console.log(data[0].price_change_percentage_24h)

    for(let i = 0; i < data.length; i++){
      dbCoinsArray.push({
        name: data[i].name,
        currentprice: data[i].current_price,
        id: data[i].symbol,
        amount: 0
      })
    }





    /* Creating the elements for the table. Not pretty, will work on
    refactoring this part */

    for (let i = 1; i < 6; i++) {
      const td = document.createElement('td')
    }



    for (let i = 0; i < 15; i++) {
      let coin = new Currency(data[i].name, data[i].current_price, data[i].market_cap, data[i].circulating_supply, data[i].total_volume, data[i].price_change_percentage_24h) //creating currency objects
      coinArray.push(coin) //pushing currency objects to an array
    }

    // console.log(priceArray)


    for (const e of coinArray) {
      // console.log(e.name)
    }


    for (let i = 0; i < 50; i++) {


      // table row creation and append to table body
      const tr = document.createElement('tr')
      tbody.appendChild(tr)

      // Hard coded table data for now, will work on refactoring
      const tdImg = document.createElement('img')
      tdImg.classList.add('tableSymbol')
      // tdImg.src = data.coins[i].item.thumb

      const td0 = document.createElement('td')
      td0.appendChild(tdImg)
      tr.appendChild(td0)

      const td1 = document.createElement('td')
     
      tr.appendChild(td1)
      tdImg.src = data[i].image
      td1.innerText = data[i].name


      const td2 = document.createElement('td')
      tr.appendChild(td2)
      if (data[i].current_price % 1 === 0) {
        td2.innerText = `$${data[i].current_price.toLocaleString()}`
        td2.classList.add('priceSort')
        priceArray.push(td2)
      } else {
        if(data[i].current_price < 1){
          td2.innerText = `$${data[i].current_price.toFixed(6)}`
        }else{
          td2.innerText = `$${data[i].current_price.toFixed(2)}`
        td2.classList.add('priceSort')
        priceArray.push(td2)
        }
        
      }
      const td3 = document.createElement('td')
      tr.appendChild(td3)
      td3.innerText = `$${data[i].market_cap.toLocaleString()}`
      const td4 = document.createElement('td')
      tr.appendChild(td4)
      td4.innerText = `${data[i].circulating_supply.toFixed(0)}`
      const td5 = document.createElement('td')
      tr.appendChild(td5)
      td5.innerText = `$${data[i].total_volume.toLocaleString()}`
      const td6 = document.createElement('td')
      tr.appendChild(td6)
      if (data[i].price_change_percentage_24h > 0) {
        td6.innerText = `${data[i].price_change_percentage_24h.toFixed(2)}%`
        td6.style.color = 'rgb(24, 180, 24)'
      } else {
        td6.innerText = `${data[i].price_change_percentage_24h.toFixed(2)}%`
        td6.style.color = 'red'
      }

    }

    // console.log(coinArray) //class constructor
  })
  .catch(err => {
    console.error(err)
  });
  
// TRENDING **********
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




// TRUSTED EXCHANGES***********
fetch("https://api.coingecko.com/api/v3/exchanges?per_page=5")
  .then(res => res.json())
  .then(data => {
    console.log(data)



    // trending 1
    document.querySelector('#trustedNameOne').innerText = data[0].name
    // document.querySelector('#trustedSymbolOne').innerText = data[0]
    document.querySelector('#trustedIconOne').src = data[0].image

    // trending 2
    document.querySelector('#trustedNameTwo').innerText = data[1].name
    // document.querySelector('#trustedSymbolTwo').innerText = data[1]
    document.querySelector('#trustedIconTwo').src = data[1].image

    // trending 3
    document.querySelector('#trustedNameThree').innerText = data[2].name
    // document.querySelector('#trustedSymbolThree').innerText = data[2]
    document.querySelector('#trustedIconThree').src = data[2].image

  })
  .catch(err => {
    console.log(`error ${err}`)
  });



// adding coins to database **********
const oneDayPrice = 0;
const twoDayPrice = 0;
const fiveDayPrice = 0;
document.querySelector('.addCoins').addEventListener('click', addCoinsToDb)

async function addCoinsToDb(){  // function to mark item as complete
    console.log('coins added')
    const coins = dbCoinsArray
  try{
      const response = await fetch('addCoinsToDb', { // fetch request sent to markComplete route
          method: 'post', //method type
          headers: {'Content-Type': 'application/json'},  //headers
          body: JSON.stringify({ //turn JS value into JSON object to be sent to the server
              'coin': coins
          })
        })
      const data = await response.json() // gets response from server as json
      // console.log(data)  // logs data to console
      location.reload()  

  }catch(err){ // catch error
      console.error(err)
  }
}












// LOCALSTORAGE
// on click of an item in the list of coins on my portfolio
// I want to set that particular item (name, price, symbol) as an object in localstorage
















































// let sortBtns = Array.from(document.getElementsByClassName('tableHead'))

// sortBtns.map(item => {
//   item.addEventListener('click', (event) => {
//     console.log(event.target)
//   })
// })





// let th = document.getElementsByTagName('th');

// for(let i = 0; i < th.length; i++){
//   th[i].addEventListener('click', item(i))
// }


// function item(i){
//   return function(){
//     console.log(i)
//     sortTable(i)
//   }
// }


// function sortTable(i) {
//   var table, rows, switching, i, x, y, shouldSwitch;
//   table = document.querySelector('.myTable');
//   switching = true;
//   /* Make a loop that will continue until
//   no switching has been done: */
//   while (switching) {
//     // Start by saying: no switching is done:
//     switching = false;
//     rows = table.rows;
//     /* Loop through all table rows (except the
//     first, which contains table headers): */
//     for (i = 1; i < (rows.length - 1); i++) {
//       // Start by saying there should be no switching:
//       shouldSwitch = false;
//       /* Get the two elements you want to compare,
//       one from current row and one from the next: */
//       x = rows[i].getElementsByTagName("TD")[i];
//       y = rows[i + 1].getElementsByTagName("TD")[i];
//       // Check if the two rows should switch place:
//       if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//         // If so, mark as a switch and break the loop:
//         shouldSwitch = true;
//         break;
//       }
//     }
//     if (shouldSwitch) {
//       /* If a switch has been marked, make the switch
//       and mark that a switch has been done: */
//       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//       switching = true;
//     }
//   }
// }