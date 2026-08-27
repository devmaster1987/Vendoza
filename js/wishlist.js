/* =====================================
   VENDOZA
   Wishlist System
===================================== */

let wishlist = JSON.parse(localStorage.getItem("vendozaWishlist")) || [];

function saveWishlist() {
  localStorage.setItem("vendozaWishlist", JSON.stringify(wishlist));
}

function addToWishlist(id) {
  const product = products.find((item) => item.id === id);

  if (!product) return;

  const exists = wishlist.find((item) => item.id === id);

  if (!exists) {
    wishlist.push(product);

    saveWishlist();

    alert("Added to wishlist");
  }
}

function removeWishlist(id) {
  wishlist = wishlist.filter((item) => item.id !== id);

  saveWishlist();

  renderWishlist();
}

function renderWishlist() {
  const container = document.getElementById("wishlistContainer");

  const empty = document.getElementById("wishlistEmpty");

  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = "";

    empty.style.display = "block";

    return;
  }

  empty.style.display = "none";

  container.innerHTML = wishlist
    .map(
      (item) =>
        `

<div class="wishlist-card">


<img 
src="${item.image}"
alt="${item.name}"
>


<h3>
${item.name}
</h3>


<p class="wishlist-price">

$${item.price}

</p>



<div class="wishlist-actions">


<button
class="add-cart-wishlist"
onclick="addToCart(${item.id})"
>

Cart

</button>



<button
class="remove-wishlist"
onclick="removeWishlist(${item.id})"
>

Remove

</button>


</div>


</div>

`,
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderWishlist();

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("wishlist-btn")) {
      const id = Number(e.target.dataset.id);

      addToWishlist(id);
    }
  });
});
