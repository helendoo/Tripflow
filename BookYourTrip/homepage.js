document.getElementById('flightForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const origin = document.getElementById('origin').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const depart = document.getElementById('departDate').value;
    const ret = document.getElementById('returnDate').value;
  
    const formattedDepart = depart.replace(/-/g, '');
    const formattedReturn = ret ? ret.replace(/-/g, '') : '';
  
    const baseUrl = "https://www.kiwi.com/en/search/results";
    const url = `${baseUrl}/${origin}/${destination}/${formattedDepart}/${formattedReturn}?affilid=your_affiliate_id`;
  
    window.open(url, "_blank");
  });