/* =====================================
   VENDOZA
   Admin Authentication
===================================== */

const ADMIN = {
  email: "admin@vendoza.com",

  password: "admin123",
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adminLoginForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("adminEmail").value;

      const password = document.getElementById("adminPassword").value;

      const message = document.getElementById("adminMessage");

      if (email === ADMIN.email && password === ADMIN.password) {
        localStorage.setItem("vendozaAdmin", "true");

        window.location.href = "admin.html";
      } else {
        message.textContent = "Invalid admin credentials.";
      }
    });
  }
});
