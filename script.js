let sepetler = document.querySelectorAll(".sepete-ekle");

let urunler = [
    {
        name: 'Moza Racing R5 Set',
        tag: 'moza1',
        price: 20700,
        inCart: 0,
        id: 1
    },
    {
        name: 'Moza FSR Wheel',
        tag: 'mozafsr',
        price: 20420,
        inCart: 0
    },
    {
        name: 'Moza GS Wheel',
        tag: 'moza3',
        price: 16800,
        inCart: 0
    },
    {
        name: 'Ortombo DD1 Stand',
        tag: 'ortombo-dd1',
        price: 4300,
        inCart: 0
    },
    {
        name: 'Ortombo Phase 1 Hybrid',
        tag: 'ortombo-phase1',
        price: 16300,
        inCart: 0
    },
    {
        name: 'Ortombo Podium Formula',
        tag: 'ortombo-formula-podium',
        price: 20700,
        inCart: 0
    },
    {
        name: 'Moza R9 Base',
        tag: 'mozabase',
        price: 15000,
        inCart: 0
    },
    {
        name: 'Thrustmaster th8a vites',
        tag: 'th8ashifter',
        price: 8000,
        inCart: 0
    },
];

for (let i = 0; i < sepetler.length; i++) {
    sepetler[i].addEventListener('click' , () => {
        sepetSayisi(urunler[i]);
        toplamFiyat(urunler[i]);
    })
}

function onLoadSepetSayisi() {
    let urunSayisi = localStorage.getItem('sepetSayisi');

    if(urunSayisi) {
        document.querySelector('.sepet span').textContent = urunSayisi;
    }
}

function sepetSayisi(urun) {
    let urunSayisi = localStorage.getItem('sepetSayisi');
    urunSayisi = parseInt(urunSayisi);

    if (urunSayisi) {
        localStorage.setItem('sepetSayisi' , urunSayisi + 1);
        document.querySelector('.sepet span').textContent = urunSayisi + 1;
    } else {
        localStorage.setItem('sepetSayisi' , 1);
        document.querySelector('.sepet span').textContent = 1;
    }
    
    setItems(urun)
}

function setItems(urun) {
    let sepetUrunleri = localStorage.getItem('sepettekiUrunler');
    sepetUrunleri = JSON.parse(sepetUrunleri);

    if (sepetUrunleri != null) { 
        if(sepetUrunleri[urun.tag] == undefined){
            sepetUrunleri = {
                ...sepetUrunleri,
                [urun.tag]: urun
            }
        }
        sepetUrunleri[urun.tag].inCart += 1;
    } else {
        urun.inCart = 1;
        sepetUrunleri = {
            [urun.tag]: urun
        }
    }
    
    localStorage.setItem("sepettekiUrunler", JSON.stringify(sepetUrunleri));
}

function toplamFiyat(urun) {
    // console.log("Ürünlerin fiyatı", urun.price);
    let sepetFiyati = localStorage.getItem('toplamFiyat');
    
    console.log("Sepetimin tutarı ", sepetFiyati);
    console.log(typeof sepetFiyati);

    if(sepetFiyati != null) {
        sepetFiyati = parseInt(sepetFiyati);
        localStorage.setItem("toplamFiyat", sepetFiyati + urun.price);
        
    }else {
        localStorage.setItem("toplamFiyat", urun.price);
    }
    
}

function displayCart () {
    let cartItems = localStorage.getItem("sepettekiUrunler");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let sepetFiyati = localStorage.getItem('toplamFiyat');
    let sepetinToplami = document.querySelector(".sepetinToplami");
    let sepetYazdir = `
    Sepetin Toplamı: ${sepetFiyati} TL
    `;
    

    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <img style="width:200px; height:200px;" src="./img/${item.tag}.png">
                <span>${item.name}</span>
            </div>
            <div class="price">
                ${item.price} TL
            </div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
            ${item.inCart * item.price} TL
            </div>  
            `
            
            document.querySelector(".yazartik").innerHTML = sepetYazdir;
        });

        

    }
}

function temizle() {
    localStorage.clear();
    location.reload();
}

onLoadSepetSayisi();
displayCart();