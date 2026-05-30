// Select the DOM elements for output
const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

// Create a Date object to get the current year dynamically
const today = new Date();
year.innerHTML = today.getFullYear();

// Output the last modified date of the document
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;