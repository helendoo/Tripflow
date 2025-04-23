import { mockSafetyData } from './safetyData.js';

function toggleMenu() {
    const menu = document.getElementById("sidebar");
    const body = document.body;
    menu.classList.toggle("open");
    body.classList.toggle("sidebar-open");
  }
  
  window.toggleMenu = toggleMenu;


  function createAccordion(title, htmlContent) {
    return `
      <div class="accordion">
        <h3>${title}</h3>
        <div class="content">${htmlContent}</div>
      </div>
    `;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const destination = localStorage.getItem("selectedDestination");
    const titleEl = document.getElementById("country-heading");
    const infoEl = document.getElementById("safetyAccordion");
  
    if (!destination) {
      titleEl.textContent = "No destination found.";
      infoEl.innerHTML = "<p>Please return to the homepage and select a destination.</p>";
      return;
    }
  
    titleEl.textContent = `Safety Information for ${destination}`;
    const info = mockSafetyData[destination];
  
    if (!info) {
      infoEl.innerHTML = "<p>No safety information available for this country.</p>";
      return;
    }
  
    infoEl.innerHTML = `
      ${createAccordion("🛡️ General Safety Advice", `<p>${info.generalAdvice}</p>`)}
      ${createAccordion("🚨 Emergency Numbers", `
        <ul>
          ${Object.entries(info.emergencyNumbers).map(
            ([service, number]) => `<li><strong>${service}:</strong> ${number}</li>`
          ).join('')}
        </ul>
      `)}
      ${createAccordion("📜 Laws & Smart Tips", `
        <ul>${info.lawsAndTips.map(tip => `<li>${tip}</li>`).join('')}</ul>
      `)}
      ${createAccordion("⚠️ High-Risk Areas", `
        <ul>${info.highRiskAreas.map(area =>
          `<li><strong>${area.city}</strong>: ${area.note}</li>`
        ).join('')}</ul>
      `)}
      ${info.soloAndWomenAdvice ? createAccordion("🧍 Advice for Solo Travelers & Women", `
        <ul>${info.soloAndWomenAdvice.map(tip => `<li>${tip}</li>`).join('')}</ul>
      `) : ''}
      ${createAccordion("🔗 Official Travel Advisory", `
        <p><a href="${info.source}" target="_blank">View official source</a></p>
      `)}
    `;
  
    // ✅ Attach accordion click events AFTER rendering
    document.querySelectorAll('.accordion h3').forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('open');
      });
    });
  });
  