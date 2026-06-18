document.addEventListener("DOMContentLoaded", () => {
    // Grab the current URL parameters
    const currentUrl = window.location.href;
    const everything = currentUrl.split('?');
    
    if (everything.length > 1) {
        let formData = everything[1].split('&');
        const resultsList = document.getElementById("form-results");

        formData.forEach(item => {
            let keyValuePair = item.split('=');
            let key = decodeURIComponent(keyValuePair[0]).replace(/\+/g, ' ');
            let value = decodeURIComponent(keyValuePair[1]).replace(/\+/g, ' ');

            // Create list items to display the data
            let li = document.createElement("li");
            li.style.marginBottom = "0.8rem";
            li.innerHTML = `<strong style="color: #3B82F6; text-transform: capitalize;">${key}:</strong> ${value}`;
            
            resultsList.appendChild(li);
        });
    }
});