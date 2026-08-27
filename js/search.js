/* =====================================
   VENDOZA
   Search System
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const results = document.getElementById("searchResults");

  const searchText = document.getElementById("searchText");

  const params = new URLSearchParams(window.location.search);

  const query = params.get("q") || "";

  if (searchText) {
    searchText.textContent = query;
  }

  function searchProducts(value) {
    const keyword = value.toLowerCase();

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
      );
    });
  }

  if (results) {
    const filtered = searchProducts(query);

    if (filtered.length === 0) {
      results.innerHTML = `
<h3>
No products found
</h3>
`;

      return;
    }

    results.innerHTML = filtered
      .map(
        (product) =>
          `

<div class="product-card">


<a href="product.html?id=${product.id}">


<img
src="${product.image}"
alt="${product.name}"
>


<h3>
${product.name}
</h3>


</a>



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
});
