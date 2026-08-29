/* =====================================
   VENDOZA
   Customer Management System
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  let customers = JSON.parse(localStorage.getItem("vendozaUsers")) || [];

  let orders = JSON.parse(localStorage.getItem("vendozaOrders")) || [];

  /* =====================================
   Elements
===================================== */

  const table = document.getElementById("customerTable");

  const searchInput = document.getElementById("searchCustomer");

  const totalCustomers = document.getElementById("customerTotal");

  const totalRevenue = document.getElementById("customerRevenue");

  const logoutBtn = document.getElementById("adminLogout");

  /* =====================================
   Save Customers
===================================== */

  function saveCustomers() {
    localStorage.setItem(
      "vendozaUsers",

      JSON.stringify(customers),
    );
  }

  /* =====================================
   Render Customers
===================================== */

  function renderCustomers(data = customers) {
    if (!table) return;

    if (data.length === 0) {
      table.innerHTML = `

<tr>

<td colspan="6">

<div class="empty-products">

No customers found.

</div>

</td>

</tr>

`;

      return;
    }

    table.innerHTML = data
      .map((customer) => {
        const customerOrders = orders.filter(
          (order) => order.customer?.email === customer.email,
        );

        const spent = customerOrders.reduce(
          (sum, order) => sum + Number(order.total),

          0,
        );

        return `


<tr>



<td>


<div class="customer-avatar">

${customer.name.charAt(0).toUpperCase()}

</div>


</td>





<td>


<strong>

${customer.name}

</strong>


</td>





<td>

${customer.email}

</td>





<td>

${customerOrders.length}

</td>





<td>

$${spent.toFixed(2)}

</td>





<td>


<button

class="delete-customer"

onclick="deleteCustomer('${customer.email}')"

>

Delete

</button>


</td>



</tr>


`;
      })
      .join("");
  }

  /* =====================================
   Stats
===================================== */

  function updateStats() {
    if (totalCustomers) {
      totalCustomers.textContent = customers.length;
    }

    const revenue = orders.reduce(
      (sum, order) => sum + Number(order.total),

      0,
    );

    if (totalRevenue) {
      totalRevenue.textContent = "$" + revenue.toFixed(2);
    }
  }

  /* =====================================
   Delete Customer
===================================== */

  window.deleteCustomer = function (email) {
    customers = customers.filter((customer) => customer.email !== email);

    saveCustomers();

    renderCustomers();

    updateStats();
  };

  /* =====================================
   Search
===================================== */

  if (searchInput) {
    searchInput.addEventListener(
      "input",

      () => {
        const value = searchInput.value.toLowerCase();

        const filtered = customers.filter(
          (customer) =>
            customer.name.toLowerCase().includes(value) ||
            customer.email.toLowerCase().includes(value),
        );

        renderCustomers(filtered);
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

  renderCustomers();

  updateStats();
});
