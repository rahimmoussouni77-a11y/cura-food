let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCartUI();
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1); // حذف العنصر من المصفوفة
    updateCartUI();
}

function updateCartUI() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    if (cart.length === 0) {
        cartItemsElement.innerHTML = "السلة فارغة حالياً";
    } else {
        cartItemsElement.innerHTML = ''; 
        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.marginBottom = "10px";
            div.innerHTML = `
                <span>${item.name} - ${item.price} DA</span>
                <button onclick="removeFromCart(${index})" style="background:red; color:white; border:none; border-radius:5px; cursor:pointer; padding:2px 8px;">حذف ❌</button>
            `;
            cartItemsElement.appendChild(div);
        });
    }
    totalPriceElement.innerText = total;
}
