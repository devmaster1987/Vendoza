/* =====================================
   VENDOZA
   Settings Management System
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================
   Elements
===================================== */

  const form = document.getElementById("settingsForm");

  const storeName = document.getElementById("storeName");

  const storeEmail = document.getElementById("storeEmail");

  const storePhone = document.getElementById("storePhone");

  const currency = document.getElementById("currency");

  const storeLogo = document.getElementById("storeLogo");

  const logoutBtn = document.getElementById("adminLogout");

  /* =====================================
   Load Settings
===================================== */

  const settings = JSON.parse(localStorage.getItem("vendozaSettings")) || {};

  if (storeName) storeName.value = settings.name || "Vendoza";

  if (storeEmail) storeEmail.value = settings.email || "";

  if (storePhone) storePhone.value = settings.phone || "";

  if (currency) currency.value = settings.currency || "USD";

  if (storeLogo) storeLogo.value = settings.logo || "";

  /* =====================================
   Save Settings
===================================== */

  if (form) {
    form.addEventListener(
      "submit",

      (e) => {
        e.preventDefault();

        const newSettings = {
          name: storeName.value,

          email: storeEmail.value,

          phone: storePhone.value,

          currency: currency.value,

          logo: storeLogo.value,
        };

        localStorage.setItem(
          "vendozaSettings",

          JSON.stringify(newSettings),
        );

        alert("Settings saved successfully!");
      },
    );
  }

  /* =====================================
   Logout
===================================== */

  if (logoutBtn) {
    logoutBtn.addEventListener(
      "click",

      () => {
        localStorage.removeItem("vendozaAdmin");

        window.location.href = "admin-login.html";
      },
    );
  }
});
