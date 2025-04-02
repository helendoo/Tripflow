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
