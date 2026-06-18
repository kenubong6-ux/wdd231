// Import the data fetching function from our ES Module
import { getRigData } from './fetchData.js';

document.addEventListener("DOMContentLoaded", async () => {
    // -----------------------------------------
    // 1. DOM Elements Selection
    // -----------------------------------------
    const grid = document.getElementById("dynamic-grid");
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");
    const currentYear = document.getElementById("current-year");
    const modal = document.getElementById("welcome-modal");
    const closeModalBtn = document.getElementById("close-modal");

    // Dynamically set the footer year
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // -----------------------------------------
    // 2. Responsive Hamburger Menu (Event Handling)
    // -----------------------------------------
    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("open");
            // Change icon from hamburger to 'X' when open
            menuToggle.innerHTML = mainNav.classList.contains("open") ? "&#10006;" : "&#9776;";
        });
    }

    // -----------------------------------------
    // 3. LocalStorage & Modal Dialog
    // -----------------------------------------
    // Check if the user has visited the site before
    const hasVisited = localStorage.getItem("phcRigRaceVisited");
    
    if (!hasVisited && modal) {
        // If it's their first time, show the welcome modal
        modal.showModal();
        // Set local storage so they don't see it again on refresh
        localStorage.setItem("phcRigRaceVisited", "true");
    }

    // Close modal event
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            modal.close();
        });
    }

    // -----------------------------------------
    // 4. Async Data Fetching & Dynamic Generation
    // -----------------------------------------
    const dataUrl = "data/data.json";
    const rigData = await getRigData(dataUrl);

    if (rigData.length > 0 && grid) {
        // Array Method: Use .map() to loop through data and Template Literals to build HTML
        const htmlElements = rigData.map(item => `
            <div class="card">
                <img src="${item.image}" alt="${item.title}" loading="lazy" width="300" height="200">
                <h4>${item.title}</h4>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Difficulty:</strong> ${item.difficulty}</p>
                <p>${item.description}</p>
            </div>
        `);

        // Inject the mapped array into the DOM as a single string
        grid.innerHTML = htmlElements.join("");
    } else if (grid) {
        // Fallback if data fails to load
        grid.innerHTML = "<p>Failed to load guides. Please try again later.</p>";
    }
});