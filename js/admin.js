/* =====================================
   VENDOZA
   Premium Admin Dashboard
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================
   Admin Protection
===================================== */

  if (localStorage.getItem("vendozaAdmin") !== "true") {
    window.location.href = "admin-login.html";

    return;
  }

  /* =====================================
   DATA
===================================== */

  const products = JSON.parse(localStorage.getItem("vendozaProducts")) || [];

  const orders = JSON.parse(localStorage.getItem("vendozaOrders")) || [];

  const users = JSON.parse(localStorage.getItem("vendozaUsers")) || [];

  /* =====================================
   BASIC STATS
===================================== */

  const productCount = document.getElementById("productCount");

  const orderCount = document.getElementById("orderCount");

  const revenue = document.getElementById("revenue");

  const customerCount = document.getElementById("customerCount");

  if (productCount) productCount.textContent = products.length;

  if (orderCount) orderCount.textContent = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total),

    0,
  );

  if (revenue) revenue.textContent = "$" + totalRevenue.toFixed(2);

  if (customerCount) customerCount.textContent = users.length;

  /* =====================================
   SALES CHART
===================================== */

  const chartElement = document.getElementById("salesChart");

  if (chartElement && typeof Chart !== "undefined") {
    const monthlySales = [0, 0, 0, 0, 0, 0];

    orders.forEach((order) => {
      const month = new Date(order.date).getMonth();

      monthlySales[month] += Number(order.total);
    });

    new Chart(chartElement, {
      type: "line",

      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

        datasets: [
          {
            label: "Revenue",

            data: monthlySales,

            borderWidth: 3,

            tension: 0.4,
          },
        ],
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,
      },
    });
  }

  /* =====================================
   ORDER STATUS
===================================== */

  const orderStatus = document.getElementById("orderStatus");

  if (orderStatus) {
    const statusCount = {
      Pending: 0,

      Processing: 0,

      Shipped: 0,

      Delivered: 0,

      Cancelled: 0,
    };

    orders.forEach((order) => {
      if (statusCount[order.status] !== undefined) statusCount[order.status]++;
    });

    orderStatus.innerHTML = Object.entries(statusCount)

      .map(
        ([status, count]) => `


<div class="order-status-item">


<strong>

${status}

</strong>


<span class="status-${status.toLowerCase()}">

${count}

</span>


</div>


`,
      )

      .join("");
  }

  /* =====================================
   LOW STOCK
===================================== */

  const lowStock = document.getElementById("lowStock");

  if (lowStock) {
    const items = products.filter((product) => product.stock < 10);

    if (items.length === 0) {
      lowStock.innerHTML = `

<p>
All products have good stock.
</p>

`;
    } else {
      lowStock.innerHTML = items
        .map(
          (product) => `


<div class="stock-alert">


<strong>

${product.name}

</strong>


<span>

Stock: ${product.stock}

</span>


</div>


`,
        )
        .join("");
    }
  }

  /* =====================================
   RECENT ACTIVITY
===================================== */

  const activityList = document.getElementById("activityList");

  if (activityList) {
    let activity = [];

    orders.slice(-3).forEach((order) => {
      activity.push(`

New order placed ${order.id}

`);
    });

    products.slice(-3).forEach((product) => {
      activity.push(`

Product added ${product.name}

`);
    });

    activityList.innerHTML = activity
      .map(
        (item) => `


<div class="activity-item">


<div class="activity-icon">

✓

</div>


<p>

${item}

</p>


</div>


`,
      )
      .join("");
  }

  /* =====================================
   TOP PRODUCTS
===================================== */

  const topProducts = document.getElementById("topProducts");

  if (topProducts) {
    if (products.length === 0) {
      topProducts.innerHTML = "<p>No products found.</p>";
    } else {
      topProducts.innerHTML = products
        .slice(0, 5)

        .map(
          (product) => `


<div class="product-performance">


<strong>

${product.name}

</strong>


<span>

$${product.price}

</span>


</div>


`,
        )
        .join("");
    }
  }

  /* =====================================
   LOGOUT
===================================== */

  const logout = document.getElementById("adminLogout");

  if (logout) {
    logout.addEventListener("click", () => {
      localStorage.removeItem("vendozaAdmin");

      window.location.href = "admin-login.html";
    });
  }
});
