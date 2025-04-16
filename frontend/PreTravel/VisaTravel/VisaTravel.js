import { visaRequirements } from './VisaData.js';

document.addEventListener("DOMContentLoaded", () => {
  const country = localStorage.getItem("selectedDestination") || "Thailand";
  const origin = localStorage.getItem("selectedFrom") || "SE";
  renderStaticVisaInfo(country);
  fetchLiveVisaData(origin, getCountryCode(country)); // Use ISO2 code from destination name
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

    <div id="live-visa-data" class="live-visa-box">
      <p>🔄 Fetching up-to-date visa info...</p>
    </div>
  `;
}

// --- LIVE API FETCH ---
async function fetchLiveVisaData(from, to) {
  const liveBox = document.getElementById("live-visa-data");
  if (!from || !to || !liveBox) return;

  try {
    const response = await fetch(`https://rough-sun-2523.fly.dev/visa/${from}/${to}`);
    if (!response.ok) throw new Error("Could not fetch live visa info");

    const data = await response.json();
    liveBox.innerHTML = `
      <h3>🌐 Live Visa Info (${from} ➜ ${to})</h3>
      <div class="visa-card open">
        <h4>Status: ${data.requirement}</h4>
        <p><strong>Type:</strong> ${data.subtext || "N/A"}</p>
        <p><strong>Note:</strong> ${data.note || "No additional info."}</p>
      </div>
    `;
  } catch (err) {
    liveBox.innerHTML = `<p>⚠️ Could not fetch live visa info. Try again later.</p>`;
    console.error(err);
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
