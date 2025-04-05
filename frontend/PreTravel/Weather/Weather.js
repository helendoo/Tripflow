function toggleMenu() {
    const menu = document.getElementById("sidebar");
    menu.classList.toggle("open");
  }
  
  function navigateTo(type) {
    localStorage.setItem("selectedInfoType", type);
  }