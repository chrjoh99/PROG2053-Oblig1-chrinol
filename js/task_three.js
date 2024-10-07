fetchWeather();

async function fetchWeather() {

    const weatherContainer = document.getElementById('weather-container');

    weatherContainer.innerHTML = ''; // Clear the container of weather data

    const locations = [ // Coordinates from: www.geodatos.net
        { name: "Oslo", latitude: 59.91273, longitude: 10.74609},           
        { name: "Gjøvik", latitude: 60.79574, longitude: 10.69155},
        { name: "Fredrikstad", latitude: 59.2181, longitude: 10.9298},
        { name: "Tokyo", latitude: 35.6895, longitude: 139.69171},
        { name: "London", latitude: 51.50853, longitude: -0.12574},
        { name: "New York", latitude: 40.71427, longitude: -74.00597},
        { name: "Amsterdam", latitude: 52.37403, longitude: 4.88969},
        { name: "Helsinki", latitude: 60.16952, longitude: 24.93545},
        { name: "Auckland", latitude: -36.84853, longitude: 174.76349},
    ];

    try {
        for (const location of locations) {
            
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`); //Template string to pass in the variables
        
            if(!response.ok){
                throw new Error("Could not fetch data");
            }

            const data = await response.json();

            // Collect weather data
            const { temperature, windspeed, winddirection } = data.current_weather; 

            // Create a weather container
            const weatherData = document.createElement('div');
            weatherData.classList.add('weather-box');

            weatherData.innerHTML = `
                <h3>${location.name}</h3>
                <p>Temperature: ${temperature}&deg;C</p>
                <p>Wind Speed: ${windspeed} km/h</p>
                <p>Wind Direction: ${winddirection}&deg;</p>
            `;

            weatherContainer.appendChild(weatherData);

        }
    }
    catch(error){
        console.error(error);
    }
    
}

// Refresh weather data every minute
setInterval(fetchWeather, 60000);