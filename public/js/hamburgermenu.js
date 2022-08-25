document.querySelector('.fa-bars').addEventListener('click', toggleHamburgerMenu)

function toggleHamburgerMenu(){
 
    const hamburgerNav = document.querySelector('.hamburgerMenuNav')

    hamburgerNav.classList.toggle('invisible')

}
