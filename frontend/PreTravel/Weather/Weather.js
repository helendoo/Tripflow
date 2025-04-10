import { regionSeasons } from "./Data/regionDetails.js";

function toggleMenu() {
  const menu = document.getElementById("sidebar");
  const body = document.body;

  menu.classList.toggle("open");
  body.classList.toggle("sidebar-open");
}

document.addEventListener("DOMContentLoaded", () => {
  const input = localStorage.getItem('selectedDestination') || "Thailand";
  const city = getCapitalCity(input);    // For weather
  const country = normalizeCountry(input); // For map + region info

  fetchWeather(city);
  fetchWeatherAPI(city);
  displayRegionWeather(country);
  loadCountryMap(country);
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


function normalizeCountry(input) {
  const cityToCountry = {
    Bangkok: "Thailand",
    Tokyo: "Japan",
    Rome: "Italy",
    Paris: "France",
    Stockholm: "Sweden",
    Madrid: "Spain",
    Berlin: "Germany"
    // Add more as needed
  };

  return cityToCountry[input] || input;
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


/*WEATHER OF REGION*/
function colorMapRegions(country) {
  const regionData = regionSeasons[country];
  const svgDoc = document.querySelector("#countryMap"); // <-- direkt SVG, inte objekt

  if (!regionData || !svgDoc) return;

  for (const region in regionData) {
    const element = svgDoc.getElementById(region);
    if (element) {
      element.style.fill = regionData[region].color || "#ccc";
      element.style.cursor = "pointer";

      element.addEventListener("click", () => {
        showRegionPopup(region, regionData[region]);
      });
    }
  }
}




function displayRegionWeather(country) {
  const data = regionSeasons[country];
  const container = document.getElementById("region-list");

  if (!data || !container) return;

  container.innerHTML = ""; // clear previous

  for (const region in data) {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${region}</strong><br>
      Rainy season: ${data[region].months}<br>
      ${data[region].info.replace(/\n/g, "<br>")}
    `;
    container.appendChild(item);
  }
}

function loadCountryMap(country) {
  const mapPath = `Maps/${country}.svg`;
  const mapContainer = document.getElementById("region-map");

  if (!mapContainer) return;

  fetch(mapPath)
    .then(res => {
      if (!res.ok) throw new Error(`SVG map for ${country} not found`);
      return res.text();
    })
    .then(svg => {
      mapContainer.innerHTML = svg;

      // Vänta tills SVG har laddats in i DOM:en
      const svgElement = mapContainer.querySelector("svg");
      if (!svgElement) return;

      svgElement.setAttribute("id", "countryMap"); // Lägg till ID för vidare användning
      colorMapRegions(country); // Kör efter att SVG är tillagd
    })
    .catch(err => {
      mapContainer.innerHTML = `<p style="color:red;">Map not available for ${country}</p>`;
      console.error(err);
    });
}


function showRegionPopup(regionName, regionData) {
  const instruction = document.getElementById("region-instruction");
  if (instruction) instruction.style.display = "none";

  
  const popup = document.getElementById("region-popup");
  popup.innerHTML = `
    <strong>${regionName}</strong><br>
    ${regionData.months ? `<p><strong>Weather Season:</strong><br> ${regionData.months}</p>` : ""}
    ${regionData.info ? `<p><strong>Other Info:</strong><br>${regionData.info.replace(/\n/g, "<br>")}</p>` : ""}
    <button onclick="hideRegionPopup()">Close</button>
  `;
  popup.classList.remove("hidden");
  popup.classList.add("visible");
}

function hideRegionPopup() {
  const popup = document.getElementById("region-popup");
  popup.classList.remove("visible");
  popup.classList.add("hidden");
}

/*So HTML can fetch from these function*/

window.toggleMenu = toggleMenu;
window.hideRegionPopup = hideRegionPopup;



