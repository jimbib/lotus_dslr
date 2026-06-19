const navbar = document.getElementById("navbar");
const logo = document.getElementById("logo-img");

const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

const reveals = document.querySelectorAll(".reveal");

let lastScroll = 0;
const hideThreshold = 500;

/* =========================
   SCROLL HANDLER (ZENTRAL)
========================= */

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const windowHeight = window.innerHeight;
  const pageHeight = document.body.scrollHeight;

  /* ---------- NAVBAR STYLE + LOGO ---------- */
  const sidebarOpen = navbar.classList.contains("sidebar-open");

  if (!sidebarOpen) {
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
      logo.src = "./photos/lotus-logo-yellow.svg";
    } else {
      navbar.classList.remove("scrolled");
      logo.src = "./photos/lotus-logo-white.svg";
    }
  }

  /* ---------- NAVBAR HIDE / SHOW ---------- */
  const isScrollingDown = currentScroll > lastScroll;
  const isAtTop = currentScroll <= 0;

  if (isAtTop) {
    navbar.classList.remove("hide");
  } 
  else if (isScrollingDown && currentScroll > hideThreshold) {
    navbar.classList.add("hide");
  } 
  else {
    navbar.classList.remove("hide");
  }

  /* ---------- BOTTOM OF PAGE ---------- */
  if (currentScroll + windowHeight >= pageHeight - 10) {
    navbar.classList.remove("hide");
  }

  lastScroll = currentScroll;

  /* ---------- REVEAL ---------- */
  revealElements();
});


/* =========================
   REVEAL ANIMATION
========================= */

function revealElements() {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add("active");
    }
  });
}

revealElements();


/* =========================
   BURGER / SIDEBAR TOGGLE
========================= */

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navLinks.classList.toggle("active");
  navbar.classList.toggle("sidebar-open");

  /* LOGO SWITCH */
  if (navbar.classList.contains("sidebar-open")) {
    logo.src = "./photos/lotus-logo-black.svg";
  } else {
    if (window.scrollY > 50) {
      logo.src = "./photos/lotus-logo-yellow.svg";
    } else {
      logo.src = "./photos/lotus-logo-white.svg";
    }
  }
});


/* =========================
   CLOSE MENU ON LINK CLICK
========================= */

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    navLinks.classList.remove("active");
    navbar.classList.remove("sidebar-open");

    /* LOGO RESET */
    if (window.scrollY > 50) {
      logo.src = "./photos/lotus-logo-yellow.svg";
    } else {
      logo.src = "./photos/lotus-logo-white.svg";
    }
  });
});