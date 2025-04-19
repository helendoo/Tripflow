import { visaRequirements } from './VisaData.js';

document.addEventListener("DOMContentLoaded", () => {
  const country = localStorage.getItem("selectedDestination") || "Thailand";
  const origin = localStorage.getItem("selectedFrom") || "SE";
  renderStaticVisaInfo(country);
  fetchVisaRequirement(origin);
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

async function fetchVisaRequirement(countryCode = "SE") {
  const visaBox = document.getElementById("live-visa-api-info");

  try {
    const response = await fetch("https://visa-requirement.p.rapidapi.com/map", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "3544f404e6mshc4088a0deed8e69p136a52jsne3b1a0ea71fa",
        "X-RapidAPI-Host": "visa-requirement.p.rapidapi.com"
      },
      body: new URLSearchParams({
        passport: countryCode
      })
    });

    const data = await response.json();

    if (!data || !Array.isArray(data.visa)) {
      visaBox.innerHTML = "❌ No data returned.";
      return;
    }

    visaBox.innerHTML = `
      <div class="visa-card open">
        <h3>🌍 Visa Info Based on Passport: ${countryCode}</h3>
        <div class="visa-content">
          ${data.visa.slice(0, 10).map(entry => `
            <p><strong>${entry.country}</strong>: ${entry.visa || "No info"}</p>
          `).join("")}
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
    // 🔄 Add more as needed
  };
  return map[name] || "TH"; // fallback to Thailand
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
