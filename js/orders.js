/* =====================================
   VENDOZA
   Premium Order History System
===================================== */

let orders = JSON.parse(localStorage.getItem("vendozaOrders")) || [];

function saveOrder(order) {
  orders.push(order);

  localStorage.setItem("vendozaOrders", JSON.stringify(orders));
}

function createOrder(cartItems, total, customer = {}) {
  const order = {
    id: "VDZ-" + Date.now(),

    date: new Date().toLocaleDateString(),

    delivery: "3-5 Business Days",

    status: "Processing",

    payment: "Cash on Delivery",

    customer: {
      name: customer.name || "Guest User",

      email: customer.email || "N/A",

      address: customer.address || "N/A",
    },

    items: cartItems,

    total: Number(total.toFixed(2)),
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
    .slice()
    .reverse()
    .map(
      (order) => `


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
Placed on:
${order.date}
</p>


<p>
Delivery:
${order.delivery || "3-5 Business Days"}
</p>


</div>



<span class="order-status">
${order.status}
</span>



</div>





<div class="order-products">


${order.items
  .map(
    (item) => `


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
Quantity: ${item.quantity}
</p>


<p>
Price: $${item.price}
</p>


</div>


</div>


`,
  )
  .join("")}


</div>





<div class="order-footer">


<div>


<p>
Payment:
<strong>
${order.payment || "Cash on Delivery"}
</strong>
</p>


<p>
Customer:
<strong>
${order.customer?.name || "Guest"}
</strong>
</p>


</div>



<strong class="order-total">

$${order.total}

</strong>



</div>





<div class="order-actions">


<button class="track-btn">

Track Order

</button>


<button class="view-btn">

View Details

</button>


</div>




</div>



`,
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrders();
});
