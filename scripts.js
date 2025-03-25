const cityInput = document.getElementById("cityInput");
const weatherBox = document.getElementById("weatherBox");
const apiKey = "fbf7cb72862cfcf4f9951be617a30db1";
const inputSection = document.getElementById("inputSection");

// Add event listener for Enter key
cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather(){
    const city = cityInput.value;
    if(city){
        try{
            const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        
            console.log(response);
        
            if (!response.ok){
                throw new Error("Could not fetch weather data.");
            }
            data = await response.json();

            console.log(data);
            
            const {
                name: cityName,
                main: {temp, humidity},
                weather: [{description, id}]
            } = data;
            
            weatherBox.textContent = "";
            weatherBox.style.display = "block";

            const cityDisplay = document.createElement("h1");
            const tempDisplay = document.createElement("h2");
            const humidityDisplay = document.createElement("h3");
            const descDisplay = document.createElement("h3");
            const weatherEmoji = document.createElement("p");

            cityDisplay.textContent = cityName;
            weatherBox.appendChild(cityDisplay);

            const tempInFahrenheit = (temp - 273.15) * (9/5) + 32;
            const finalTemp = tempInFahrenheit.toFixed(0);
            tempDisplay.textContent = `${finalTemp}°F`;
            weatherBox.appendChild(tempDisplay);

            humidityDisplay.textContent = `Humidity: ${humidity}%`;
            weatherBox.appendChild(humidityDisplay);
            
            descDisplay.textContent = `${description}`;
            weatherBox.appendChild(descDisplay);

            let emoji;
            switch (true) {
                case (id >= 200 && id < 300):
                    emoji = "⚡";
                    break;
                case (id >= 300 && id < 400):
                    emoji = "🌦️";
                    break;
                case (id >= 500 && id < 600):
                    emoji = "🌧️";
                    break;
                case (id >= 600 && id < 700):
                    emoji = "❄️";
                    break;
                case (id >= 700 && id < 800):
                    emoji = "🌫️";
                    break;
                case (id === 800):
                    emoji = "☀️";
                    break;
                case (id >= 801 && id < 810):
                    emoji = "☁️";
                    break;
                default:
                    emoji = "?";
            }
            
            weatherEmoji.textContent = emoji;
            weatherBox.appendChild(weatherEmoji);
        }
        catch(error){
            console.error(error);
        }
    }
    else{
        displayError("Please enter a city.");
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;

    weatherBox.textContent = "";
    weatherBox.style.display = "block";
    weatherBox.appendChild(errorDisplay);
}