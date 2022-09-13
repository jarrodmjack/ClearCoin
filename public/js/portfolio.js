


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}



const modal = document.querySelector('.addQtyModal');
// prompt/modal for adding qty's
function my_prompt() {
  console.log('prompt running')
  return new Promise((resolve, reject) => {
    modal.style.display = "block";
    const cleanup = () => {
      modal.style.display = "none";
      submitModalBtn.removeEventListener('click', onSubmit);
      closeModalBtn.removeEventListener('click', onClose);
    };

    const onSubmit = () => {
      cleanup();
      if (!numberInput.value) {
        resolve(0)
      }
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







let dropdownListItems = Array.from(document.querySelectorAll('.listItems'))

dropdownListItems.forEach(listItem => {
  listItem.addEventListener('click', addCurrencyToPortfolio)
})

async function addCurrencyToPortfolio(e) {

  const name = e.target.innerText
  const currencyId = e.target.getAttribute('id')
  let qty = await my_prompt();
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=99&page=1&sparkline=false')
  const data = await response.json()
  const currencyToFind = data.find(item => item.symbol === currencyId)
  const currencyPrice = currencyToFind.current_price

  const currencyToAdd = {
    name: name,
    price: currencyPrice,
    id: currencyId,
    qty: qty,
    date: Date.now()
  }

  if (!qty || qty === null) {
    return;
  }

  try {
    const response = await fetch('portfolio/addCurrencyToPortfolio', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'currency': currencyToAdd
      })
    })
    location.reload()

  } catch (err) {
    console.log(err)
  }
}


let qtyAddButtons = document.querySelectorAll('.addPortfolioQty')

Array.from(qtyAddButtons).forEach(button => {
  button.addEventListener('click', addQtyToCurrencyFromTable)
})

async function addQtyToCurrencyFromTable(){


  try {
    const id = this.parentNode.childNodes[3].getAttribute('id')
    let qty = await my_prompt();
    const response = await fetch('portfolio/addQtyToCurrency', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'currencyId': id,
        'qtyToAdd': qty
      })
    })
    location.reload()

  } catch (err) {
    console.log(err)
  }


}





// let deleteButtons = document.querySelectorAll('.deleteCurrency')

// Array.from(deleteButtons).forEach(button => {
//   button.addEventListener('click', deleteCurrencyFromTable)
// })

// async function deleteCurrencyFromTable(){
//   // console.log('delete item')
//   const id = this.parentNode.childNodes[3].getAttribute('id')
//   const response = await fetch('portfolio/deleteCurrency', {
//       method: 'delete',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         'currencyId': id,
//       })
//     })

// }





function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

// Get portfolio Balance

// async function getPortfolioBalance(){
  
  
// }


// PORTFOLIO CHART






// function generatePortfolioPieChart(){

// let options = {
//   series: [15,25,32,17,11],
//   chart: {
//   width: 400,
//   type: 'pie',
// },
// labels: ['btc', 'usdt', 'eth', 'doge', 'algo'],
// responsive: [{
//   breakpoint: 480,
//   options: {
//     chart: {
//       width: 200
//     },
//   }
// }]
// };

// let chart = new ApexCharts(document.querySelector("#chart"), options);
// chart.render();

// }

// generatePortfolioPieChart()















// document.querySelector('#dropdownBtn').addEventListener('click', enableDropDown)
// document.querySelector('#myInput').addEventListener('keypress', filterDropdownMenuItems)


// function enableDropDown() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

// // // FILTER FOR DROPDOWN MENU
// function filterDropdownMenuItems() {
//   let input, filter, ul, li, a, i;
//   input = document.getElementById("myInput");
//   filter = input.value
//   let div = document.querySelector("#myDropdown");
//   a = div.getElementsByTagName("a");
//   for (i = 0; i < a.length; i++) {
//    let txtValue = a[i].textContent || a[i].innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       a[i].style.display = "";
//     } else {
//       a[i].style.display = "none";
//     }
//   }
// }





// let dropdownListItems = document.querySelectorAll('.listItems')

// Array.from(dropdownListItems).forEach((element) => { //create an array from deleteBtn variable
//   element.addEventListener('click', selectItemFromDropdownMenu) //add a click event listener to each item
// })

// function selectItemFromDropdownMenu(){
//   console.log(this.innerText)
// }











