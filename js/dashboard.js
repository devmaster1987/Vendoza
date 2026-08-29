/* =====================================
   VENDOZA
   Premium User Dashboard
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("vendozaUser"));

  if (!user) {
    window.location.href = "login.html";

    return;
  }

  /* =====================================
   USER INFORMATION
===================================== */

  const userName = document.getElementById("userName");

  const userEmail = document.getElementById("userEmail");

  const profileName = document.getElementById("profileName");

  const profileEmail = document.getElementById("profileEmail");

  const avatar = document.querySelector(".user-avatar");

  if (userName) {
    userName.textContent = user.name;
  }

  if (userEmail) {
    userEmail.textContent = user.email;
  }

  if (profileName) {
    profileName.textContent = user.name;
  }

  if (profileEmail) {
    profileEmail.textContent = user.email;
  }

  if (avatar) {
    avatar.textContent = user.name.charAt(0).toUpperCase();
  }

  /* =====================================
   ORDERS DATA
===================================== */

  const orders = JSON.parse(localStorage.getItem("vendozaOrders")) || [];

  const orderCount = document.getElementById("orderCount");

  const totalSpent = document.getElementById("totalSpent");

  if (orderCount) {
    orderCount.textContent = orders.length;
  }

  const spent = orders.reduce(
    (sum, order) => sum + Number(order.total),

    0,
  );

  if (totalSpent) {
    totalSpent.textContent = "$" + spent.toFixed(2);
  }

  /* =====================================
   RECENT ORDERS
===================================== */

  const recentOrders = document.getElementById("recentOrders");

  if (!recentOrders) return;

  if (orders.length === 0) {
    recentOrders.innerHTML = `

<div class="empty-orders">

<p>
No orders yet.
</p>


<a href="index.html" class="btn">

Start Shopping

</a>

</div>

`;
  } else {
    recentOrders.innerHTML = orders

      .slice(-5)

      .reverse()

      .map(
        (order) => `


<div class="dashboard-order">


<div>


<strong>
${order.id}
</strong>


<p>
${order.date}
</p>


</div>




<div>


<span class="order-status">

${order.status}

</span>


<p>

$${Number(order.total).toFixed(2)}

</p>


</div>



</div>


`,
      )

      .join("");
  }

  /* =====================================
   LOGOUT
===================================== */

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("vendozaLoggedIn");

      localStorage.removeItem("vendozaUser");

      window.location.href = "login.html";
    });
  }
});
