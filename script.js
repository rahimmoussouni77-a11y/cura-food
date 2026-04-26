let cart = JSON.parse(localStorage.getItem("cart")) || [];
let deleteIndex = null;

function save(){
    localStorage.setItem("cart",JSON.stringify(cart));
}

function toast(msg){
    let t=document.getElementById("toast");
    t.innerText=msg;
    t.style.display="block";
    setTimeout(()=>t.style.display="none",2000);
}

/* ➕ إضافة عنصر */
function add(name,price){
    let item=cart.find(i=>i.name===name);

    if(item){
        item.qty++;
    }else{
        cart.push({name,price,qty:1});
    }

    save();
    render();
    toast("تمت الإضافة ✅");
}

/* ➕ زيادة */
function plus(i){
    cart[i].qty++;
    save();
    render();
}

/* ➖ نقصان */
function minus(i){
    if(cart[i].qty>1){
        cart[i].qty--;
    }else{
        openModal(i);
        return;
    }
    save();
    render();
}

/* 🗑️ فتح نافذة حذف عنصر */
function openModal(i){
    deleteIndex=i;
    document.getElementById("modal").style.display="flex";
}

/* ❌ حذف عنصر */
function confirmDelete(){
    cart.splice(deleteIndex,1);
    save();
    render();
    closeModal();
    toast("تم حذف العنصر 🗑️");
}

/* ❌ إغلاق النافذة */
function closeModal(){
    document.getElementById("modal").style.display="none";
    deleteIndex=null;
}

/* ❌ إلغاء الطلب كامل */
function cancelOrder(){
    if(cart.length===0){
        toast("السلة فارغة أصلاً ❌");
        return;
    }

    if(confirm("هل تريد إلغاء كل الطلبات؟ 🧹")){
        cart = [];
        save();
        render();
        toast("تم إلغاء الطلب بالكامل ❌");
    }
}

/* 🛒 عرض السلة */
function render(){
    let box=document.getElementById("cart");
    box.innerHTML="";
    let total=0;

    if(cart.length===0){
        document.getElementById("empty").style.display="block";
    }else{
        document.getElementById("empty").style.display="none";
    }

    cart.forEach((item,i)=>{
        total+=item.price*item.qty;

        box.innerHTML+=`
        <div class="cart-item">
            <span>${item.name} (${item.qty})</span>

            <div>
                <button onclick="plus(${i})">+</button>
                <button onclick="minus(${i})">-</button>
                <button class="remove" onclick="openModal(${i})">🗑️</button>
            </div>
        </div>`;
    });

    document.getElementById("total").innerText=total;
}

/* 📦 طلب */
function order(){
    if(cart.length===0){
        toast("السلة فارغة ❌");
        return;
    }

    let msg="طلب جديد:%0A";
    let total=0;

    cart.forEach(i=>{
        msg+=`${i.name} x${i.qty}%0A`;
        total+=i.price*i.qty;
    });

    msg+=`%0Aالإجمالي: ${total}`;
    msg+=`%0Aالعنوان: ${address.value}`;
    msg+=`%0Aالهاتف: ${phone.value}`;

    window.open("https://wa.me/213XXXXXXXXX?text="+msg,"_blank");
}

/* 📅 حجز */
function reserve(){
    toast("تم إرسال الحجز 📅");

    let msg=`حجز:%0A${date.value} ${time.value}%0A${people.value} أشخاص%0A${note.value}`;

    window.open("https://wa.me/213XXXXXXXXX?text="+msg,"_blank");
}

render();
