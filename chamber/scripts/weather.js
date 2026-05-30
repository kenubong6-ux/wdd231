// Replace with your actual OpenWeatherMap API Key
const apiKey = '436ae97d4b3510cf783e5c132e1650c3'; 
const lat = 4.8156;
const lon = 7.0498;

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const currentResponse = await fetch(currentUrl);
        if (currentResponse.ok) {
            const currentData = await currentResponse.json();
            displayCurrentWeather(currentData);
        }

        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayCurrentWeather(data) {
    const weatherContainer = document.querySelector('#current-weather');
    
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;

    weatherContainer.innerHTML = `
        <img src="${iconUrl}" alt="${desc}">
        <p><strong>${temp}&deg;C</strong></p>
        <p style="text-transform: capitalize;">${desc}</p>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.querySelector('#weather-forecast');
    if (!forecastContainer) return;
    
    forecastContainer.innerHTML = '';

    // Log the data to the console so we can see what OpenWeatherMap sent back
    console.log("Forecast API Response Data:", data);

    // DEFENSIVE CHECK: If list doesn't exist, handle it gracefully
    if (!data.list) {
        forecastContainer.innerHTML = `<p>Forecast data temporarily unavailable.</p>`;
        if (data.message) {
            console.warn("API Message:", data.message);
        }
        return;
    }

    // Grab the forecast for 24h, 48h, and 72h out (indices 7, 15, and 23)
    const dailyForecasts = [data.list[7], data.list[15], data.list[23]];

    dailyForecasts.forEach(day => {
        // Double check that this specific forecast hour exists
        if (day && day.dt) {
            const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(day.main.temp);
            
            const dayElement = document.createElement('p');
            dayElement.innerHTML = `<strong>${date}:</strong> ${temp}&deg;C`;
            forecastContainer.appendChild(dayElement);
        }
    });
}

fetchWeather();