let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    renderCart();
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<li>السلة فارغة حالياً</li>";
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement("li");

            li.innerHTML = `
                ${item.name} - ${item.price} DA
                <button onclick="removeFromCart(${index})" style="background:red;color:white;border:none;padding:5px 10px;cursor:pointer;">
                    حذف ❌
                </button>
            `;

            cartItems.appendChild(li);
        });
    }

    totalPrice.textContent = total;
}

function sendOrder(event) {
    event.preventDefault();

    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    if (cart.length === 0) {
        alert("السلة فارغة!");
        return;
    }

    let message = "طلب جديد:%0A";

    cart.forEach(item => {
        message += `- ${item.name} (${item.price} DA)%0A`;
    });

    message += `المجموع: ${total} DA%0A`;
    message += `العنوان: ${address}%0A`;
    message += `الهاتف: ${phone}`;

    window.open(`https://wa.me/213XXXXXXXXX?text=${message}`, "_blank");
}
