let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    showNotification(`${name} أضيف للملك! 🥗`);
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
    const countBadge = document.getElementById("items-count");

    cartItems.innerHTML = "";
    countBadge.innerText = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = "<div style='text-align:center; padding:20px;'>سلتك الملكية فارغة.. اطلب الآن ✨</div>";
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span><i class="fas fa-check-circle" style="color:var(--gold)"></i> ${item.name}</span>
                <div style="display:flex; align-items:center; gap:15px;">
                    <span style="color:var(--accent)">${item.price} DA</span>
                    <button onclick="removeFromCart(${index})" class="delete-btn" 
                            style="background:none; border:none; color:#ff4757; cursor:pointer; font-size:1.2rem;">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            cartItems.appendChild(li);
        });
    }
    totalPrice.innerText = total;
}

function showNotification(msg) {
    const area = document.getElementById("notification-area");
    const note = document.createElement("div");
    note.style = `background:var(--gold); color:black; padding:15px 25px; border-radius:10px; margin-top:10px; 
                  font-weight:bold; box-shadow:0 5px 15px rgba(0,0,0,0.3); animation:slideIn 0.4s forwards;`;
    note.innerText = msg;
    area.appendChild(note);
    setTimeout(() => note.remove(), 3000);
}

function sendOrder(event) {
    event.preventDefault();
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    if (cart.length === 0) return alert("سلتك فارغة!");

    let message = "🔱 *طلب جديد من Cura Food* 🔱%0A%0A";
    cart.forEach((item, i) => message += `*${i+1}.* ${item.name} - ${item.price} DA%0A`);
    message += `%0A💰 *المجموع:* ${total} DA`;
    message += `%0A📍 *العنوان:* ${address}`;
    message += `%0A📞 *الهاتف:* ${phone}%0A%0A✨ شكراً لاختياركم الأفضل ✨`;

    window.open(`https://wa.me/213XXXXXXXXX?text=${message}`, "_blank");
}
