// Select the hamburger button and the navigation list
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
    // Toggle the 'open' class on the navigation list
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
});