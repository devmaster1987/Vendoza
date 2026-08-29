/* =====================================
   VENDOZA
   Products Management System
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  let products = JSON.parse(localStorage.getItem("vendozaProducts")) || [];

  /* =====================================
   Elements
===================================== */

  const form = document.getElementById("productForm");

  const table = document.getElementById("productTable");

  const searchInput = document.getElementById("searchProduct");

  const logoutBtn = document.getElementById("adminLogout");

  /* =====================================
   Save Products
===================================== */

  function saveProducts() {
    localStorage.setItem(
      "vendozaProducts",

      JSON.stringify(products),
    );
  }

  /* =====================================
   Render Products
===================================== */

  function renderProducts(data = products) {
    if (!table) return;

    if (data.length === 0) {
      table.innerHTML = `

<tr>

<td colspan="6">

<div class="empty-products">

No products found.

</div>

</td>

</tr>

`;

      return;
    }

    table.innerHTML = data
      .map((product) => {
        let stockClass =
          product.stock <= 0
            ? "stock-out"
            : product.stock < 10
              ? "stock-low"
              : "stock-in";

        let stockText =
          product.stock <= 0
            ? "Out of Stock"
            : product.stock < 10
              ? "Low Stock"
              : "In Stock";

        return `


<tr>


<td>

<img 
src="${product.image}"
alt="${product.name}"
>

</td>




<td>

<strong>

${product.name}

</strong>

</td>





<td>

${product.category}

</td>





<td>

$${product.price}

</td>





<td>


<span class="stock-badge ${stockClass}">

${stockText}

(${product.stock})

</span>


</td>





<td>


<div class="product-actions">


<button

class="edit-product"

onclick="editProduct(${product.id})"

>

Edit

</button>



<button

class="delete-product"

onclick="deleteProduct(${product.id})"

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
   Add Product
===================================== */

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),

      name: document.getElementById("productName").value,

      price: Number(document.getElementById("productPrice").value),

      category: document.getElementById("productCategory").value,

      image: document.getElementById("productImage").value,

      stock: Number(document.getElementById("productStock").value),

      rating: 5,

      oldPrice: Number(document.getElementById("productPrice").value),
    };

    products.push(newProduct);

    saveProducts();

    renderProducts();

    form.reset();
  });

  /* =====================================
   Delete Product
===================================== */

  window.deleteProduct = function (id) {
    products = products.filter((product) => product.id !== id);

    saveProducts();

    renderProducts();
  };

  /* =====================================
   Edit Product
===================================== */

  window.editProduct = function (id) {
    const product = products.find((item) => item.id === id);

    if (!product) return;

    const name = prompt("Product Name", product.name);

    const price = prompt("Product Price", product.price);

    const stock = prompt("Product Stock", product.stock);

    if (name) {
      product.name = name;
    }

    if (price) {
      product.price = Number(price);
    }

    if (stock) {
      product.stock = Number(stock);
    }

    saveProducts();

    renderProducts();
  };

  /* =====================================
   Search
===================================== */

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();

      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value),
      );

      renderProducts(filtered);
    });
  }

  /* =====================================
   Logout
===================================== */

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("vendozaAdmin");

      window.location.href = "admin-login.html";
    });
  }

  renderProducts();
});
