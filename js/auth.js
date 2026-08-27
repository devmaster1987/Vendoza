/* =====================================
   VENDOZA E-COMMERCE
   Authentication System
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  const loginForm = document.getElementById("loginForm");

  /* ===============================
   Register
================================ */

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("registerName").value;

      const email = document.getElementById("registerEmail").value;

      const password = document.getElementById("registerPassword").value;

      const confirmPassword = document.getElementById("confirmPassword").value;

      const message = document.getElementById("registerMessage");

      if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";

        message.className = "auth-message error";

        return;
      }

      const user = {
        name,
        email,
        password,
      };

      localStorage.setItem("vendozaUser", JSON.stringify(user));

      message.textContent = "Account created successfully!";

      message.className = "auth-message success";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    });
  }

  /* ===============================
   Login
================================ */

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;

      const password = document.getElementById("loginPassword").value;

      const message = document.getElementById("authMessage");

      const user = JSON.parse(localStorage.getItem("vendozaUser"));

      if (user && user.email === email && user.password === password) {
        message.textContent = "Login successful!";

        message.className = "auth-message success";

        localStorage.setItem("vendozaLoggedIn", "true");

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        message.textContent = "Invalid email or password.";

        message.className = "auth-message error";
      }
    });
  }
});
