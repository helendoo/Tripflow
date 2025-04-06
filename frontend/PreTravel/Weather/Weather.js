function toggleMenu() {
  const menu = document.getElementById("sidebar");
  const body = document.body;

  menu.classList.toggle("open");
  body.classList.toggle("sidebar-open");
}

/*weather by region*/

const seasonalRegions = {
  Thailand: {
    North: { months: "Rainy season: May–Oct", color: "#3498db" },
    SouthWest: { months: "Rainy season: May–Oct", color: "#2ecc71" },
    SouthEast: { months: "Rainy season: Oct–Jan", color: "#f39c12" }
  },
  Italy: {
    North: "Cold winters, snowy Alps. Best travel: May–Sep",
    South: "Hot summers. Best travel: Mar–Jun & Sep–Nov",
  },
  Japan: {
    Hokkaido: "Cool climate, snowy winters. Best: Jun–Sep",
    TokyoRegion: "Rainy season: June–July. Best: Apr–May, Oct",
    Okinawa: "Tropical. Rainy: May–June. Typhoons: Aug–Sep",
  },
  Sweden: {
    North: "Snowy winters. Summer June–August.",
    South: "Mild winters. Rain throughout year. Best May–Sep",
  }  
};


function colorMapRegions(country) {
  const regionData = regionSeasons[country];
  const svgObject = document.getElementById("countryMap");

  if (!regionData || !svgObject) return;

  svgObject.addEventListener("load", () => {
    const svgDoc = svgObject.contentDocument;

    for (const region in regionData) {
      const element = svgDoc.getElementById(region);
      if (element) {
        element.style.fill = regionData[region].color;
        element.style.cursor = "pointer";
      }
    }
  });
}


function displayRegionWeather(country) {
  const data = regionSeasons[country];
  const container = document.getElementById("region-weather");

  if (!data) {
    container.innerHTML = `<p>No regional data available for ${country}.</p>`;
    return;
  }

  container.innerHTML = ""; // clear previous

  for (const region in data) {
    container.innerHTML += `
      <div class="region-card">
        <strong>${region}</strong><br>
        <span>${data[region].months}</span>
      </div>
    `;
  }
}




document.addEventListener("DOMContentLoaded", () => {
  const input = localStorage.getItem('selectedDestination') || "Bangkok";
  const city = getCapitalCity(input);
  fetchWeather(city);
  fetchWeatherAPI(city);
  displayRegionWeather(input);
  colorMapRegions(input); 
});

// 🔁 Fetch weather for a given city
function fetchWeather(city) {
  const apiKey = '68210e76015fb550f0c8fb446c057131'; // Your real key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(err => {
      document.getElementById("weather-result").innerHTML = `<p>Error: ${err.message}</p>`;
    });
}

function displayWeather(data) {
  const container = document.getElementById("weather-result");

  const weatherHTML = `
    <p><strong>Location:</strong> ${data.name}</p>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
    <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;

  container.innerHTML = weatherHTML;
}

function getCapitalCity(country) {
  const capitalMap = {
    Sweden: "Stockholm",
    Japan: "Tokyo",
    Thailand: "Bangkok",
    France: "Paris",
    Italy: "Rome",
    Spain: "Madrid",
    Germany: "Berlin",
    // Add more as needed
  };

  return capitalMap[country] || country;
}

// 🧭 Called when user searches for a new city manually
function changeCity() {
  const newCity = document.getElementById("cityInput").value;
  if (!newCity) return;

  localStorage.setItem("selectedDestination", newCity);
  fetchWeather(newCity);
  fetchWeatherAPI(newCity);
}

/*WEATHER 7 DAYS FORECAST*/

async function fetchWeatherAPI(city) {
  const apiKey = '7ff21172136248779f3163442250604'; // Replace with your WeatherAPI key
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=7`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather");

    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    document.getElementById("forecast").innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

function displayForecast(data) {
  const container = document.getElementById("forecast");
  container.innerHTML = `
  <h3>7-Day Forecast for ${data.location.name}, ${data.location.country}</h3>
  <div class="forecast-row"></div>
`;

  data.forecast.forecastday.forEach(day => {
    const date = day.date;
    const condition = day.day.condition.text;
    const icon = day.day.condition.icon;
    const temp = day.day.avgtemp_c;

    const row = container.querySelector(".forecast-row");
    row.innerHTML += `
      <div class="forecast-day">
        <strong>${date}</strong><br>
        <img src="https:${icon}" alt="${condition}" />
        <br>${condition}, ${temp}°C
      </div>
    `;
  });
}

