/* =====================================
   VENDOZA
   Admin Dashboard
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  let adminProducts =
    JSON.parse(localStorage.getItem("vendozaProducts")) || products;

  function saveProducts() {
    localStorage.setItem("vendozaProducts", JSON.stringify(adminProducts));
  }

  const form = document.getElementById("productForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),

      name: productName.value,

      category: productCategory.value,

      price: Number(productPrice.value),

      oldPrice: Number(productPrice.value),

      rating: 5,

      image: productImage.value,
    };

    adminProducts.push(newProduct);

    saveProducts();

    renderProducts();

    form.reset();
  });

  function renderProducts() {
    const table = document.getElementById("productTable");

    table.innerHTML = adminProducts
      .map(
        (product) =>
          `

<tr>

<td>

<img src="${product.image}">

</td>


<td>
${product.name}
</td>


<td>
$${product.price}
</td>


<td>


<button
class="delete-btn"
onclick="deleteProduct(${product.id})"
>

Delete

</button>


</td>


</tr>

`,
      )
      .join("");

    document.getElementById("productCount").textContent = adminProducts.length;
  }

  window.deleteProduct = function (id) {
    adminProducts = adminProducts.filter((item) => item.id !== id);

    saveProducts();

    renderProducts();
  };

  function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("vendozaOrders")) || [];

    const table = document.getElementById("orderTable");

    table.innerHTML = orders
      .map(
        (order) =>
          `

<tr>

<td>
${order.id}
</td>


<td>
${order.customer?.name || "Customer"}
</td>


<td>
$${order.total}
</td>


<td>
${order.status}
</td>


</tr>

`,
      )
      .join("");

    document.getElementById("orderCount").textContent = orders.length;

    document.getElementById("revenue").textContent =
      "$" + orders.reduce((sum, item) => sum + item.total, 0);
  }

  renderProducts();

  renderOrders();

  window.editProduct = function (id) {
    const product = adminProducts.find((item) => item.id === id);

    if (!product) return;

    const name = prompt("Product Name", product.name);

    const price = prompt("Product Price", product.price);

    product.name = name;

    product.price = Number(price);

    saveProducts();

    renderProducts();
  };
});
