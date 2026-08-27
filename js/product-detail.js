/* =====================================
   VENDOZA
   Product Detail System
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productDetail");

  if (!container) return;

  const params = new URLSearchParams(window.location.search);

  const id = Number(params.get("id"));

  const product = products.find((item) => item.id === id);

  if (!product) {
    container.innerHTML = `
<h2>
Product not found
</h2>
`;

    return;
  }

  let quantity = 1;

  container.innerHTML = `

<div class="product-image-box">

<img
src="${product.image}"
alt="${product.name}"
>

</div>



<div class="product-info">


<h1>
${product.name}
</h1>



<p class="product-category">

Category:
${product.category}

</p>



<div class="product-rating">

${"⭐".repeat(product.rating)}

</div>



<div class="product-price">

<strong>
$${product.price}
</strong>


<del>
$${product.oldPrice}
</del>

</div>



<p class="product-description">

This is a premium quality ${product.name}.
Shop this product from Vendoza marketplace.

</p>




<div class="quantity-box">


<button id="minus">
-
</button>


<span id="quantity">
1
</span>


<button id="plus">
+
</button>


</div>




<div class="product-actions">


<button 
class="btn"
id="addCart"
>

Add To Cart

</button>


<button 
class="btn wishlist-action"
id="addWishlist"
>

♡ Wishlist

</button>


</div>




<div class="product-meta">

<p>
🚚 Free Delivery
</p>

<p>
✅ Secure Payment
</p>

<p>
↩ Easy Returns
</p>

</div>



</div>

`;

  const quantityText = document.getElementById("quantity");

  document.getElementById("plus").addEventListener("click", () => {
    quantity++;

    quantityText.textContent = quantity;
  });

  document.getElementById("minus").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;

      quantityText.textContent = quantity;
    }
  });

  document.getElementById("addCart").addEventListener("click", () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
  });

  document.getElementById("addWishlist").addEventListener("click", () => {
    addToWishlist(product.id);
  });
});
