/* Основная продукция */
let product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get SUMM() {
            return this.price * this.amount
        },
        get KCALL() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер Fresh',
        price: 20500,
        kcall: 900,
        amount: 0,
        get SUMM() {
            return this.price * this.amount
        },
        get KCALL() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'Fresh Combo',
        price: 31900,
        kcall: 1300,
        amount: 0,
        get SUMM() {
            return this.price * this.amount
        },
        get KCALL() {
            return this.kcall * this.amount
        }
    }
}

/* Доп продукция */

let extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1000,
        kcall: 100
    },
    lettuce: {
        name: 'Салатный лист',
        price: 3000,
        kcall: 40
    },
    cheese: {
        name: 'Сыр',
        price: 5000,
        kcall: 130
    }
}

let btnPlusOrMinus = document.querySelectorAll('.main__product-btn')
    ,checkExtraProduct = document.querySelectorAll('.main__product-checkbox')
    ,addCart = document.querySelector('.addCart')
    ,receipt = document.querySelector('.receipt')
    ,receiptWindow = document.querySelector('.receipt__window')
    ,receiptOut = document.querySelector('.receipt__window-out')
    ,receiptBtn = document.querySelector('.receipt__window-btn')
    ,headerlvl = document.querySelector('.header__timer-extra')
    ,i = 0
    ,repeat;

btnPlusOrMinus.forEach(item => {
    let interval = 0;
    item.addEventListener('click', () => {
        plusOrMinus(item);
    })
    item.addEventListener('mousedown', () => {
        interval = setInterval(() => plusOrMinus(item), 100);
    })
    item.addEventListener('mouseup', () => {
        clearInterval(interval);
    })

})

function plusOrMinus(element) {
    // closest() - метод который подключаеться к ближайщему заданому родителю
    // getAttribute() - берет значение у указанного атрибута
    let parentId = element.closest('.main__product').getAttribute('id');
    let output = element.closest('.main__product').querySelector('.main__product-num');
    let sum = element.closest('.main__product').querySelector('.main__product-price span');
    let kcall = element.closest('.main__product').querySelector('.main__product-kcall span');

    if (element.dataset.symbol == '+') {
        product[parentId].amount++
    } else if (element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }

    output.innerHTML = product[parentId].amount;
    sum.innerHTML = product[parentId].SUMM;
    kcall.innerHTML = product[parentId].KCALL
}


checkExtraProduct.forEach(product => {
    product.addEventListener('click', function () {
        addExtraProduct(this);
    })
})

function addExtraProduct(el) {
    let parent = el.closest('.main__product');
    let parentId = parent.getAttribute('id');
    
    product[parentId][el.dataset.extra] = el.checked
    
    let price = parent.querySelector('.main__product-price span');
    let kcall = parent.querySelector('.main__product-kcall span');
    let elData = el.dataset.extra;
    
    if(product[parentId][elData] == true) {
        product[parentId].price +=  extraProduct[elData].price;
        product[parentId].kcall +=  extraProduct[elData].kcall;
    }else {
        product[parentId].price -=  extraProduct[elData].price;
        product[parentId].kcall -=  extraProduct[elData].kcall;
    }
    
    price.innerHTML = product[parentId].SUMM;
    kcall.innerHTML = product[parentId].KCALL;
}

let korzina = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;
    
addCart.addEventListener('click', function() {
    for(let key in product) {
       let productoObj = product[key];
       if(productoObj.amount > 0) {
           korzina.push(productoObj);
            for(let newKey in productoObj) {
                if(productoObj[newKey] === true) {
                    // '\n' - Экранирование - наше след значение начинает с новой строки
                    productoObj.name += '\n' +  extraProduct[newKey].name
                }
            }
       }
       productoObj.price = productoObj.SUMM;
       productoObj.kcall = productoObj.KCALL;
    }
    
    for(let i = 0; i < korzina.length;i++){
        let item = korzina[i];
        totalName += '\n' + item.name + '\n';
        totalPrice += item.price;
        totalKcall += item.kcall;
    }
    
    receipt.style.display = 'flex';
    setTimeout(() => receipt.style.opacity = '1', 100);
    setTimeout(() => receiptWindow.style.top = '0',200);
    
    receiptOut.innerHTML =  `Ваш заказ: \n ${totalName} \nКаллорийность ${totalKcall} \nСумма ${totalPrice}сумм`;
})



receiptBtn.addEventListener('click', () => {
    location.reload();
})

let info = document.querySelectorAll('.main__product-info');
let view = document.querySelector('.view');

info.forEach(infoObj => {
    infoObj.addEventListener('dblclick', function() {
        dbleclick(this)
    })
})

let viewClose = document.querySelector('.view__close').addEventListener('click', () => view.classList.remove('active'))


function dbleclick(el){
    let image = el.closest('.main__product').querySelector('.main__product-img').getAttribute('src')
    let img = view.closest('.view').querySelector('img');
    view.classList.add('active');
    img.setAttribute('src', image);
}

function lvl() {
    if(i < 100){
        i++;
        headerlvl.innerHTML = i;
        setTimeout(() => lvl(), repeat);
        if(headerlvl.innerHTML < 49){
            repeat = 70;
            headerlvl.style.color = 'yellow';
        }else if(headerlvl.innerHTML > 48 && headerlvl.innerHTML < 73){
            repeat = 150;            
            headerlvl.style.color = 'blue';
        }else if(headerlvl.innerHTML > 73){
            repeat = 300;
            headerlvl.style.color = 'green';
        }
    }
}
lvl()
