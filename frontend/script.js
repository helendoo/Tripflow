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
  
    switch (infoType.value) {
      case 'weather':
        localStorage.setItem("selectedDestination", destination);
        window.location.href = 'Weather/Weather.html';
        break;
  
      case 'visa':
      case 'health':
      case 'safety':
      case 'essentials':
        fetch(`http://127.0.0.1:5000/api/info${query}`)
          .then(response => {
            if (!response.ok) throw new Error("Failed to fetch info.");
            return response.json();
          })
          .then(data => {
            document.getElementById("result").innerText = data.message || "No info found.";
          })
          .catch(error => {
            console.error("Error:", error);
            alert("Error connecting to backend.");
          });
        break;
  
      default:
        alert("Invalid info type selected.");
    }
  }



  /* TRAVEL INSPO */


  const cardWidth = 280;

  function setupCarouselLoop() {
    const carousel = document.getElementById("carousel");
    const cards = Array.from(carousel.children);
  
    // Clone first and last few cards
    cards.slice(0, 3).forEach(card => {
      carousel.appendChild(card.cloneNode(true));
    });
  
    cards.slice(-3).forEach(card => {
      carousel.insertBefore(card.cloneNode(true), carousel.firstChild);
    });
  
    // ✅ Restore scroll if saved
    const savedScroll = localStorage.getItem("carouselScroll");
    if (savedScroll !== null) {
      carousel.scrollLeft = parseInt(savedScroll, 10);
      localStorage.removeItem("carouselScroll");
    } else {
      // Start at the real beginning
      carousel.scrollLeft = cardWidth * 3;
    }
  }
  
  function scrollCarousel(direction) {
    const carousel = document.getElementById("carousel");
    const scrollLeft = carousel.scrollLeft;
    const totalWidth = carousel.scrollWidth;
    const visibleWidth = carousel.offsetWidth;
  
    const maxScroll = totalWidth - visibleWidth;
    const scrollAmount = cardWidth;
  
    // Handle edge cases BEFORE scroll
    if (direction > 0 && scrollLeft >= totalWidth - visibleWidth - cardWidth * 4) {
      carousel.scrollLeft = cardWidth * 3;
    } else if (direction < 0 && scrollLeft <= cardWidth * 2) {
      carousel.scrollLeft = totalWidth - visibleWidth - cardWidth * 3;
    }
  
    carousel.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  }
  
  // ✅ Save scroll position when any card is clicked
  document.getElementById("carousel").addEventListener("click", (e) => {
    const card = e.target.closest('.card-link'); // or .blog-card if you don’t use <a>
    if (card) {
      const carousel = document.getElementById("carousel");
      localStorage.setItem("carouselScroll", carousel.scrollLeft);
    }
  });
  
  document.addEventListener("DOMContentLoaded", setupCarouselLoop);
  