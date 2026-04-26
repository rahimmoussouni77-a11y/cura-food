let cart=[];

function add(name,price){
    let item=cart.find(i=>i.name===name);

    if(item){
        item.qty++;
    }else{
        cart.push({name,price,qty:1});
    }

    render();
}

function render(){
    let box=document.getElementById("cart");
    box.innerHTML="";
    let total=0;

    cart.forEach((item,index)=>{
        total+=item.price*item.qty;

        box.innerHTML+=`
        <div class="cart-item">
            <span>${item.name} x${item.qty}</span>
            <span>${item.price*item.qty} DA</span>
        </div>`;
    });

    document.getElementById("total").innerText=total;
}

function order(){
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

function reserve(){
    let msg=`حجز طاولة:%0A${date.value} ${time.value}%0Aعدد: ${people.value}%0A${note.value}`;

    window.open("https://wa.me/213XXXXXXXXX?text="+msg,"_blank");
}
