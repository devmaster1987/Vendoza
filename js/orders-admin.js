/* =====================================
   VENDOZA
   Orders Management System
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  let orders = JSON.parse(localStorage.getItem("vendozaOrders")) || [];

  /* =====================================
   Elements
===================================== */

  const table = document.getElementById("orderTable");

  const searchInput = document.getElementById("searchOrder");

  const logoutBtn = document.getElementById("adminLogout");

  /* =====================================
   Save Orders
===================================== */

  function saveOrders() {
    localStorage.setItem(
      "vendozaOrders",

      JSON.stringify(orders),
    );
  }

  /* =====================================
   Render Orders
===================================== */

  function renderOrders(data = orders) {
    if (!table) return;

    if (data.length === 0) {
      table.innerHTML = `

<tr>

<td colspan="7">


<div class="empty-orders">

No orders found.

</div>


</td>

</tr>

`;

      return;
    }

    table.innerHTML = data
      .map((order) => {
        const customer = order.customer?.name || "Guest Customer";

        const items = order.items?.length || 0;

        const statusClass = order.status

          .toLowerCase()

          .replace(" ", "-");

        return `


<tr>



<td>


<span class="order-id">

${order.id}

</span>


</td>





<td>


<div class="customer-name">

${customer}

</div>


</td>






<td>

${items} Items

</td>





<td>

<strong>

$${Number(order.total).toFixed(2)}

</strong>

</td>





<td>

${order.date}

</td>






<td>


<select

class="order-status-select status-${statusClass}"

onchange="updateOrderStatus(${order.id},this.value)"

>


<option 
${order.status === "Pending" ? "selected" : ""}
>

Pending

</option>



<option 
${order.status === "Processing" ? "selected" : ""}
>

Processing

</option>



<option 
${order.status === "Shipped" ? "selected" : ""}
>

Shipped

</option>



<option 
${order.status === "Delivered" ? "selected" : ""}
>

Delivered

</option>



<option 
${order.status === "Cancelled" ? "selected" : ""}
>

Cancelled

</option>



</select>



</td>







<td>


<div class="order-actions">


<button

class="view-order"

onclick="viewOrder('${order.id}')"

>

View

</button>




<button

class="delete-order"

onclick="deleteOrder(${order.id})"

>

Delete

</button>



</div>



</td>




</tr>


`;
      })
      .join("");
  }

  /* =====================================
   Update Status
===================================== */

  window.updateOrderStatus = function (id, status) {
    const order = orders.find((item) => item.id == id);

    if (!order) return;

    order.status = status;

    saveOrders();

    renderOrders();
  };

  /* =====================================
   Delete Order
===================================== */

  window.deleteOrder = function (id) {
    orders = orders.filter((item) => item.id != id);

    saveOrders();

    renderOrders();
  };

  /* =====================================
   View Order
===================================== */

  window.viewOrder = function (id) {
    const order = orders.find((item) => item.id == id);

    if (!order) return;

    alert(
      `
Order ID: ${order.id}

Date: ${order.date}

Status: ${order.status}

Total: $${order.total}

`,
    );
  };

  /* =====================================
   Search
===================================== */

  if (searchInput) {
    searchInput.addEventListener(
      "input",

      () => {
        const value = searchInput.value.toLowerCase();

        const filtered = orders.filter((order) =>
          order.id.toString().toLowerCase().includes(value),
        );

        renderOrders(filtered);
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

  renderOrders();
});
