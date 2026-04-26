let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateUI();
}

function updateUI() {
    const cartList = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-price');

    if (cart.length === 0) {
        cartList.innerHTML = "السلة فارغة حالياً";
    } else {
        cartList.innerHTML = cart.map(item => `<div>✅ ${item.name} - ${item.price} DA</div>`).join('');
    }
    totalDisplay.innerText = total;
}

function sendOrder(event) {
    event.preventDefault();
    if (cart.length === 0) {
        alert("السلة فارغة!");
        return;
    }

    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    let message = `*طلب جديد من Cura Food* 🥗%0A%0A`;
    cart.forEach(item => message += `• ${item.name} (${item.price} DA)%0A`);
    message += `%0A*المجموع:* ${total} DA%0A*العنوان:* ${address}%0A*الهاتف:* ${phone}`;

    const myNumber = "213XXXXXXXXX"; // ضع رقمك هنا
    window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');
}