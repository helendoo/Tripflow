import { essentialsByCountry, dontMissOutByCountry  } from './essentialsData.js';


function toggleMenu() {
  const menu = document.getElementById("sidebar");
  const body = document.body;
  menu.classList.toggle("open");
  body.classList.toggle("sidebar-open");
}

window.toggleMenu = toggleMenu;

document.addEventListener("DOMContentLoaded", () => {
  const destination = localStorage.getItem("selectedDestination") || "Thailand";
  const data = essentialsByCountry[destination] || {};

  document.getElementById("essentials-title").textContent = `Travel Essentials for ${destination}`;

  const renderList = (items, containerId) => {
    const container = document.getElementById(containerId);
    const ul = document.createElement("ul");
    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  };

  if (data) {
    renderList(data.packing, "pack");
    renderList(data.tips, "tips");
    renderList(data.inspo, "inspo");
    renderDontMissOut(destination);
  }

  document.querySelectorAll(".accordion-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      content.classList.toggle("open");
    });
  });
});


function renderDontMissOut(countryCode) {
    const container = document.getElementById("dont-miss-out-container");
    const items = dontMissOutByCountry[countryCode.toLowerCase()] || [];
  
    container.innerHTML = items.map(item => `
      <div class="dont-miss-card">
        <img src="${item.image}" alt="${item.title}">
        <div class="dont-miss-content">
          <h3>${item.title}</h3>
          <p><strong>Description:</strong> ${item.description}</p>
          <p><strong>Location:</strong> ${item.location}</p>
          <p><strong>How to get there:</strong> ${item.access}</p>
          <p><strong>Price:</strong> ${item.price}</p>
        </div>
      </div>
    `).join("");
  }
  



