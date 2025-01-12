// API Key
const apiKey = "b3378a91186449f106e993ed63b990c9";

// Api Data Function
async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    console.log(data);

    // Update weather info (existing code)
    document.getElementById("city").innerHTML = data.name;
    document.getElementById("temp").innerHTML = `${Math.round(
      data.main.temp
    )} °F`;
    document.getElementById("humidity").innerHTML = `${data.main.humidity} %`;
    document.getElementById("wind").innerHTML = `${Math.round(
      data.wind.speed
    )} km/h`;

    // Update Weather Description
    const weatherDescription = data.weather[0].description;
    document.getElementById("weather-description").innerHTML =
      weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

    // Set Weather Icon from OpenWeather
    const iconCode = data.weather[0].icon;
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    // Calculate local date and time
    const timezoneOffset = data.timezone; // in seconds
    const localTime = new Date(Date.now() + timezoneOffset * 1000); // Adjusted for timezone

    // Format the date and time
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = localTime.toLocaleDateString("en-US", options);
    const formattedTime = localTime.toLocaleTimeString("en-US");

    // Update date and time in the DOM
    document.getElementById("Date").innerHTML = `Date: ${formattedDate}`;
    document.getElementById("time").innerHTML = `Time: ${formattedTime}`;
  } catch (error) {
    console.error(error);
    document.getElementById("city").innerHTML = "City not found";
  }
}

// Search Function
function searchCity() {
  const city = document.getElementById("cityInput").value;
  if (city) {
    checkWeather(city);
  }
}

// Fetch weather for a default city on page load
checkWeather("New York"); // Default city
