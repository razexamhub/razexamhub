const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0-4wOgHqkyoqU5NV0cX9YCA7DXTF34RVy8VNrpMSWkx-jY8EzCOiphptQuamdLyOaCC8PfmtHWRCH/pub?output=csv";

// Load product data with PapaParse
async function fetchProducts() {
  const res = await fetch(sheetURL);
  const csv = await res.text();

  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true
  });

  const products = parsed.data;
  displayProducts(products);
}

function displayProducts(products) {
  const grid = document.getElementById("productGrid");

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";

    card.innerHTML = `
      <img src="${product.image1}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/150'">
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
