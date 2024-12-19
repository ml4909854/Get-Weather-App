const apiKey = "37855fca9c64fca8d7e5cd33c853cfe4";

const weatherData = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const cityValue = cityInput.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels Like :${Math.round(data.main.feels_like)}°C`,
      `Humidity : ${data.main.humidity}%`,
      `Wind Speed : ${data.wind.speed}m/s`,
    ];
    weatherData.querySelector(".icon").innerHTML = ` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weathericon">`
    weatherData.querySelector(".temperature").innerHTML = `${temperature}°C`
    weatherData.querySelector(".description").innerHTML = `${description}`
    weatherData.querySelector(".details").innerHTML = details.map((detail)=>
        `<div>${detail}</div>`
    ).join("")

  } catch (error) {
    weatherData.querySelector(".icon").innerHTML = ""
    weatherData.querySelector(".temperature").innerHTML = ``
    weatherData.querySelector(".description").innerHTML = `An error happened , please try again later`
    weatherData.querySelector(".details").innerHTML = details.map((detail)=>
        ``
    ).join("")
  }
}
