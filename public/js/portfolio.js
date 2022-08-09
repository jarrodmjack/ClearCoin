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
        portfolioAssetActions.setAttribute('id', `${tableData[i].id}`)
        portfolioAssetActions.classList.add('addQty')
        portfolioAssetSymb.innerText  = `${tableData[i].id}`
        portfolioAssetName.innerText = `${tableData[i].name}`
        portfolioAssetPrice.innerText = `$${tableData[i].currentprice}`
        portfolioAssetQty.innerText = `${tableData[i].amount}`
        portfolioAssetActions.innerText = `+`
        // portfolioAssetActions.classList.add('addQty')

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


function my_prompt() {
    return new Promise((resolve, reject) => {
      modal.style.display = "block";
      const cleanup = () => {
        modal.style.display = "none";
        submitModalBtn.removeEventListener('click', onSubmit);
        closeModalBtn.removeEventListener('click', onClose);
      };

      const onSubmit = () => {
        cleanup();
        resolve(parseInt(numberInput.value, 10));
      };

      const onClose = () => {
        cleanup();
        resolve(null);
      };

      submitModalBtn.addEventListener('click', onSubmit);
      closeModalBtn.addEventListener('click', onClose);
    });
  }

//   make click event for + buttons. on click, I need to get the item currency I clicked on, get that item from localstorage and try to change the value of that item rather than 

  const addQtyTds =document.querySelectorAll('.addQty')

  Array.from(addQtyTds).forEach(item => {
    item.addEventListener('click', currencyToAddTo)
  })



  


async function currencyToAddTo(e) {
    let currencyToTargetInLS = this.parentNode.childNodes[0].innerText

    const addValue = await my_prompt();
    if(addValue === null) {
      return;
    }


    // get item from local storage
    let storageItem = JSON.parse(localStorage.getItem(currencyToTargetInLS));
    storageItem.amount += addValue
       localStorage.setItem(currencyToTargetInLS, JSON.stringify(storageItem))
    window.location.reload()
    // set item's qty to add value qty
}
  //   const add_value = await my_prompt();
  //   if (add_value === null) {
  //     return;
  //   }

  //   globalCounter += add_value;

  //   // instead of printing to a span, I want to update the qty content of the object from localstorage
  //   counter_span.textContent = globalCounter.toString();
  // };












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





