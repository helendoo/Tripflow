const cityAliases = {
  "stockholm": ["ARN", "BMA"],
  "gothenburg": ["GOT"],
  "malmo": ["MMX"],
  "paris": ["CDG", "ORY", "BVA"],
  "london": ["LHR", "LGW", "STN", "LTN", "LCY", "SEN"],
  "new york": ["JFK", "LGA", "EWR"],
  "milan": ["MXP", "LIN", "BGY"],
  "barcelona": ["BCN", "GRO", "REU"],
  "rome": ["FCO", "CIA"],
  "tokyo": ["NRT", "HND"],
  "osaka": ["KIX", "ITM"],
  "bangkok": ["BKK", "DMK"],
  "istanbul": ["IST", "SAW"],
  "dubai": ["DXB", "DWC"],
  "berlin": ["BER"],
  "amsterdam": ["AMS"],
  "vienna": ["VIE"],
  "madrid": ["MAD"],
  "los angeles": ["LAX"],
  "san francisco": ["SFO", "OAK", "SJC"],
  "washington": ["IAD", "DCA", "BWI"],
  "chicago": ["ORD", "MDW"],
  "toronto": ["YYZ", "YTZ"],
  "sydney": ["SYD"],
  "seoul": ["ICN", "GMP"],
  "oslo": ["OSL", "TRF"],
  "copenhagen": ["CPH"],
  "helsinki": ["HEL"],
  "brussels": ["BRU", "CRL"],
  "lisbon": ["LIS"]
};





document.addEventListener("DOMContentLoaded", async () => {
  const originInput = document.getElementById("origin");
  const destinationInput = document.getElementById("destination");
  const originList = document.getElementById("origin-list");
  const destinationList = document.getElementById("destination-list");

  const response = await fetch('airports.json');
  const airportList = await response.json();

  function populateDatalist(input, list, airports) {
    input.addEventListener("input", () => {
      const value = input.value.toLowerCase().trim();
  
      let matches = airports.filter((airport) =>
        airport.city?.toLowerCase().includes(value) ||
        airport.name?.toLowerCase().includes(value) ||
        airport.code?.toLowerCase().includes(value)
      );
  
      const existingCodes = new Set(matches.map(a => a.code));
  
      // Inject alias airports manually
      Object.entries(cityAliases).forEach(([aliasCity, aliasCodes]) => {
        if (aliasCity.toLowerCase().includes(value)) {
          aliasCodes.forEach(code => {
            const airport = airports.find(a => a.code === code);
            if (airport && !existingCodes.has(code)) {
              matches.unshift({ ...airport, injectedAlias: aliasCity });
              existingCodes.add(code);
            }
          });
        }
      });
  
      list.innerHTML = "";
      matches.slice(0, 10).forEach((airport) => {
        const extra = airport.injectedAlias ? ` (serving ${airport.injectedAlias})` : "";
        const option = document.createElement("option");
        option.value = `${airport.code} - ${airport.city} - ${airport.name}${extra}`;
        list.appendChild(option);
      });
    });
  }
  
  



  populateDatalist(originInput, originList, airportList);
  populateDatalist(destinationInput, destinationList, airportList);

  document.getElementById("flightForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const getCode = (val) => val.split(" - ")[0].trim().toUpperCase();

    const origin = getCode(originInput.value);
    const destination = getCode(destinationInput.value);
    const depart = document.getElementById("departDate").value;
    const ret = document.getElementById("returnDate").value;
    const passengers = document.getElementById("passengers").value || 1;

    if (!origin || !destination || !depart) {
      alert("Please fill in all required fields.");
      return;
    }

    const formattedDepart = depart.replace(/-/g, "");
    const formattedReturn = ret ? ret.replace(/-/g, "") : "";

    const url = `https://www.kiwi.com/en/search/results/${origin}/${destination}/${formattedDepart}/${formattedReturn}?adults=${passengers}&affilid=your_affiliate_id`;

    window.open(url, "_blank");
  });
});