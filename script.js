let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    renderCart();
}

// ميزة الإلغاء من السلة
function removeFromCart(index) {
    total -= cart[index].price; // طرح السعر من الإجمالي
    cart.splice(index, 1);      // حذف العنصر من المصفوفة
    renderCart();               // إعادة تحديث العرض
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
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";
            li.style.padding = "10px";
            li.style.borderBottom = "1px solid #ddd";

            li.innerHTML = `
                <span>${item.name} - ${item.price} DA</span>
                <button onclick="removeFromCart(${index})" style="background:#ff4757; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">إلغاء ❌</button>
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

    let message = "طلب جديد من Cura Food:%0A";
    cart.forEach(item => {
        message += `- ${item.name} (${item.price} DA)%0A`;
    });
    message += `%0Aالمجموع: ${total} DA%0Aالعنوان: ${address}%0Aالهاتف: ${phone}`;

    // استبدل الرقم برقمك الخاص
    window.open(`https://wa.me/213XXXXXXXXX?text=${message}`, "_blank");
}
