// Select the container and buttons
const directoryContainer = document.querySelector('#directory-container');
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

const membersURL = 'data/members.json';

// Async function to fetch the data
async function getChamberMembers() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

// Function to build the HTML cards
const displayMembers = (members) => {
    // Clear out the container before adding new stuff
    directoryContainer.innerHTML = '';

    members.forEach((member) => {
        // Create elements
        let card = document.createElement('section');
        
        // Translate the membership level number into a readable string
        let levelName = "";
        if (member.membershipLevel === 1) {
            levelName = "Member";
        } else if (member.membershipLevel === 2) {
            levelName = "Silver";
        } else if (member.membershipLevel === 3) {
            levelName = "Gold";
        }
        
        // Build the HTML inside the section (Now including the levelName!)
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="150">
            <h3>${member.name}</h3>
            <p><strong>Level:</strong> ${levelName}</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">${member.website}</a>
        `;
        
        // Append the card to the container
        directoryContainer.appendChild(card);
    });
}

// Event Listeners for Grid/List Toggle Buttons
gridButton.addEventListener('click', () => {
    // Change container layout
    directoryContainer.classList.add('grid');
    directoryContainer.classList.remove('list');
    
    // Toggle active state on the buttons themselves
    gridButton.classList.add('active');
    listButton.classList.remove('active');
});

listButton.addEventListener('click', () => {
    // Change container layout
    directoryContainer.classList.add('list');
    directoryContainer.classList.remove('grid');
    
    // Toggle active state on the buttons themselves
    listButton.classList.add('active');
    gridButton.classList.remove('active');
});

// Call the function to start the process!
getChamberMembers();