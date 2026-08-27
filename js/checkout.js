/* =====================================
   VENDOZA
   Checkout System
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const checkoutForm = document.getElementById("checkoutForm");

  if (!checkoutForm) return;

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem("vendozaCart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty!");

      return;
    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = {
      id: "VDZ-" + Date.now(),

      date: new Date().toLocaleDateString(),

      status: "Processing",

      customer: {
        name: document.querySelector('input[placeholder="Enter your name"]')
          .value,

        email: document.querySelector('input[type="email"]').value,

        phone: document.querySelector('input[type="tel"]').value,

        address: document.querySelector("textarea").value,
      },

      items: cart,

      total: Number(total.toFixed(2)),
    };

    const orders = JSON.parse(localStorage.getItem("vendozaOrders")) || [];

    orders.push(order);

    localStorage.setItem("vendozaOrders", JSON.stringify(orders));

    // Clear cart

    localStorage.removeItem("vendozaCart");

    alert("Order placed successfully!");

    window.location.href = "orders.html";
  });
});
