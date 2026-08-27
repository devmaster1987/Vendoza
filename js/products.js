/* =====================================
   VENDOZA E-COMMERCE
   Product Data & Rendering
===================================== */

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 49.99,
        oldPrice: 79.99,
        rating: 5,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
    },

    {
        id: 2,
        name: "Smart Watch Pro",
        category: "Electronics",
        price: 89.99,
        oldPrice: 120,
        rating: 4,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
    },

    {
        id: 3,
        name: "Premium Sneakers",
        category: "Fashion",
        price: 59.99,
        oldPrice: 90,
        rating: 5,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },

    {
        id: 4,
        name: "Leather Backpack",
        category: "Fashion",
        price: 39.99,
        oldPrice: 65,
        rating: 4,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
    },

    {
        id: 5,
        name: "Smartphone X1",
        category: "Electronics",
        price: 399.99,
        oldPrice: 499.99,
        rating: 5,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
    },

    {
        id: 6,
        name: "Beauty Care Kit",
        category: "Beauty",
        price: 29.99,
        oldPrice: 45,
        rating: 4,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600"
    },

    {
        id: 7,
        name: "Home Decoration Lamp",
        category: "Home",
        price: 24.99,
        oldPrice: 40,
        rating: 5,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600"
    },

    {
        id: 8,
        name: "Coffee Maker",
        category: "Home",
        price: 79.99,
        oldPrice: 110,
        rating: 4,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600"
    }

];

/* =====================================
   Render Products
===================================== */

function displayProducts() {
  const productGrids = document.querySelectorAll(".product-grid");

  if (!productGrids.length) return;

  const productHTML = products
    .map((product) => {
      return `

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

            `;
    })
    .join("");

  productGrids.forEach((grid) => {
    grid.innerHTML = productHTML;
  });
}

/* =====================================
   Initialize
===================================== */

document.addEventListener("DOMContentLoaded", displayProducts);
