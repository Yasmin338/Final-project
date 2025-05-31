async function getDetails() {
    const productId = localStorage.getItem("productId")
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`)
    const product = await res.json();
    console.log(product);
    
}
getDetails()
async function getDetails() {
    const productId = localStorage.getItem("productId");

    if (!productId) {
        document.getElementById("productDetails").innerHTML = "<p>لا يوجد منتج</p>";
        return;
    }

    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await res.json();

    document.getElementById("productDetails").innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" alt="${product.title}" width="200">
        <p>${product.description}</p>
        <p><strong>السعر:</strong> $${product.price}</p>
        <button onclick="addToCart(${product.id})">إضافة إلى السلة</button>
    `;
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[id]) {
        cart[id] += 1;
    } else {
        cart[id] = 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("تمت إضافة المنتج إلى السلة");
}

getDetails();
