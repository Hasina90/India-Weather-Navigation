async function fetchWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherDisplay = document.getElementById("weatherDisplay");

    if (!city) {
        weatherDisplay.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    weatherDisplay.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`/weather/${city}`);
        const data = await response.json();

        if (data.error) {
            weatherDisplay.innerHTML = `<p>${data.error}</p>`;
        } else {
            weatherDisplay.innerHTML = `
                <h2>Weather in ${data.city}</h2>
                <p>Temperature: ${data.temperature}°C</p>
                <p>Condition: ${data.description}</p>
                <img src="http://openweathermap.org/img/wn/${data.icon}@2x.png" alt="${data.description}">
             `
            ;
            console.log(`/weather/${city}`);
            console.log(data)  // Add this to inspect the returned data


    
        }
         // Customized alerts based on weather condition
         let weatherAlert = `Current weather in ${data.city}:\nTemperature: ${data.temperature}°C\nCondition: ${data.description}`;

         switch (data.description.toLowerCase()) {
             case 'clear sky':
                 weatherAlert += "\nIt's a beautiful day! Enjoy the sunshine.";
                 break;
             case 'few clouds':
                 weatherAlert += "\nA few clouds won't spoil your day! Enjoy!";
                 break;
             case 'scattered clouds':
                 weatherAlert += "\nSome clouds, but still a lovely day!";
                 break;
             case 'broken clouds':
                 weatherAlert += "\nOvercast, but still a great day to be outside!";
                 break;
             case 'shower rain':
             case 'rain':
                 weatherAlert += "\nDon't forget your umbrella!Stay safe";
                 break;
             case 'thunderstorm':
                 weatherAlert += "\nStay safe,Don't go outside! there’s a storm brewing!";
                 break;
             case 'snow':
                 weatherAlert += "\nSnowy conditions! Perfect for building a snowman!";
                 break;
             case 'mist':
             case 'smoke':
                 weatherAlert += "\nVisibility may be low, drive carefully!";
                 break;
             default:
                 weatherAlert += "\nEnjoy your day!";
                 break;
         }

          // Show the customized alert
          alert(weatherAlert);
        }
 
    catch (error) {
        console.error("fetch error:",error)
        weatherDisplay.innerHTML = "<p>Error fetching weather data. Please try again later.</p>";
        alert("Error fetching weather data. Please try again later.");
    }

}