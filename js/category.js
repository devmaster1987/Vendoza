/* =====================================
   VENDOZA
   Category Filtering
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".category-products");

  const buttons = document.querySelectorAll(".category-btn");

  function displayCategoryProducts(category) {
    let filteredProducts;

    if (category === "all") {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(
        (product) => product.category === category,
      );
    }

    container.innerHTML = filteredProducts
      .map(
        (product) =>
          `

<div class="product-card">


<img
src="${product.image}"
alt="${product.name}"
>


<h3>
${product.name}
</h3>


<p class="category">
${product.category}
</p>


<div class="rating">
${"⭐".repeat(product.rating)}
</div>


<div class="price">

<strong>
$${product.price}
</strong>

<del>
$${product.oldPrice}
</del>

</div>


<button
class="btn add-cart"
data-id="${product.id}"
>

Add To Cart

</button>


</div>


`,
      )
      .join("");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      displayCategoryProducts(button.dataset.category);
    });
  });

  displayCategoryProducts("all");
});
