// Select the hamburger button and the navigation menu
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

// Listen for the click event
menuButton.addEventListener('click', () => {
    // Toggle the 'open' class to show/hide the menu
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
    
    // Check if the menu is now open
    if (menuButton.classList.contains('open')) {
        // If it is open, change the icon to an "X"
        menuButton.innerHTML = '&#10005;';
    } else {
        // If it is closed, change it back to the hamburger
        menuButton.innerHTML = '&#9776;';
    }
});