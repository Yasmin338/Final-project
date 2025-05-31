function initAdminGate() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || !user.isAdmin) {
    alert("هذه الصفحة للمشرف فقط.");
    window.location.href = "../home.html";
  }
}

function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

function getTotalSales(orders) {
  let total = 0;
  for (const order of orders) {
    for (const id in order.cart) {
      const quantity = order.cart[id];
      const price = order.prices && order.prices[id] ? order.prices[id] : 20; // fallback
      total += quantity * price;
    }
  }
  return total;
}

async function displayOrders() {
  const orders = getOrders();
  const container = document.getElementById("orderList");
  container.innerHTML = "";

  for (const order of orders) {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>طلب رقم: ${order.id}</h3>
      <p>التاريخ: ${new Date(order.createdAt).toLocaleString()}</p>
      <p>عدد المنتجات: ${Object.keys(order.cart).length}</p>
      <hr />
    `;
    container.appendChild(div);
  }

  document.getElementById("orderCount").textContent = orders.length;
  document.getElementById("totalSales").textContent = `$${getTotalSales(orders).toFixed(2)}`;
}

function getProductCount() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  return products.length || 20; // fallback if using API only
}

function initDashboard() {
  initAdminGate();
  document.getElementById("productCount").textContent = getProductCount();
  displayOrders();
}

initDashboard();
