// fetchData.js - Exporting the fetch logic as an ES Module
export async function getRigData(url) {
    try {
        const response = await fetch(url);
        
        // Robust error handling
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.rigAndRaceData; // Returns the array from your JSON file
        
    } catch (error) {
        console.error("Failed to fetch rig data:", error);
        return []; // Return an empty array so the site doesn't break
    }
}