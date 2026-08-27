/* =====================================
   VENDOZA E-COMMERCE
   Main JavaScript
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
       Mobile Navigation
    =============================== */

  const menuButton = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".nav-links");

  if (menuButton && navbar) {
    menuButton.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
  }

  /* ===============================
       Search System
    =============================== */

  const searchInput = document.querySelector(".search-box input");
  const products = document.querySelectorAll(".product-card");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.toLowerCase();

      products.forEach((product) => {
        const text = product.textContent.toLowerCase();

        if (text.includes(searchValue)) {
          product.style.display = "";
        } else {
          product.style.display = "none";
        }
      });
    });
  }

  /* ===============================
       Newsletter
    =============================== */

  const newsletterForm = document.querySelector(".newsletter form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = newsletterForm.querySelector("input").value;

      if (email.trim() === "") {
        alert("Please enter your email.");

        return;
      }

      alert("Thank you for subscribing!");

      newsletterForm.reset();
    });
  }

  /* ===============================
       Smooth Scroll
    =============================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  /* ===============================
       Dynamic Footer Year
    =============================== */

  const year = document.querySelector(".footer-bottom");

  if (year) {
    const currentYear = new Date().getFullYear();

    year.innerHTML = `© ${currentYear} Vendoza. All rights reserved.`;
  }

  /* ===============================
   Product Search Redirect
================================ */

  const searchForm = document.getElementById("searchForm");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const searchInput = document.getElementById("searchInput");

      const value = searchInput.value.trim();

      if (value) {
        window.location.href = `search.html?q=${value}`;
      }
    });
  }
});
