import { visaRequirements } from './VisaData.js';

document.addEventListener("DOMContentLoaded", () => {
  const country = localStorage.getItem("selectedDestination") || "Thailand";
  const origin = localStorage.getItem("selectedFrom") || "SE";
  renderStaticVisaInfo(country);
  fetchVisaRequirement(origin, destinationCode);
  fetchCountryGeneralInfo(country);
});

// --- STATIC DATA ---
function renderStaticVisaInfo(country) {
  const visaContainer = document.getElementById("visa-info");
  const visaData = visaRequirements[country];

  if (!visaData || !visaContainer) {
    visaContainer.innerHTML = "<p>No visa information available.</p>";
    return;
  }

  visaContainer.innerHTML = `
    <h2>Visa & Travel Requirements for ${country}</h2>
    ${visaData.map(info => `
      <div class="visa-card" onclick="this.classList.toggle('open')">
        <h3>${info.title}</h3>
        <div class="visa-content">
          <p>${info.details}</p>
        </div>
      </div>
    `).join("")}
  `;
}

async function fetchVisaRequirement(originCode = "SE", destinationCode = "TH") {
  const visaBox = document.getElementById("live-visa-api-info");

  try {
    const response = await fetch("https://visa-requirement.p.rapidapi.com/visa", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "YOUR_API_KEY",
        "X-RapidAPI-Host": "visa-requirement.p.rapidapi.com"
      },
      body: new URLSearchParams({
        passport: originCode,
        destination: destinationCode
      })
    });

    const data = await response.json();

    visaBox.innerHTML = `
    <div class="visa-card open">
      <h3>🌍 Visa Requirement: ${getCountryName(originCode)} → ${getCountryName(destinationCode)}</h3>
      <div class="visa-content">
        <p>${data.visa || "No information available."}</p>
      </div>
    </div>
  `;
  
  } catch (error) {
    console.error("Visa API error:", error);
    visaBox.innerHTML = "⚠️ Could not load visa info.";
  }
}



// --- ISO Country Code Helper ---
function getCountryCode(name) {
  const map = {
    "Thailand": "TH",
    "Sweden": "SE",
    "Germany": "DE",
    "United States": "US",
    "France": "FR",
    "Spain": "ES",
    "Italy": "IT",
    "Japan": "JP",
    "India": "IN",
    "Brazil": "BR",
    "Canada": "CA",
    "Mexico": "MX",
    "China": "CN",
    "Australia": "AU",
    "New Zealand": "NZ",
    "South Korea": "KR",
    "Norway": "NO",
    "Denmark": "DK",
    "Finland": "FI",
    "Netherlands": "NL",
    "South Africa": "ZA",
    "Argentina": "AR",
    "Malaysia": "MY",
    "Singapore": "SG",
    "Indonesia": "ID",
    "Philippines": "PH"
  };
  return map[name] || "TH"; // fallback
}


async function fetchCountryGeneralInfo(countryName) {
  const countryBox = document.getElementById("country-info");
  if (!countryBox) return;

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`);
    const [data] = await res.json();

    countryBox.innerHTML = `
  <div class="info-toggle open" onclick="this.classList.toggle('open')">
    <h3>🌍 General Info About ${data.name.common}</h3>
    <div class="visa-content">
      <p><strong>Capital:</strong> ${data.capital?.[0] || "N/A"}</p>
      <p><strong>Region:</strong> ${data.region}</p>
      <p><strong>Population:</strong> ${data.population.toLocaleString()}</p>
      <p><strong>Currency:</strong> ${Object.values(data.currencies || {})[0]?.name || "N/A"} (${Object.values(data.currencies || {})[0]?.symbol || ""})</p>
      <p><strong>Languages:</strong> ${Object.values(data.languages || {}).join(", ")}</p>
    </div>
  </div>
`;

  } catch (err) {
    console.error("Country info error:", err);
    countryBox.innerHTML = `<p>⚠️ Could not load country details.</p>`;
  }
}
