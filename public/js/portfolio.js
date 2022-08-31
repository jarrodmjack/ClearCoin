
console.log('prtfol')

// async function fetchCurrenciesForDropdownMenu(){

//   const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=250&page=1&sparkline=false')
//   const data = await res.json()

//   console.log(data)

// }
// fetchCurrenciesForDropdownMenu()



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


let dropdownListItems = document.querySelectorAll('.listItems')

Array.from(dropdownListItems).forEach((element) => { //create an array from deleteBtn variable
  element.addEventListener('click', selectItemFromDropdownMenu) //add a click event listener to each item
})

function selectItemFromDropdownMenu(){
  console.log(this.innerText)
}









