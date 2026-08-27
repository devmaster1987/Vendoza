/* =====================================
   VENDOZA
   User Dashboard
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("vendozaUser"));

  if (!user) {
    window.location.href = "login.html";

    return;
  }

  document.getElementById("userName").textContent = user.name;

  document.getElementById("profileName").textContent = user.name;

  document.getElementById("profileEmail").textContent = user.email;

  const orders = JSON.parse(localStorage.getItem("vendozaOrders")) || [];

  document.getElementById("orderCount").textContent = orders.length;

  const spent = orders.reduce((sum, order) => sum + order.total, 0);

  document.getElementById("totalSpent").textContent = "$" + spent.toFixed(2);

  const recent = document.getElementById("recentOrders");

  if (orders.length === 0) {
    recent.innerHTML = `
<p>
No orders yet.
</p>
`;
  } else {
    recent.innerHTML = orders
      .slice(-3)
      .reverse()
      .map(
        (order) =>
          `

<div class="dashboard-order">

<div>

<strong>
${order.id}
</strong>

<p>
${order.date}
</p>

</div>


<span class="order-status">
${order.status}
</span>


</div>

`,
      )
      .join("");
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("vendozaLoggedIn");

    window.location.href = "login.html";
  });
});
