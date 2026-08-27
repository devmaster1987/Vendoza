/* =====================================
   VENDOZA
   Order History System
===================================== */

let orders = JSON.parse(localStorage.getItem("vendozaOrders")) || [];

function saveOrder(order) {
  orders.push(order);

  localStorage.setItem("vendozaOrders", JSON.stringify(orders));
}

function createOrder(cartItems, total) {
  const order = {
    id: "VDZ-" + Date.now(),

    date: new Date().toLocaleDateString(),

    status: "Processing",

    items: cartItems,

    total: total,
  };

  saveOrder(order);
}

function renderOrders() {
  const container = document.getElementById("ordersContainer");

  const empty = document.getElementById("noOrders");

  if (!container) return;

  if (orders.length === 0) {
    empty.style.display = "block";

    return;
  }

  container.innerHTML = orders
    .map(
      (order) =>
        `

<div class="order-card">


<div class="order-header">


<div>

<p>
Order ID
</p>

<span class="order-id">
${order.id}
</span>


<p>
${order.date}
</p>

</div>



<span class="order-status">

${order.status}

</span>


</div>




${order.items
  .map(
    (item) =>
      `

<div class="order-product">


<img
src="${item.image}"
alt="${item.name}"
>


<div>

<h4>
${item.name}
</h4>

<p>
Qty: ${item.quantity}
</p>

<p>
$${item.price}
</p>

</div>


</div>


`,
  )
  .join("")}




<div class="order-footer">


<span>
Total
</span>


<strong class="order-total">
$${order.total}
</strong>


</div>



</div>


`,
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrders();
});
