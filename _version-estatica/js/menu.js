const menuToggle = document.getElementById("menuToggle");
const navMobile = document.getElementById("navMobile");
menuToggle.addEventListener("click", function () {
  menuToggle.classList.toggle("active");
  navMobile.classList.toggle("active");
});
// Cerrar menú al hacer click en un enlace
navMobile.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navMobile.classList.remove("active");
  });
});
