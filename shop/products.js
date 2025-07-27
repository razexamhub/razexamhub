const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0-4wOgHqkyoqU5NV0cX9YCA7DXTF34RVy8VNrpMSWkx-jY8EzCOiphptQuamdLyOaCC8PfmtHWRCH/pub?output=csv";

async function fetchProducts() {
  const res = await fetch(sheetURL);
  const data = await res.text();

  const rows = data.trim().split('\n').slice(1); // remove header
  const products = rows.map(row => {
    const cols = row.split(',');

    // Read up to 10 image columns dynamically
    const images = [];
    for (let i = 4; i < cols.length && i < 14; i++) {
      if (cols[i] && cols[i].trim() !== "") {
        images.push(cols[i].trim());
      }
    }

    return {
      id: cols[0],
      name: cols[1],
      price: cols[2],
      description: cols[3],
      images: images
    };
  });

  displayProducts(products);
}

function displayProducts(products) {
  const grid = document.getElementById("productGrid");

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";

    const firstImage = product.images[0] || ""; // Fallback empty if no image

    card.innerHTML = `
      <img src="${firstImage}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>₹${product.price}</p>
      <button onclick="viewProduct('${encodeURIComponent(JSON.stringify(product))}')">View Details</button>
    `;

    grid.appendChild(card);
  });
}

function viewProduct(productData) {
  localStorage.setItem("selectedProduct", productData);
  window.location.href = "product.html";
}

fetchProducts();
