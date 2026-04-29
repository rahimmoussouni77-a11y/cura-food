let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({name, price});
    total += price;
    renderCart();
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index,1);
    renderCart();
}

function renderCart() {
    let cartItems = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    cartItems.innerHTML = "";

    if(cart.length === 0){
        cartItems.innerHTML = "<li>السلة فارغة حالياً</li>";
    } else {

        cart.forEach((item,index)=>{
            cartItems.innerHTML += `
            <li>
                ${item.name} - ${item.price} DA
                <button onclick="removeFromCart(${index})">❌</button>
            </li>
            `;
        });
    }

    totalPrice.textContent = total;
}


function sendOrder(e){
    e.preventDefault();

    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;

    if(cart.length === 0){
        alert("السلة فارغة");
        return;
    }

    let msg = "طلب جديد:%0A";

    cart.forEach(item=>{
        msg += `${item.name} - ${item.price} DA%0A`;
    });

    msg += `%0Aالمجموع: ${total} DA`;
    msg += `%0Aالعنوان: ${address}`;
    msg += `%0Aالهاتف: ${phone}`;

    window.open(`https://wa.me/213XXXXXXXXX?text=${msg}`);
}


function reserveTable(e){
    e.preventDefault();

    let name = document.getElementById("name").value;
    let persons = document.getElementById("persons").value;
    let date = document.getElementById("date").value;
    let preOrder = document.getElementById("preOrder").value;

    let msg = `حجز طاولة جديد:%0Aالاسم: ${name}%0Aعدد الأشخاص: ${persons}%0Aالتاريخ: ${date}%0Aالطلب المسبق: ${preOrder}`;

    window.open(`https://wa.me/213XXXXXXXXX?text=${msg}`);
}


function rate(stars){
    document.getElementById("rate-msg").innerText =
    "شكراً لك! لقد قمت بتقييمنا بـ " + stars + " نجوم ⭐";
}
