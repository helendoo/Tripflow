import { healthData } from './healthData.js';

function toggleMenu() {
    const menu = document.getElementById("sidebar");
    const body = document.body;
    menu.classList.toggle("open");
    body.classList.toggle("sidebar-open");
  }
  
  window.toggleMenu = toggleMenu;
  

  document.addEventListener('DOMContentLoaded', () => {
    const country = localStorage.getItem('selectedDestination') || 'Thailand';
    const info = healthData[country];
    const healthContainer = document.getElementById('health-content');
    const countryTitle = document.getElementById('country-title');
  
    if (info) {
      countryTitle.textContent = `Health & Vaccination Info for ${country}`;
  
      const section = (title, contentHTML) => `
        <details class="accordion">
          <summary>${title}</summary>
          ${contentHTML}
        </details>
      `;
  
      const vaccinations = `<ul>${info.vaccinations.map(v => `<li>${v}</li>`).join('')}</ul>`;
      const diseases = `<ul>${info.diseases.map(d => `<li><strong>${d.name}:</strong> ${d.description}</li>`).join('')}</ul>`;
      const tips = `<ul>${info.tips.map(t => `<li>${t}</li>`).join('')}</ul>`;
      const whenToSeeDoctor = `<ul>${info.whenToSeeDoctor.map(t => `<li>${t}</li>`).join('')}</ul>`;
  
      healthContainer.innerHTML = `
        ${section("General Health Advice", `<p>${info.generalAdvice}</p>`)}
        ${section("Recommended Vaccinations", vaccinations)}
        ${section("Common Diseases", diseases)}
        ${section("Healthcare System", `<p>${info.healthcare}</p>`)}
        ${section("Health Tips", tips)}
        ${section("When to See a Doctor", whenToSeeDoctor)}
        ${section("Official Source", `<p><a href="${info.source}" target="_blank">${info.source}</a></p><p><em>Last updated: ${info.lastUpdated}</em></p>`)}
      `;
    } else {
      healthContainer.innerHTML = "<p>No health data available for this destination.</p>";
    }
  });