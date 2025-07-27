const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0-4wOgHqkyoqU5NV0cX9YCA7DXTF34RVy8VNrpMSWkx-jY8EzCOiphptQuamdLyOaCC8PfmtHWRCH/pub?output=csv";

async function fetchProducts() {
  const res = await fetch(sheetURL);
  const data = await res.text();

  const rows = data.trim().split('\n').slice(1); // remove header row
  const products = rows.map(row => {
    const cols = row.split(',');

    // Dynamically read up to 10 image columns (cols[4] to cols[13])
    const images = [];
    for (let i = 4; i < Math.min(cols.length, 14); i++) {
      const url = cols[i].trim();
      if (url) images.push(url);
    }

    return {
      id: cols[0]?.trim(),
      name: cols[1]?.trim(),
      price: cols[2]?.trim(),
      description: cols[3]?.trim(),
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

    const firstImage = product.images[0] || ""; // Safe fallback

    card.innerHTML = `
      <img src="${firstImage}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>₹${product.price}</p>
      <button onclick='viewProduct(${JSON.stringify(product)})'>View Details</button>
    `;

    grid.appendChild(card);
  });
}

function viewProduct(product) {
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "product.html";
}

fetchProducts();
