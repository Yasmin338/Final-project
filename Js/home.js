// get all data
async function getAllProducts() {
    let data = await fetch('https://fakestoreapi.com/products')
    let products = await data.json()
    // console.log(products);
    
    display(products)
}
// display
function display(products) {
let temp = ""
products.forEach(element => {
    temp +=`
    <div id="${element.id}" class="product-card" onclick="getDeatils(${element.id})">
    <img src="${element.image}" alt="${element.title}" >
    <h2> ${element.title} </h2>
    <span>$${element.price}</span> <i class="fa-solid fa-cart-shopping" onclick="addToCart(${element.id})"></i>
    </div>
    `
});
document.getElementById('allProducts').innerHTML = temp
}

getAllProducts()

// get details
function getDeatils(id){
// localStorage.setItem('productId',id)
// window.location.href = "productDeatils.html"
}

// add to cart
function addToCart(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || {}
    if(cart[id]){
        cart[id] +=1
     }
     else{
        cart[id]=1
     }
    localStorage.setItem("cart",JSON.stringify(cart))
}
// get all data
async function getAllProducts() {
    let data = await fetch('https://fakestoreapi.com/products');
    let products = await data.json();
    display(products);
}

// display
function display(products) {
    let temp = "";
    products.forEach(element => {
        temp += `
            <div id="${element.id}" class="product-card" onclick="getDetails(${element.id})">
                <img src="${element.image}" alt="${element.title}">
                <h2>${element.title}</h2>
                <span>$${element.price}</span>
                <i class="fa-solid fa-cart-shopping" onclick="addToCart(${element.id}); event.stopPropagation();"></i>
            </div>
        `;
    });
    document.getElementById('allProducts').innerHTML = temp;
}

getAllProducts();

// get details
function getDetails(id) {
    localStorage.setItem('productId', id);
    window.location.href = "details.html";
}

// add to cart
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
