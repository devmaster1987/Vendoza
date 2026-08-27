/* =====================================
   VENDOZA E-COMMERCE
   Cart System
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
  localStorage.setItem("vendozaCart", JSON.stringify(cart));
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
      (item) =>
        `
        <div class="cart-item">

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div>

                <h3>
                    ${item.name}
                </h3>


                <p>
                    $${item.price}
                </p>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        -
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>


                <button
                    onclick="removeCartItem(${item.id})"
                >
                    Remove
                </button>


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
   Remove Item
===================================== */

function removeCartItem(id) {
  cart = cart.filter((item) => item.id !== id);

  saveCart();

  renderCart();

  updateCartCount();
}

/* =====================================
   Cart Total
===================================== */

function updateTotal() {
  const totalElement = document.querySelector(".cart-total");

  if (!totalElement) return;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  totalElement.textContent = `$${total.toFixed(2)}`;
}

/* =====================================
   Product Buttons
===================================== */

document.addEventListener("click", function (event) {
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
