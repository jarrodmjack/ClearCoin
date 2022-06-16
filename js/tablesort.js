/**
 * sorts an HTML table
 * @param {HTMLTableElement} table the table to sort
 * @param {number} column the index of the column to sort
 * @param {bool} asc Determines in the sorting will be in ascending
 */

 function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll('tr'));//selecting every table row element inside the tbody and put into array

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
      
        // console.log(column)
        if(column === 2 || column === 3 || column === 5){

            // getting innertext from column 1, 2 and 4, removing the dollar sign and sorting as number
            const aColText = Number(a.querySelector(`td:nth-child(${column + 1})`).innerText.slice(1).split(',').join(''))//<--- get table cell element at the index which pass in
            const bColText = Number(b.querySelector(`td:nth-child(${column + 1})`).innerText.slice(1).split(',').join(''))
            // console.log(aColText)
            // console.log(bColText)
            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier)
        }else if(column === 4){ //circulating supply
            const aColText = Number(a.querySelector(`td:nth-child(${column + 1})`).innerText)
            const bColText = Number(b.querySelector(`td:nth-child(${column + 1})`).innerText)
            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier)
        }
        // else if(column === 5){ // sort by percentages
        //     if(a.querySelector(`td:nth-child(${column + 1})`).innerText.slice(0, 1) === '-' && b.querySelector(`td:nth-child(${column + 1})`).innerText.slice(0, 1)){
        //         const aColText = Number(a.querySelector(`td:nth-child(${column + 1})`).innerText.slice(1).split('.').join(''))
        //         const bColText = Number(b.querySelector(`td:nth-child(${column + 1})`).innerText.slice(1).split('.').join(''))
        //         return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier)
        //     }else { //if percentage is positive
        //         const aColText = Number(a.querySelector(`td:nth-child(${column + 1})`).innerText.split('.').join(''))
        //         const bColText = Number(b.querySelector(`td:nth-child(${column + 1})`).innerText.split('.').join(''))
        //         return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier)
        //     }
        // }
        else{ //just sort by regular string (name category, column 0)
            const aColText = a.querySelector(`td:nth-child(${column + 1})`).innerText.trim() //<--- get table cell element at the index which we pass in
            const bColText = b.querySelector(`td:nth-child(${column + 1})`).innerText.trim()
            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier)
        }

    });

    // Remove all existing TRs from the table
    // while there is a firstchild in the tbody (single row element)
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }


    // Re add newly sorted rows
    tBody.append(...sortedRows);


    // remember how the column is currently sorted
    // clear out all of the current sorting on the table to remove each class
    table.querySelectorAll('th').forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'))
    // if we passed in ascending, we add th-sort-asc class to table header
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-asc', asc)
    // if we passed in descending, we add th-sort-desc class to table header
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-desc', !asc)

}

// sortTableByColumn(document.querySelector('table'), 1)

// selecting every table header element within a table, that is sortable
document.querySelectorAll('.table-sortable th').forEach(headerCell => {
    headerCell.addEventListener('click', () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement //going up parent 3 times
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains('th-sort-asc'); //column is currently sorted as ascending if it contains th-sort-asc class

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    })
})