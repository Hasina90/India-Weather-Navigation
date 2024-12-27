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
// function showAlertBasedOnWeather(weatherCondition) {
//     if (weatherCondition.toLowerCase().includes('rain')) {
//         alert('It\'s raining outside! Don\'t forget your umbrella.');
//     } else if (weatherCondition.toLowerCase().includes('clear') || weatherCondition.toLowerCase().includes('sunny')) {
//         alert('It\'s a sunny day! Wear your sunglasses.');
//     } else if (weatherCondition.toLowerCase().includes('cloud')) {
//         alert('It\'s cloudy today. Might rain later, be prepared.');
//     } else if (weatherCondition.toLowerCase().includes('snow')) {
//         alert('It\'s snowing! Wear warm clothes.');
//     } else if (weatherCondition.toLowerCase().includes('storm') || weatherCondition.toLowerCase().includes('thunderstorm')) {
//         alert('There\'s a storm outside! Stay indoors if possible.');
//     } else if (weatherCondition.toLowerCase().includes('fog')) {
//         alert('It\'s foggy! Drive carefully.');
//     } else if (weatherCondition.toLowerCase().includes('wind')) {
//         alert('It\'s windy today! Hold onto your hat.');
//     } else {
//         alert('Weather is looking good. Have a great day!');
//     }
// }



//     // // Function to change background image based on the weather condition
    // function changeBackground(imageUrl) {
    //     document.body.style.backgroundImage = `url('${imageUrl}')`;
    //     document.body.style.backgroundSize = 'cover';
    //     document.body.style.backgroundRepeat = 'no-repeat';
    //     document.body.style.height = '100vh';
    // }
    
    // function updateBackgroundBasedOnWeather(Condition) {
    //     if (Condition.includes('rain')) {
    //         changeBackground('rainy.png');
    //     } else if (Condition.includes('clear sky')) {
    //         changeBackground('sunny.png');
    //     } else if (Condition.includes('cloud')) {
    //         changeBackground('cloudy.png');
    //     } else {
    //         changeBackground('default.png');
    //     }
    // }
    
    // // Example: call the function with a sample weather condition
    // updateBackgroundBasedOnWeather('clear sky');
    
// function changeBackground(Temperature) {
//     const body = document.body;
//     console.log("Temperature received:", Temperature);

//     // Reset background image
//     body.style.backgroundImage = "";

//     if (Temperature =="clear sky") {
//         // Hot weather (above 30°C)
//         document.body.style.backgroundImage ="url('default.png')";
//     } else if (Temperature >= 20 && Temperature <= 30) {
//         // Warm weather (20°C to 30°C)
//         body.style.backgroundImage = "url('rainy.png')";
//     } else if (Temperature >= 10 && Temperature < 20) {
//         // Cool weather (10°C to 19°C)
//         body.style.backgroundImage = "url('snowy.png')";
//     } else if (Temperature >= 0 && Temperature < 10) {
//         // Cold weather (0°C to 9°C)
//         body.style.backgroundImage = "url('foggy.png')";
//     } else {
//         // Freezing weather (below 0°C)
//         body.style.backgroundImage = "url('foggy.png')";
//     }

    


// }
