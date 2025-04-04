function getData() {
    fetch('http://127.0.0.1:5000/api/info')
        .then(response => response.json())
        .then(data => {
            document.getElementById("output").innerText = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("output").innerText = "Error connecting to backend.";
        });
}

function toggleDropdown() {
    const dropdown = document.getElementById("dropdown-content");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  }
  
  // Optional: Close dropdown when clicking outside
  window.addEventListener("click", function (e) {
    const button = document.querySelector(".dropbtn");
    const dropdown = document.getElementById("dropdown-content");
  
    if (!button.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });


  let countries = [];

  // Fetch country names dynamically
  fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {
      countries = data.map(country => country.name.common).sort();
      console.log("Countries loaded:", countries.length);
    })
    .catch(err => console.error("Error loading countries:", err));

  function setupAutocomplete(inputId, suggestionBoxId) {
    const input = document.getElementById(inputId);
    const box = document.getElementById(suggestionBoxId);

    input.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      box.innerHTML = "";

      if (!value || countries.length === 0) return;

      const matches = countries.filter(country =>
        country.toLowerCase().startsWith(value)
      );

      matches.forEach(match => {
        const div = document.createElement("div");
        div.textContent = match;
        div.addEventListener("click", () => {
          input.value = match;
          box.innerHTML = "";
        });
        box.appendChild(div);
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!box.contains(e.target) && e.target !== input) {
        box.innerHTML = "";
      }
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    setupAutocomplete("from", "autocomplete-from");
    setupAutocomplete("destination", "autocomplete-destination");
  });

  function toggleDropdown() {
    const dropdown = document.getElementById("dropdown-content");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  }

  window.addEventListener("click", function (e) {
    const button = document.querySelector(".dropbtn");
    const dropdown = document.getElementById("dropdown-content");

    if (!button.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });

  function handleSearch() {
    const from = document.getElementById("from").value;
    const destination = document.getElementById("destination").value;
    const infoType = document.querySelector('input[name="info-type"]:checked');

    if (!from || !destination || !infoType) {
      alert("Please fill out all fields.");
      return;
    }

    const query = `?from=${encodeURIComponent(from)}&to=${encodeURIComponent(destination)}&type=${infoType.value}`;

    fetch(`http://127.0.0.1:5000/api/info${query}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById("result").innerText = data.message;
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Error connecting to backend.");
      });
  }
