const weatherLocation = document.querySelector(".location");
const weatherTemperature = document.querySelector(".temperature");
const weatherIcon = document.querySelector("img");

const API_KEY = "2cff1af5f4f2496b7e76b513600c2e3f";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      const country = json.sys.country;
      const icon = json.weather[0].icon;
      const description = json.weather[0].description;
      console.log(weatherLocation);
      weatherLocation.innerText = `${place}, ${country}`;
      weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
      weatherTemperature.innerText = `${temperature}°C`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObjd = {
    latitude,
    longitude,
  };
  saveCoords(coordsObjd);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("Cannot access your location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
