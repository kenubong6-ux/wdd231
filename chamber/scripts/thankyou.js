// Grab the entire URL query string
const currentUrl = window.location.href;
const urlData = currentUrl.split('?')[1];

if (urlData) {
    // Break the string into individual pieces
    const formData = urlData.split('&');

    function showData(key) {
        let result = "";
        formData.forEach((item) => {
            if (item.startsWith(key)) {
                // Decode the URL characters (like %40 for @ or + for space)
                result = decodeURIComponent(item.split('=')[1].replace(/\+/g, ' '));
            }
        });
        return result;
    }

    // Output the data to the HTML spans
    document.getElementById("display-name").textContent = `${showData('first_name')} ${showData('last_name')}`;
    document.getElementById("display-email").textContent = showData('email');
    document.getElementById("display-phone").textContent = showData('phone');
    document.getElementById("display-business").textContent = showData('business_name');
    document.getElementById("display-timestamp").textContent = showData('timestamp');
}