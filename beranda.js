const menu = document.getElementById("mobileMenu");
const overlay = document.getElementById("menuOverlay");
const hamburger = document.querySelector(".hamburger");

function toggleMenu(){
  const isOpen = menu.classList.toggle("active");
  overlay.classList.toggle("active", isOpen);
  hamburger.classList.toggle("active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

function closeMenu(){
  document.getElementById("mobileMenu").classList.remove("active");
  document.getElementById("menuOverlay").classList.remove("active");
  document.querySelector(".hamburger").classList.remove("active");
  document.body.classList.remove("menu-open");
}



  function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");

  }
/* =========================
   SWIPE TO CLOSE (MOBILE)
========================= */
let startX = 0;

menu.addEventListener("touchstart", e=>{
  startX = e.touches[0].clientX;
});

menu.addEventListener("touchmove", e=>{
  const diff = e.touches[0].clientX - startX;
  if(diff > 80){
    closeMenu();
  }
});
