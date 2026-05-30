const membersURL = 'data/members.json';
const spotlightContainer = document.querySelector('#spotlight-container');

async function getSpotlightMembers() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data);
        }
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

function displaySpotlights(members) {
    const premiumMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

    const shuffled = premiumMembers.sort(() => 0.5 - Math.random());

    const selectedSpotlights = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // Picks 2 or 3

    spotlightContainer.innerHTML = '';
    
    selectedSpotlights.forEach(member => {
        let levelName = member.membershipLevel === 3 ? "Gold Member" : "Silver Member";
        
        let card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="100">
            <h4>${member.name}</h4>
            <p><strong>${levelName}</strong></p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Website</a>
        `;
        spotlightContainer.appendChild(card);
    });
}

getSpotlightMembers();