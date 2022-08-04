// const { localsName } = require("ejs")






const coinListItems = document.querySelectorAll('.listItems')

Array.from(coinListItems).forEach((element) => { //create an array from deleteBtn variable
    element.addEventListener('click', addCoinToPortfolio) //add a click event listener to each item
})

let cache



async function addCoinToPortfolio(e) { 
    console.log('list item clicked')

    const result = await fetch('/getCurrentCoins')
    const data = await result.json()
    // console.log(data)
    cache = data
    const selectedCurrency = e.target.innerText.split(' | ')[2]
    // console.log(selectedCurrency)
    let res = data.find(item => item.id === selectedCurrency)
    console.log(res)
    console.log(res.amount = 1)
    // pick quantity of chosen item
    localStorage.setItem(`${res.id}`, JSON.stringify(res))
    window.location.reload()
}



function allStorage() {
    let array = [];
    if(localStorage.length > 0){
        for (let i = 0; i < localStorage.length; i++) {
            array.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        return array
    }else{
        const noAssets = document.querySelector('.noAssetsMsg')
        noAssets.classList.remove('visible')
    }
}


async function displayPortfolioCoins(){

    try{
        let storedCoins =  allStorage()
        console.log('stored coins below')
        console.log(storedCoins)
        const div = document.querySelector('.portfolioCoinList')
        document.querySelector('.portfolioBalance').innerText = `Current Balance: $0 CAD`
    }catch(err){
        console.error(err)
    }
}

displayPortfolioCoins()



// Generating portfolio asset table data from localstorage  
function generatePortfolioTableData(){

    const tableData = allStorage()
    const tbody = document.querySelector('.portfolioAssetsTableBody')
    for(let i = 0; i < tableData.length; i++){
        let portfolioAssetSymb = document.createElement('td')
        let portfolioAssetName = document.createElement('td')
        let portfolioAssetPrice = document.createElement('td')
        let portfolioAssetQty = document.createElement('td')
        let portfolioAssetActions = document.createElement('td')
        portfolioAssetSymb.innerText  = `${tableData[i].id}`
        portfolioAssetName.innerText = `${tableData[i].name}`
        portfolioAssetPrice.innerText = `$${tableData[i].currentprice}`
        portfolioAssetQty.innerText = `${tableData[i].amount}`
        portfolioAssetActions.innerText = `+`
        portfolioAssetActions.classList.add('addQty')

        let tr = document.createElement('tr')
        tr.appendChild(portfolioAssetSymb)
        tr.appendChild(portfolioAssetName)
        tr.appendChild(portfolioAssetPrice)
        tr.appendChild(portfolioAssetQty)
        tr.appendChild(portfolioAssetActions)
        tbody.appendChild(tr)
    }
}

generatePortfolioTableData()



// add 1 to the currency quantity
// document.querySelectorAll('.addQty').addEventListener('click', addPortfolioCurrencyQty)

let addQtyBtn = document.querySelectorAll('.addQty')
Array.from(addQtyBtn).forEach((element) => { //create an array from deleteBtn variable
    element.addEventListener('click', addPortfolioCurrencyQty) //add a click event listener to each item
})



function addPortfolioCurrencyQty(e){

            const data = allStorage()

      
            let currencyToAddTo = e.target.parentNode.childNodes[0].innerText.toLowerCase() //targeting name of currency in the table
            // console.log(currencyToAddTo)
            let currencyInStorage = JSON.parse(localStorage.getItem(currencyToAddTo))
            currencyInStorage.amount += 1
            // localStorage.setItem(curren)
            localStorage.setItem(currencyInStorage.id, JSON.stringify(currencyInStorage))
}



// Get sum to display in a chart

function getPortfolioSum(){
    let data = allStorage()
    let sum = 0;
    // console.log(data)
    
        for(let i = 0; i < data.length; i++){
            sum += data[i].currentprice * data[i].amount
        }
        let balance = document.querySelector('.portfolioBalance')
        balance.innerText = `Current Balance: $${sum.toFixed(2)} CAD`    
 }
 getPortfolioSum()





















// Search coins (enable these to search through owned coins)

// function displayPortfolioCoins(storedCoins = allStorage()){
//     // let storedCoins = allStorage()

//     const div = document.querySelector('.portfolioCoinList')
//     div.innerHTML = ''
//     for(let i = 0; i < storedCoins.length; i++){
//         let h4 = document.createElement('h4')
//         h4.innerText = `- ${storedCoins[i].name} +   T`
//         div.appendChild(h4)
//     }

// }


// document.querySelector('#coinSearch').addEventListener('keypress', searchCoins)

// function searchCoins(){
//     let storedCoins = allStorage()
//     console.log('onchange func')
//     let coin = document.querySelector('#coinSearch').value.toLowerCase()


//     let filteredList = storedCoins.filter(item => item.name.toLowerCase().includes(coin))

//     console.log(filteredList)
//     displayPortfolioCoins(filteredList)    
// }







/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
//   }
  
//   function filterFunction() {
//     var input, filter, ul, li, a, i;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     div = document.getElementById("myDropdown");
//     a = div.getElementsByTagName("a");
//     for (i = 0; i < a.length; i++) {
//       txtValue = a[i].textContent || a[i].innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         a[i].style.display = "";
//       } else {
//         a[i].style.display = "none";
//       }
//     }
//   }




// searchCoins()





