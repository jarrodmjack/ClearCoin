// const { localsName } = require("ejs")

// let test = {
//   name: "Bitcoin",
//   currentprice: 30027,
//   id: "btc",
//   amount: 0
//   }

//   localStorage.setItem(`btc`, JSON.stringify(test))


// VARIABLES FOR MODAL FUNCTIONALITY
// item that displays current count (table data)
// add button (+)
// modal
// close modal button
// number input
// submit button
let globalCounter = 0;

const modal = document.querySelector('.addQtyModal');
modal.style.display = "none";
const closeModalBtn = document.querySelector('#closeModalBtn');
const numberInput = document.querySelector('#numberInput');
const submitModalBtn = document.querySelector('#submitModalBtn');
const tdCurrencyQty = document.querySelector('.currencyQuantity')

// blurring background while modal is active
const header = document.querySelector('#headerContainer')
const drpdown = document.querySelector('#dropContainer')
const portfolioItems = document.querySelector('#portfolioItems')


function my_prompt() {

    header.classList.add('isBlurred')
    drpdown.classList.add('isBlurred')
    portfolioItems.classList.add('isBlurred')

    return new Promise((resolve, reject) => {
      modal.style.display = "block";
      const cleanup = () => {
        modal.style.display = "none";
        submitModalBtn.removeEventListener('click', onSubmit);
        closeModalBtn.removeEventListener('click', onClose);
      };

      const onSubmit = () => {
        header.classList.remove('isBlurred')
        drpdown.classList.remove('isBlurred')
        portfolioItems.classList.remove('isBlurred')
        cleanup();
        if(!numberInput.value){
          resolve(0)
        }
        resolve(parseInt(numberInput.value, 10));
      };

      const onClose = () => {
        drpdown.classList.remove('isBlurred')
        portfolioItems.classList.remove('isBlurred')
        header.classList.remove('isBlurred')
        cleanup();
        resolve(null);
      };

      submitModalBtn.addEventListener('click', onSubmit);
      closeModalBtn.addEventListener('click', onClose);
    });
  }







const coinListItems = document.querySelectorAll('.listItems')

Array.from(coinListItems).forEach((element) => { //create an array from deleteBtn variable
    element.addEventListener('click', addCoinToPortfolio) //add a click event listener to each item
})

let cache


// add a coin to my portfolio from the list
async function addCoinToPortfolio(e) { 
    console.log('list item clicked')

    const result = await fetch('/getCurrentCoins')
    const data = await result.json()
    let addValue = await my_prompt();
    cache = data
    const selectedCurrency = e.target.innerText.split(' | ')[2]
    // console.log(selectedCurrency)
    let res = data.find(item => item.id === selectedCurrency)
    // console.log(res)
    // console.log(res.amount = 1)
   
    if(addValue === null) {
      addValue = 0;
      return;
    }

    res.amount += addValue
    localStorage.setItem(`${res.id}`, JSON.stringify(res))
    window.location.reload()
}


// Get all data from localstorage
function allStorage() {
    let array = [];
    if(!localStorage.length || localStorage.length === 0){
        const noAssets = document.querySelector('.noAssetsMsg')
        noAssets.classList.remove('visible')
    }else{
      for (let i = 0; i < localStorage.length; i++) {
        array.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  }
  return array
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
async function generatePortfolioTableData(){

  try{
    const tableData = allStorage() //getting table data

    if(tableData.length > 0){
      document.querySelector('#chart').style.display = 'block'
      const tbody = document.querySelector('.portfolioAssetsTableBody')
    for(let i = 0; i < tableData.length; i++){
        let portfolioAssetSymb = document.createElement('td')
        let portfolioAssetName = document.createElement('td')
        let portfolioAssetPrice = document.createElement('td')
        let portfolioAssetQty = document.createElement('td')
        let portfolioAssetAdd = document.createElement('td')
        let portfolioAssetDelete = document.createElement('td')
        let deleteSpan = document.createElement('span')
        // deleteSpan.classList.add('fa')
        // deleteSpan.classList.add('fa-trash')
        portfolioAssetAdd.setAttribute('id', `${tableData[i].id}`)
        portfolioAssetAdd.classList.add('addQty')
        portfolioAssetSymb.innerText  = `${tableData[i].id}`
        portfolioAssetName.innerText = `${tableData[i].name}`
        portfolioAssetPrice.innerText = `$${tableData[i].currentprice}`
        portfolioAssetQty.innerText = `${tableData[i].amount}`
        portfolioAssetAdd.innerText = `+`
        portfolioAssetDelete.appendChild(deleteSpan)
        deleteSpan.classList.add('fa')
        deleteSpan.classList.add('fa-trash')


        // fa fa-trash
        // portfolioAssetAdd.classList.add('addQty')

        let tr = document.createElement('tr')
        tr.appendChild(portfolioAssetSymb)
        tr.appendChild(portfolioAssetName)
        tr.appendChild(portfolioAssetPrice)
        tr.appendChild(portfolioAssetQty)
        tr.appendChild(portfolioAssetAdd)
        tr.appendChild(portfolioAssetDelete)
        tbody.appendChild(tr)
    }
    }else{
      console.log('table is empty')
      document.querySelector('#chart').style.display = 'none'
    }
  } catch (err){
    console.error(err)
  }
}
generatePortfolioTableData()



// ADD QTY CALL MODAL

  const addQtyTds =document.querySelectorAll('.addQty')

  Array.from(addQtyTds).forEach(item => {
    item.addEventListener('click', currencyToAddTo)
  })


async function currencyToAddTo() {
    let currencyToTargetInLS = this.parentNode.childNodes[0].innerText

    let addValue = await my_prompt();
    if(addValue === null) {
      addValue = 0;
      return;
    }
    // get item from local storage
    let storageItem = JSON.parse(localStorage.getItem(currencyToTargetInLS));
    storageItem.amount += addValue
       localStorage.setItem(currencyToTargetInLS, JSON.stringify(storageItem))
    window.location.reload()
    // set item's qty to add value qty
}



  let deleteBtns = document.querySelectorAll('.fa-trash')

  Array.from(deleteBtns).forEach(item => {
    item.addEventListener('click', deleteCoinFromPortfolio)
  })

  // DELETE ITEM FROM TABLE
  async function deleteCoinFromPortfolio(e) { 
    let currencyToDelete = this.parentNode.parentNode.childNodes[0].innerText
    
    // let currencyInLS = localStorage.getItem(currencyToDelete)
    localStorage.removeItem(currencyToDelete)

      window.location.reload()

}


// Get sum to display in a chart
function getPortfolioSum(){
    let data = allStorage()
    let sum = 0;

    if(data && data.length > 0){
      for(let i = 0; i < data.length; i++){
        sum += data[i].currentprice * data[i].amount
      }
    let balance = document.querySelector('.portfolioBalance')
    balance.innerText = `Current Balance: $${sum.toFixed(2)} CAD`
    }
    return sum.toFixed(2)
 }
 getPortfolioSum()







//  Dropdown menu on portfolio

document.querySelector('#dropdownBtn').addEventListener('click', enableDropDown)

document.querySelector('#myInput').addEventListener('keypress', filterDropdownMenuItems)


function enableDropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// FILTER FOR DROPDOWN MENU
function filterDropdownMenuItems() {
  let input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  let div = document.querySelector("#myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
   let txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}



// PORTFOLIO CHART
async function generateChart(){

  try{

    let storedCoins = await allStorage()
    let currentPortfolioSum = getPortfolioSum()
    console.log(currentPortfolioSum)

    let percentages = []
    let currencies = []

    for(let i = 0; i < storedCoins.length; i++){
      
      let perc = storedCoins[i].currentprice * storedCoins[i].amount
      let percentage = (perc / currentPortfolioSum) * 100
      currencies.push(storedCoins[i].id.toUpperCase())
      percentages.push(Number(percentage.toFixed(2)))
      console.log(storedCoins[i].id)
    }

    console.log(percentages)
 
  
  
    let options = {
      series: percentages,
      chart: {
      width: 400,
      type: 'pie',
    },
    labels: currencies,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
      }
    }]
    };
    
    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  

  } catch(err) {
    console.error(err)
  }
  
}

generateChart()










