async function showCartProducts() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    if (cart == []) {
        console.log("cart is empty");
        return
    }
    for (const id of Object.keys(cart)) {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`)
            const product = await res.json();
            console.log(product);
        }
        catch (error){
            console.error("error 404", id)
        }
    }
}
showCartProducts()

async function showCartProducts() {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    const container = document.getElementById('cartItems');
    const totalPriceEl = document.getElementById('totalPrice');
    let total = 0;

    if (Object.keys(cart).length === 0) {
        container.innerHTML = "<p>السلة فارغة</p>";
        totalPriceEl.textContent = "الإجمالي: $0";
        return;
    }

    container.innerHTML = "";

    for (const id in cart) {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const product = await res.json();
            const quantity = cart[id];
            const itemTotal = product.price * quantity;
            total += itemTotal;

            container.innerHTML += `
                <div>
                    <h3>${product.title}</h3>
                    <p>الكمية: ${quantity} × $${product.price} = $${itemTotal.toFixed(2)}</p>
                    <button onclick="removeItem(${id})">إزالة</button>
                    <hr>
                </div>
            `;
        } catch (err) {
            console.error("خطأ في تحميل المنتج:", id);
        }
    }

    totalPriceEl.textContent = `الإجمالي: $${total.toFixed(2)}`;
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    delete cart[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    showCartProducts();
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (Object.keys(cart).length === 0) {
        alert("السلة فارغة");
        return;
    }

    const orderId = "order_" + Date.now();
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ id: orderId, cart, createdAt: new Date().toISOString() });
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");
    alert("تم الطلب بنجاح! رقم الطلب: " + orderId);
    location.reload();
}

showCartProducts();
