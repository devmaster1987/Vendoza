/* =====================================
   VENDOZA E-COMMERCE
   Premium Cart System
===================================== */

let cart = JSON.parse(localStorage.getItem("vendozaCart")) || [];

/* =====================================
   Add Product To Cart
===================================== */

function addToCart(productId) {
  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    const product = products.find((item) => item.id === productId);

    if (!product) return;

    cart.push({
      ...product,

      quantity: 1,
    });
  }

  saveCart();

  updateCartCount();

  alert("Product added to cart");
}

/* =====================================
   Save Cart
===================================== */

function saveCart() {
  localStorage.setItem(
    "vendozaCart",

    JSON.stringify(cart),
  );
}

/* =====================================
   Update Cart Count
===================================== */

function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");

  if (!cartCount) return;

  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCount.textContent = total;
}

/* =====================================
   Render Cart
===================================== */

function renderCart() {
  const cartContainer = document.querySelector(".cart-items");

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `

<p>
Your cart is empty.
</p>

`;

    updateTotal();

    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (item) => `


<div class="cart-item">



<div class="cart-image">


<img

src="${item.image}"

alt="${item.name}"

>


<span class="stock-badge">

In Stock

</span>


</div>





<div class="cart-details">



<h3>

${item.name}

</h3>




<div class="rating">

★★★★★

</div>




<p class="price">

$${item.price}

</p>




<p class="delivery">

🚚 Free delivery available

</p>





<div class="quantity">



<button

onclick="changeQuantity(${item.id},-1)"

>

-

</button>




<span>

${item.quantity}

</span>




<button

onclick="changeQuantity(${item.id},1)"

>

+

</button>



</div>





<div class="cart-actions">



<button

class="save-btn"

>

♡ Save for later

</button>




<button

class="remove-btn"

onclick="removeCartItem(${item.id})"

>

Remove

</button>



</div>



</div>



</div>



`,
    )
    .join("");

  updateTotal();
}

/* =====================================
   Quantity Update
===================================== */

function changeQuantity(id, amount) {
  const product = cart.find((item) => item.id === id);

  if (!product) return;

  product.quantity += amount;

  if (product.quantity <= 0) {
    removeCartItem(id);

    return;
  }

  saveCart();

  renderCart();

  updateCartCount();
}

/* =====================================
   Remove Cart Item
===================================== */

function removeCartItem(id) {
  cart = cart.filter((item) => item.id !== id);

  saveCart();

  renderCart();

  updateCartCount();
}

/* =====================================
   Update Total
===================================== */

function updateTotal() {
  const totalElements = document.querySelectorAll(".cart-total");

  if (!totalElements.length) return;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,

    0,
  );

  totalElements.forEach((element) => {
    element.textContent = `$${total.toFixed(2)}`;
  });
}

/* =====================================
   Add Cart Buttons
===================================== */

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-cart")) {
    const id = Number(event.target.dataset.id);

    addToCart(id);
  }
});

/* =====================================
   Initialize
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  renderCart();
});
