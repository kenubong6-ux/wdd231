import { places } from '../data/places.mjs';

document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------
    // 1. LocalStorage Visit Tracking Logic
    // -----------------------------------------
    const visitMessageArea = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    const msToDays = 84600000; // Milliseconds in a day

    if (!lastVisit) {
        visitMessageArea.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor((now - parseInt(lastVisit)) / msToDays);
        if (daysBetween < 1) {
            visitMessageArea.textContent = "Back so soon! Awesome!";
        } else {
            visitMessageArea.textContent = `You last visited ${daysBetween} ${daysBetween === 1 ? 'day' : 'days'} ago.`;
        }
    }
    // Update the local storage with the current visit time
    localStorage.setItem('lastVisit', now);

    // -----------------------------------------
    // 2. Render the 8 Cards from the Module
    // -----------------------------------------
    const grid = document.getElementById('discover-grid');

    places.forEach((place, index) => {
        const card = document.createElement('section');
        // Add a general class, plus a unique class for CSS Grid Areas (c1, c2, etc.)
        card.className = `card c${index + 1}`;
        
        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="learn-more">Learn More</button>
        `;
        grid.appendChild(card);
    });
});