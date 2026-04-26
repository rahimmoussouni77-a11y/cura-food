let cart = JSON.parse(localStorage.getItem("cart")) || [];

function save(){
    localStorage.setItem("cart",JSON.stringify(cart));
}

function add(name,price){
    let item = cart.find(i=>i.name===name);

    if(item){
        item.qty++;
    }else{
        cart.push({name,price,qty:1});
    }

    save();
    render();
}

function plus(i){
    cart[i].qty++;
    save();
    render();
}

function minus(i){
    cart[i].qty--;
    if(cart[i].qty<=0){
        if(confirm("حذف هذا العنصر؟")){
            cart.splice(i,1);
        }else{
            cart[i].qty = 1;
        }
    }
    save();
    render();
}

function removeItem(i){
    if(confirm("هل تريد حذف هذا العنصر نهائياً؟ 🗑️")){
        cart.splice(i,1);
        save();
        render();
    }
}

function render(){
    let box = document.getElementById("cart");
    box.innerHTML="";
    let total=0;

    cart.forEach((item,index)=>{
        total += item.price * item.qty;

        box.innerHTML += `
        <div class="cart-item">
            <span>${item.name} (${item.qty})</span>

            <div>
                <button onclick="plus(${index})">+</button>
                <button onclick="minus(${index})">-</button>
                <button class="remove" onclick="removeItem(${index})">🗑️</button>
            </div>
        </div>`;
    });

    document.getElementById("total").innerText = total;
}

function order(){
    let msg="طلب جديد:%0A";
    let total=0;

    cart.forEach(i=>{
        msg += `${i.name} x${i.qty}%0A`;
        total += i.price*i.qty;
    });

    msg += `%0Aالإجمالي: ${total}`;
    msg += `%0Aالعنوان: ${address.value}`;
    msg += `%0Aالهاتف: ${phone.value}`;

    window.open("https://wa.me/213XXXXXXXXX?text="+msg,"_blank");
}

function reserve(){
    let msg = `حجز:%0A${date.value} ${time.value}%0Aأشخاص: ${people.value}%0A${note.value}`;

    window.open("https://wa.me/213XXXXXXXXX?text="+msg,"_blank");
}

render();
