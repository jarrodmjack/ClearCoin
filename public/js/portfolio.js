





const coinListItems = document.querySelectorAll('.listItems')

Array.from(coinListItems).forEach((element) => { //create an array from deleteBtn variable
    element.addEventListener('click', addCoinToPortfolio) //add a click event listener to each item
})

let cache



async function addCoinToPortfolio(e) {



    const result = await fetch('/getCurrentCoins')
    const data = await result.json()
    console.log(data)
    cache = data
    const selectedCurrency = e.target.innerText.split(' | ')[2]
    console.log(selectedCurrency)
    let res = data.find(item => item.id === selectedCurrency)
    console.log(res)

    // pick quantity of chosen item
    localStorage.setItem(`${res.id}`, JSON.stringify(res))

}



function allStorage() {
    let array = [];
    if(localStorage.length > 0){
        for (let i = 0; i < localStorage.length; i++) {
            array.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        return array
    }else{
        throw new Error
    }
    
}



// function displayPortfolioCoins(storedCoins = allStorage()){
//     // let storedCoins = allStorage()

//     const div = document.querySelector('.portfolioCoinContainer')

//     for(let i = 0; i < storedCoins.length; i++){
//         let h4 = document.createElement('h4')
//         h4.innerText = `- ${storedCoins[i].name} +   T`
//         div.appendChild(h4)
//     }
// }


function displayPortfolioCoins(storedCoins = allStorage()){
    // let storedCoins = allStorage()

    const div = document.querySelector('.portfolioCoinList')
    div.innerHTML = ''
    for(let i = 0; i < storedCoins.length; i++){
        let h4 = document.createElement('h4')
        h4.innerText = `- ${storedCoins[i].name} +   T`
        div.appendChild(h4)
    }
}

// Search coins

// document.querySelector('#testBtn').addEventListener('click', searchCoins)

document.querySelector('#coinSearch').addEventListener('keypress', searchCoins)

function searchCoins(){
    let storedCoins = allStorage()
    console.log('onchange func')
    let coin = document.querySelector('#coinSearch').value.toLowerCase()


    let filteredList = storedCoins.filter(item => item.name.toLowerCase().includes(coin))

    console.log(filteredList)
    displayPortfolioCoins(filteredList)    
}




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





