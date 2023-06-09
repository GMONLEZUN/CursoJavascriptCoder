
// ME TRAIGO LOS PRODUCTOS DEL JSON
let products = [];

const retrieveProdData = async ()=>{
    const resp = await fetch("./data.json");
    const data = await resp.json();
    products = data;
    showProducts()
}

retrieveProdData()

// INICIALIZO EL CARRITO
let cart = [];
let cartAux = [];
const principal = document.querySelector('.principal');
const sectCart = document.querySelector('.cart');

let cartDeleteButtons;


// MOSTRAR LOS PRODUCTOS EN EL HOME   -----------------------------------------------------------------------------------------------------

function showProducts(prods = products){
    principal.innerHTML = "";

    const prodCounter = document.createElement('div');
    prodCounter.innerHTML = `<span class="prodCounterValue">${prods.length}</span> productos`
    prodCounter.classList.add('prodCounter');
    principal.append(prodCounter);

    prods.map((product,index) =>{
        
        const containerProd = document.createElement('DIV');
        containerProd.setAttribute('data-prodIndex',product.code);

        const imgContainer = document.createElement('DIV');
        imgContainer.classList.add('imgContainer')
        const titleProd = document.createElement('H3');
        const priceProd = document.createElement("H2");
        const btnAddContainer = document.createElement('DIV');
        const btnAdd = document.createElement("BUTTON");
        const containerProdCartInfo = document.createElement('DIV');
        const btnPlus = document.createElement("BUTTON");
        const btnMinus = document.createElement("BUTTON");
        const prodQty = document.createElement("span");


        titleProd.innerText = product.nameProd;
        priceProd.innerText = `$${priceDot(product.price)}`;
        btnAdd.innerText = "Agregar al carrito";

        containerProd.classList.add('containerProd');
        titleProd.classList.add('titleProd');
        priceProd.classList.add('priceProd');
        btnAdd.classList.add('btnAdd');
        btnAddContainer.classList.add('btnAddContainer');
        containerProdCartInfo.classList.add('containerProdCartInfo');
        btnPlus.classList.add('btnPlus');
        btnPlus.innerHTML = `<i class="fa-solid fa-plus"></i>`;
        btnMinus.classList.add('btnMinus');
        btnMinus.innerHTML = `<i class="fa-solid fa-minus"></i>`;
        prodQty.classList.add('prodQty');
       
        
        btnAdd.setAttribute('data-prodIndex',product.code);
        btnMinus.setAttribute('data-prodIndex',product.code);
        btnPlus.setAttribute('data-prodIndex',product.code);
        containerProdCartInfo.setAttribute('data-prodIndex',product.code);
        
        // MUESTRA LAS FOTOS DE LOS PRODUCTOS SI TIENE MÁS DE UNA

        if(product.image.length > 1){
            
            const dotContainer = document.createElement('div');
            dotContainer.classList.add('dotContainer');
            dotContainer.setAttribute('data-prodIndex',product.code);

            product.image.forEach((image,index) => {
                const imageProd = document.createElement('IMG');
                imageProd.src = image;
                if (index == 0) {
                    imageProd.classList.add('active')
                }
                const dot = document.createElement('div');
                dot.classList.add('dotImg');
                dot.dataset.numImg = index;
                imgContainer.append(imageProd);
                dotContainer.append(dot);
            });

            dotContainer.firstChild.classList.add('active');
            imgContainer.append(dotContainer);

        } else {
            const imageProd = document.createElement('IMG');
                imageProd.src = product.image;
                imageProd.classList.add('active');
                imgContainer.append(imageProd);
        }

        containerProd.append(imgContainer)
        containerProd.append(titleProd);
        containerProd.append(priceProd);
        btnAddContainer.append(btnAdd);
        containerProdCartInfo.append(btnMinus);
        containerProdCartInfo.append(prodQty);
        containerProdCartInfo.append(btnPlus);
        btnAddContainer.append(containerProdCartInfo);
        containerProd.append(btnAddContainer);

        principal.append(containerProd);

    })

    const addButtons = document.querySelectorAll('.btnAdd');

    addButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            addToCart(e);
        })
    });


    imgSwitch();

    const btnMinusAll = document.querySelectorAll('.btnMinus');
    btnMinusAll.forEach(btn => {
        btn.addEventListener('click', e => {
            reduceCartProd(e);
        })
    })
    
    const btnPlusAll = document.querySelectorAll('.btnPlus');
    btnPlusAll.forEach(btn => {
        btn.addEventListener('click', e => {
            incrementCartProd(e);
        })
    })

    updateCartAddBtn();

}


const cartIcon = document.querySelector('.fa-cart-shopping');
const cartContProds = document.querySelector('.cartContProds');

// ACTUALIZAR CARRITO     -----------------------------------------------------------------------------------------------------

function updateCart(){
    cartContProds.innerHTML = ""
    
    const containerTitleCart = document.createElement('div');
    const titleCart = document.createElement('h3');
    const closeBtnCart = document.createElement('BUTTON');
    const titleCartSep = document.createElement('HR')

    titleCart.innerText = "Tu carrito";
    closeBtnCart.innerHTML = `<i class="fa-solid fa-xmark"></i>`

    containerTitleCart.classList.add("containerTitleCart")
    titleCart.classList.add("titleCart")
    closeBtnCart.classList.add("closeBtnCart")
    titleCartSep.classList.add('titleCartSep')

    containerTitleCart.append(titleCart)
    containerTitleCart.append(closeBtnCart)
    
    cartContProds.append(containerTitleCart)
    cartContProds.append(titleCartSep)


    cart.map((product, index) => {

        const cartProd = document.createElement('DIV');
        cartProd.classList.add('cartProd');
        
        const cartProdImg = document.createElement('img');
        cartProdImg.classList.add('cartProdImg');
        
        const cartProdTitle = document.createElement('P');
        cartProdTitle.classList.add('cartProd-title');
        
        const btnMinusCart = document.createElement("BUTTON");
        btnMinusCart.classList.add('btnMinusCart');
        btnMinusCart.setAttribute("data-cartProdIndex",index)
        btnMinusCart.innerHTML = `<i class="fa-solid fa-minus"></i>`;
        
        const cartProdQty = document.createElement('P');
        cartProdQty.classList.add('cartProd-qty');
        
        const btnPlusCart = document.createElement("BUTTON");
        btnPlusCart.classList.add('btnPlusCart');
        btnPlusCart.setAttribute("data-cartProdIndex",index)
        btnPlusCart.innerHTML = `<i class="fa-solid fa-plus"></i>`;

        const containerQtyCart = document.createElement("DIV");
        containerQtyCart.classList.add('containerQtyCart')

        containerQtyCart.append(btnMinusCart)
        containerQtyCart.append(cartProdQty)
        containerQtyCart.append(btnPlusCart)

        const cartProdPrice = document.createElement('P');
        cartProdPrice.classList.add('cartProd-price');
        
        const cartProdBtnDelete = document.createElement('BUTTON');
        cartProdBtnDelete.classList.add('deleteBtn');
        cartProdBtnDelete.innerHTML = `<i class="fa-solid fa-trash-can" data-cartProdIndex="${index}"></i>`

        cartProdImg.src = product.image[0]
        cartProdTitle.innerText = product.nameProd;
        cartProdQty.innerText = `${product.qty} u.`;
        cartProdPrice.innerText = `$${priceDot(product.price*product.qty)}`;
        
        cartProd.append(cartProdImg);
        cartProd.append(cartProdTitle);
        cartProd.append(containerQtyCart);
        cartProd.append(cartProdPrice);
        cartProd.append(cartProdBtnDelete);

        cartContProds.append(cartProd)
    }) 

    const totalSep = document.createElement('HR');
    totalSep.classList.add('totalSep');

    const cartTotal = document.createElement('DIV');
    cartTotal.classList.add('cartTotal');

    let totalValue = priceDot(cart.reduce((acc, product) => acc + product.price*product.qty,0)) 

    cartTotal.innerHTML = `<span class="total">Total</span><span class="totalValue">$${totalValue}</span>`

    const btnCartPay = document.createElement('BUTTON');
    btnCartPay.classList.add('cartPay');
    btnCartPay.innerHTML = `Ir a pagar`;

    
    const btnCartEmpty = document.createElement('BUTTON');
    btnCartEmpty.classList.add('btnCartEmpty');
    btnCartEmpty.innerHTML = `<i class="fa-solid fa-trash-can"></i> Vaciar carrito`;

    cartContProds.append(totalSep);
    cartContProds.append(cartTotal);
    cartContProds.append(btnCartPay);
    cartContProds.append(btnCartEmpty);
    
    btnCartEmpty.addEventListener('click', () => emptyCart());
    btnCartPay.addEventListener('click', () => {
        toggleModal();
        showPayment();
    })
    
    const cartDeleteButtons = document.querySelectorAll('.deleteBtn');

    cartDeleteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            deleteProdCart(e)
        })
    });

    const btnsMinusCart = document.querySelectorAll('.btnMinusCart')
    const btnsPlusCart = document.querySelectorAll('.btnPlusCart')

    btnsMinusCart.forEach(btn => {
        btn.addEventListener('click', (e) => {
            reduceCartProd(e)
        })
    });

    btnsPlusCart.forEach(btn => {
        btn.addEventListener('click', (e) => {
            incrementCartProd(e)
        })
    });

    // Icono del carrito con el contador de productos

    cart.length >= 1 ? cartIcon.classList.add('active') : cartIcon.classList.remove('active');

    let totalQtyAttr = cart.reduce((acc, prod) => prod.qty + acc,0)
    cartIcon.setAttribute('data-after', totalQtyAttr)

    if(cart.length == 0){
        totalSep.style.display = "none";
        cartTotal.style.display = "none";
        btnCartPay.style.display = "none";
        btnCartEmpty.style.display = "none"
        const emptyContainer = document.createElement("DIV");
        emptyContainer.classList.add('emptyContainer');
        emptyContainer.innerHTML = `<i class="fa-solid fa-cart-shopping"></i><span class="msgEmpty">Tu carrito está vacío</span>`
        cartContProds.append(emptyContainer)
    }
    closeBtnCart.addEventListener('click', () => {
        toggleModal()
    })

    // GUARDO LOS CAMBIOS EN EL LOCALSTORAGE
    cartJSON = JSON.stringify(cart);
    localStorage.setItem("cartStored", cartJSON);

    updateCartAddBtn();
}

// VACIAR CARRITO           -----------------------------------------------------------------------------------------------------

function emptyCart(){
    cart = [];
    localStorage.removeItem('cartStored')
    updateCart()
}

// BORRAR PRODUCTO DEL CARRITO-----------------------------------------------------------------------------------------------------

function deleteProdCart(e){
    cart.splice(e.target.getAttribute('data-cartProdIndex'),1)
    updateCart()
}

// MODAL CART EVENTOS        -----------------------------------------------------------------------------------------------------

const btnCart = document.querySelector('.cart-container');
const modalCart = document.querySelector('.modal-cart')
const cartSector = document.querySelector('.cart');
const header = document.querySelector('.header');
const searchSection = document.querySelector('.search')

function toggleModal(){
    modalCart.classList.toggle('active');
    updateCart();
}

btnCart.addEventListener('click',()=>{
    toggleModal();
})

modalCart.addEventListener('click', (e) => {
    modalCart.classList.toggle('active');
    e.stopImmediatePropagation();
    updateCart();
})

cartSector.addEventListener('click', (e)=>{
    e.stopImmediatePropagation();
    if (modalCart.classList.contains('active')) {
        cartSector.style.display = "block";
    }
})

// FUNCIÓN PARA MOSTRAR VALOR EN MILES -----------------------------------------------------------------------------------------------------

function priceDot(price){
    price = price.toString().split("");
    let decimals = []
    let existsDecimals = false;
    if (price.indexOf(".") !== -1) {
        existsDecimals = true;
        decimals = price.splice(price.indexOf("."),3);
        decimals.splice(decimals.indexOf("."),1,",")
    }
    let i = price.length -1
    while(i-3>=0){
        i -= 3;
        price.splice(i+1,0,".")
    }
    if (existsDecimals) {
        price = price.concat(decimals)
    }
    price = price.join("")
    return price;
}

// VERIFICO SI HAY PRODUCTOS EN EL LOCALSTORAGE PARA CARGARLOS AL CARRITO -----------------------------------------------------------------------------------------------------

let cartJSON = localStorage.getItem("cartStored")

if (cartJSON){
    cart = JSON.parse(cartJSON)  
    updateCart()  
}

// AGREGAR PRODUCTO DEL CARRITO-----------------------------------------------------------------------------------------------------

function addToCart(e){
    let prodCart = {};
    let prodIndexAux;
    if(!(e.target.getAttribute('data-prodIndex'))){
        prodIndexAux = e.target.parentNode.getAttribute('data-prodIndex');
    } else {
        prodIndexAux = e.target.getAttribute('data-prodIndex');
    }
    let productAux = products.findIndex(product => product.code == prodIndexAux)
    if(cart.find(prod => prod.code == products[productAux].code)){
        let index = cart.findIndex(prod => prod.code == products[productAux].code)
        cart[index]["qty"] += 1; 
    } else {
        prodCart = {...products[productAux], "qty": 1}
        cart.push(prodCart)
    }

    updateCart()
}

// FILTRAR POR CATEGORIAS -----------------------------------------------------------------------------------------------------

const categories = document.querySelector('.category');

categories.childNodes.forEach(category => {
    category.addEventListener('click', (e)=>{
        for (let cat of categories.children) {
            if (cat.classList.contains("active")) {
                cat.classList.toggle('active')
            }};
        e.target.classList.toggle('active');
        let productsAux = products.filter(prod => prod.category.toLowerCase() === category.innerText.toLowerCase())
        if(category.innerText.toLowerCase() === "todos"){
            productsAux = [...products]
        }
        showProducts(productsAux)
    })
})


// BÚSQUEDA -----------------------------------------------------------------------------------------------------

const searchInput = document.querySelector('.searchInput');
const searchBtn = document.querySelector('.searchBtn');

searchInput.addEventListener('change', () => search());


function search(){
    let productsAux = [];
    let foundDescription = products.filter(prod => prod.description.toLowerCase().includes(searchInput.value.toLowerCase())) 
    let foundTitle = products.filter(prod => prod.nameProd.toLowerCase().includes(searchInput.value.toLowerCase())) 
    let foundCat = products.filter(prod => prod.category.toLowerCase().includes(searchInput.value.toLowerCase())) 
    
    productsAux = [...foundTitle]
    foundDescription.forEach(prod => {
        let found = false;
        productsAux.forEach(prodAux =>{
            if(prod.code === prodAux.code){
                found = true;
            }
        })
        if (!found) {
            productsAux.push(prod)
        }
    })
    foundCat.forEach(prod => {
        let found = false;
        productsAux.forEach(prodAux =>{
            if(prod.code === prodAux.code){
                found = true;
            }
        })
        if (!found) {
            productsAux.push(prod)
        }
    })
    if (productsAux.length == 0) {
        principal.innerHTML = "";
        const msgErrorSearch = document.createElement('div');
        msgErrorSearch.innerHTML = `No hay resultados para la búsqueda: ${searchInput.value}`;
        principal.append(msgErrorSearch);
        msgErrorSearch.style.gridColumnStart = "span 5";
        searchInput.value = "";

    } else {
        showProducts(productsAux);
        searchInput.value = "";
    }
}

// MOSTRAR MODAL DE PAGO -----------------------------------------------------------------------------------------------------

function showPayment(){
    const paymentContainer = document.createElement('div');
    const body = document.querySelector('body');
    const paymentModal = document.createElement('div');
    
    paymentContainer.classList.add('paymentContainer');
    paymentModal.classList.add('paymentModal');
    
    const sectionCart = document.createElement('section');
    sectionCart.classList.add('sectionCart');
    const sectionPay = document.createElement('section');
    sectionPay.classList.add('sectionPay');
    const divPaymentContainer = document.createElement('div');
    divPaymentContainer.classList.add('divPaymentContainer');

    const sectionPayTitle = document.createElement('h2');
    sectionPayTitle.classList.add('sectionPayTitle');
    sectionPayTitle.innerText = 'Método de pago:'

    const card = document.createElement('div');
    card.classList.add('card');
    const cardName = document.createElement('span');
    cardName.classList.add('cardName');
    cardName.innerText = 'NOMBRE APELLIDO'
    const cardNum = document.createElement('span');
    cardNum.classList.add('cardNum');
    cardNum.innerText = '0000 0000 0000 0000'
    const cardExp = document.createElement('span');
    cardExp.classList.add('cardExp');
    cardExp.innerText = 'Vto. mm/aa'
    const cardBrand = document.createElement('IMG');
    cardBrand.classList.add('cardBrand');
    const cardBottomSection = document.createElement('DIV');
    cardBottomSection.classList.add('cardBottomSection');

    cardBottomSection.append(cardExp);
    cardBottomSection.append(cardBrand);

    card.append(cardNum);
    card.append(cardName);
    card.append(cardBottomSection);

    sectionPay.append(sectionPayTitle);
    sectionPay.append(card);

    const containerForm = document.createElement('FORM');
    containerForm.classList.add('containerForm');

    const labelCardNum = document.createElement('LABEL');
    labelCardNum.setAttribute('for', "formCardNum");
    labelCardNum.innerText = "Número de tarjeta";
    const labelCardName = document.createElement('LABEL');
    labelCardName.setAttribute('for', "formCardName");
    labelCardName.innerText = "Nombre y Apellido";
    const labelCardExp = document.createElement('LABEL');
    labelCardExp.setAttribute('for', "formCardExp");
    labelCardExp.innerText = "Vencimiento";

    const formCardNum = document.createElement('INPUT');
    formCardNum.setAttribute('id', "formCardNum");
    formCardNum.setAttribute('name', "formCardNum");
    formCardNum.setAttribute('type', "text");
    formCardNum.setAttribute('maxlength', "16");
    const formCardName = document.createElement('INPUT');
    formCardName.setAttribute('id', "formCardName");
    formCardName.setAttribute('name', "formCardName");
    formCardName.setAttribute('type', "text");
    formCardName.setAttribute('maxlength', "23");
    const formCardExp = document.createElement('INPUT');
    formCardExp.setAttribute('id', "formCardExp");
    formCardExp.setAttribute('name', "formCardExp");
    formCardExp.setAttribute('type', "text");
    formCardExp.setAttribute('maxlength',"4")
    
    const formExpErrorMsg = document.createElement('p');
    formExpErrorMsg.classList.add('formExpErrorMsg');
    
    const formNumErrorMsg = document.createElement('p');
    formNumErrorMsg.classList.add('formNumErrorMsg');
    
    const btnFinalPay = document.createElement('BUTTON');
    btnFinalPay.classList.add('btnFinalPay');
    btnFinalPay.classList.add('disabled');
    btnFinalPay.innerText = "Confirmar pago"

    containerForm.append(labelCardNum);
    containerForm.append(formCardNum);
    containerForm.append(formNumErrorMsg)
    containerForm.append(labelCardName);
    containerForm.append(formCardName);
    containerForm.append(labelCardExp);
    containerForm.append(formCardExp);
    containerForm.append(formExpErrorMsg)
    containerForm.append(btnFinalPay);

    sectionPay.append(containerForm);

    paymentModal.append(sectionPay);
    
    let cardCheck = false;
    let nameCheck = false;
    let expCheck = false;

    formCardNum.addEventListener('input',()=>{
        btnFinalPay.classList.add('disabled')
        formNumErrorMsg.style.display = "none";
        formNumErrorMsg.innerText = "";
        if (formCardNum.value[0] == "4") {
            cardBrand.style.visibility = "visible";
            cardBrand.setAttribute("src","./Images/visalogo.png")
            if (!cardBrand.classList.contains('visa')) {
                cardBrand.classList.toggle('visa');
            }
        } else if (formCardNum.value[0] == "5") {
            cardBrand.style.visibility = "visible";
            cardBrand.setAttribute("src","./Images/mastercardlogo.png")
        } 
        cardNum.innerText = "";
        let valueAux = formCardNum.value.split('');
        const valueAuxArr = []
        valueAux.forEach((val, index) => {
            valueAuxArr.push(val)
            if((index+1) % 4 === 0){
                valueAuxArr.push(" ")
            }
        })
        if (isNaN(Number(formCardNum.value) && formCardNum.value != "")) {
            formNumErrorMsg.style.display = "block";
            formNumErrorMsg.innerText = "Error: número inválido"
        }
        cardNum.innerText = !formCardNum.value || isNaN(Number(formCardNum.value)) ? "0000 0000 0000 0000" : valueAuxArr.join('');
        if(!formCardNum.value){
            cardBrand.style.visibility = "hidden";
            if(cardBrand.classList.contains('visa')){
                cardBrand.classList.toggle('visa');
            }
        }
        if(formCardNum.value.length === 16 && !isNaN(Number(formCardNum.value))){
            cardCheck = true;
        } else {
            cardCheck = false;
        }
    })

    formCardName.addEventListener('input', ()=> {
        btnFinalPay.classList.add('disabled')
        cardName.innerText = !formCardName.value ? "NOMBRE APELLIDO" : formCardName.value.toUpperCase();
        
        if(formCardName.value){
            nameCheck = true;
        }else{
            nameCheck = false;
        }
    })

    containerForm.addEventListener('input', ()=>{
        btnFinalPay.classList.add('disabled')
        cardExp.innerText = "vto ";
        formExpErrorMsg.innerText = ""
        let valueAux = formCardExp.value.split('');
        const valueAuxArr = [];
        valueAux.forEach((val,index)=>{
            valueAuxArr.push(val)
            if(index === 1){
                valueAuxArr.push('/')
            }
        })
        cardExp.innerText = !formCardExp.value || isNaN(Number(formCardExp.value))  ? "Vto. mm/aa" : `Vto. ${valueAuxArr.join('')}`;
        if (isNaN(Number(formCardExp.value) && formCardExp.value != "")) {
            formExpErrorMsg.style.display = "block";
            formExpErrorMsg.innerText = "Fecha inválida";
            expCheck = false;
        }
        const currentMonth = new Date().getMonth() + 1;  
        const currentYear = Number(String(new Date().getFullYear()).slice(2)); 
        if(formCardExp.value.length === 4){
            if (Number(formCardExp.value.slice(0,2))>12 || Number(formCardExp.value.slice(0,2))<1) {
                formExpErrorMsg.style.display = "block"
                formExpErrorMsg.innerText = "Fecha inválida";
                expCheck = false;
            }
            if ((Number(formCardExp.value.slice(2)) === currentYear) && (Number(formCardExp.value.slice(0,2)) < currentMonth) || (Number(formCardExp.value.slice(2)) < currentYear) || (((Number(formCardExp.value.slice(2))) - currentYear) > 20)) {
                formExpErrorMsg.style.display = "block"
                formExpErrorMsg.innerText = "Tarjeta vencida";
                expCheck = false;
            }
        }

        if(((!(isNaN(Number(formCardExp.value)))) && formCardExp.value != "" && ((Number(formCardExp.value.slice(2)) - currentYear) < 20 && (Number(formCardExp.value.slice(2)) - currentYear) >= 0)) && !(Number(formCardExp.value.slice(0,2))>12 || Number(formCardExp.value.slice(0,2))<1) && !((Number(formCardExp.value.slice(2)) === currentYear && Number(formCardExp.value.slice(0,2)) < currentMonth) || (Number(formCardExp.value.slice(2)) < currentYear))){
            expCheck = true;
        } 

        if(cardCheck && expCheck && nameCheck){
            btnFinalPay.classList.remove('disabled')
        }
        btnFinalPay.addEventListener('click', (e)=>{
            e.preventDefault();
            e.target.classList.add('paid');
            e.target.innerHTML = `<i class="fa-solid fa-check"></i> ¡Pagado!`;
            let timerInterval;
            Swal.fire({
            icon: 'success',
            title: 'Pago aprobado',
            html: 'Cerrando en <b></b> segundos.',
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Math.ceil(Swal.getTimerLeft()/1000)
                }, 1000)
            },
            willClose: () => {
                clearInterval(timerInterval)
                }
            }).then(() => {
                closePaymentModal();
                emptyCart(); 
            })     
        })
    })
        function renderCartPayment(){
            sectionCart.innerHTML = ""
            const cartPaymentCloseBtn = document.createElement('BUTTON');
            cartPaymentCloseBtn.classList.add()
            cartPaymentCloseBtn.classList.add('cartPaymentCloseBtn')
            cartPaymentCloseBtn.innerHTML = `<i class="fa-solid fa-xmark paymentClose"></i>`;

            const cartPaymentTitle = document.createElement('h2');
            cartPaymentTitle.classList.add('cartPaymentTitle');
            cartPaymentTitle.innerText = "Su pedido:";

            sectionCart.append(cartPaymentCloseBtn);
            sectionCart.append(cartPaymentTitle);

            cartPaymentCloseBtn.addEventListener('click', ()=>{
                closePaymentModal();
            })

            cart.map((product, index) => {
        
                const paymentCartProd = document.createElement('DIV');
                paymentCartProd.classList.add('paymentCartProd');
                
                const paymentCartProdImg = document.createElement('img');
                paymentCartProdImg.classList.add('paymentCartProdImg');
                
                const paymentCartProdTitle = document.createElement('P');
                paymentCartProdTitle.classList.add('paymentCartProd-title');
                
                const btnMinusCart = document.createElement("BUTTON");
                btnMinusCart.classList.add('btnMinusCart');
                btnMinusCart.setAttribute("data-cartProdIndex",index)
                btnMinusCart.innerHTML = `<i class="fa-solid fa-minus"></i>`;

                const paymentCartProdQty = document.createElement('P');
                paymentCartProdQty.classList.add('paymentCartProd-qty');
                
                const btnPlusCart = document.createElement("BUTTON");
                btnPlusCart.classList.add('btnPlusCart');
                btnPlusCart.setAttribute("data-cartProdIndex",index)
                btnPlusCart.innerHTML = `<i class="fa-solid fa-plus"></i>`;

                const containerQtyCart = document.createElement("DIV");
                containerQtyCart.classList.add('containerQtyCart')

                const paymentCartProdPrice = document.createElement('P');
                paymentCartProdPrice.classList.add('paymentCartProd-price');
                
                const paymentCartProdBtnDelete = document.createElement('BUTTON');
                paymentCartProdBtnDelete.classList.add('paymentDeleteBtn');
                paymentCartProdBtnDelete.innerHTML = `<i class="fa-solid fa-trash-can" data-cartProdIndex="${index}"></i>`
        
                paymentCartProdImg.src = product.image[0];
                paymentCartProdTitle.innerText = product.nameProd;
                paymentCartProdQty.innerText = `${product.qty} u.`;
                paymentCartProdPrice.innerText = `$${priceDot(product.price*product.qty)}`;
                
                containerQtyCart.append(btnMinusCart)
                containerQtyCart.append(paymentCartProdQty)
                containerQtyCart.append(btnPlusCart)

                paymentCartProd.append(paymentCartProdImg);
                paymentCartProd.append(paymentCartProdTitle);
                paymentCartProd.append(containerQtyCart);
                paymentCartProd.append(paymentCartProdPrice);
                paymentCartProd.append(paymentCartProdBtnDelete);
        
                sectionCart.append(paymentCartProd)
            }) 

            const paymentTotalSep = document.createElement('HR');
            paymentTotalSep.classList.add('paymentTotalSep');
        
            const paymentCartTotal = document.createElement('DIV');
            paymentCartTotal.classList.add('paymentCartTotal');
        
            let totalValue = priceDot(cart.reduce((acc, product) => acc + product.price*product.qty,0)) 
        
            paymentCartTotal.innerHTML = `<span class="total">Total</span><span class="paymentTotalValue">$${totalValue}</span>`;
        
            const paymentBtnCartEmpty = document.createElement('BUTTON');
            paymentBtnCartEmpty.classList.add('paymentBtnCartEmpty');
            paymentBtnCartEmpty.innerHTML = `<i class="fa-solid fa-trash-can"></i> Vaciar carrito`;
        
            sectionCart.append(paymentTotalSep);
            sectionCart.append(paymentCartTotal);
            sectionCart.append(paymentBtnCartEmpty);

            paymentModal.append(divPaymentContainer);
            paymentModal.append(sectionCart);

            paymentContainer.append(paymentModal);
            
            body.append(paymentContainer);

            paymentBtnCartEmpty.addEventListener('click', () => {
                emptyCart();
                closePaymentModal()
            });
            
            const paymentCartDeleteButtons = document.querySelectorAll('.paymentDeleteBtn');
        
            paymentCartDeleteButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    deleteProdCart(e)
                    sectionCart.innerHTML = "";
                    renderCartPayment()
            })});

            const btnsMinusCart = document.querySelectorAll('.btnMinusCart')
            const btnsPlusCart = document.querySelectorAll('.btnPlusCart')
    
            btnsMinusCart.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    reduceCartProd(e);
                    renderCartPayment()
                })
            });
    
            btnsPlusCart.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    incrementCartProd(e);
                    renderCartPayment()
                })
            });
        }

        renderCartPayment()

        const paymentClose = document.querySelector('.paymentClose');
        paymentClose.addEventListener('click', ()=>{
            closePaymentModal();
        })
    }

// FUNCION PARA CERRAR EL MODAL DE PAGO -----------------------------------------------------------------------------------------------------
function closePaymentModal(){
    const paymentContainer = document.querySelector('.paymentContainer');
    paymentContainer.style.display = 'none';
}

// CAMBIAR DE IMAGENES EN LOS PRODUCTOS EN EL HOME -----------------------------------------------------------------------------------------------------
function imgSwitch(){
    const dotImgs = document.querySelectorAll('.dotImg');

    dotImgs.forEach(dotImg=>{
        dotImg.addEventListener('click',(e)=>{

            e.target.parentNode.childNodes.forEach(child=>{
                child.classList.remove('active');
            })
            
            e.target.parentNode.parentNode.childNodes.forEach(child=>{
                child.classList.remove('active');
            })
            e.target.classList.add('active')
            const prodAux = e.target.parentNode.getAttribute('data-prodindex');
            const numImg = e.target.getAttribute('data-num-img');
            e.target.parentNode.parentNode.childNodes[numImg].classList.add('active')
        })
    })

}

// FUNCION PARA ACTUALIZAR LOS BOTONES DE ADD EN EL HOME CUANDO CAMBIA EL CARRITO -----------------------------------------------------------------------------------------------------
function updateCartAddBtn(){
    const containerProdCartInfo = document.querySelectorAll('.containerProdCartInfo');

    containerProdCartInfo.forEach(container => {
        let prodIndexAux = container.getAttribute('data-prodIndex');
        let productAux = products.findIndex(product => product.code == prodIndexAux);

        if(cart.find(prod => prod.code === products[productAux].code)){
            if (!(container.classList.contains('active'))) {
                container.classList.add('active');
                container.parentNode.firstChild.classList.add('inCart')
                container.parentNode.firstChild.innerHTML = `<i class="fa-solid fa-cart-shopping">`
            }
            let index = cart.findIndex(prod => prod.code === products[productAux].code);
            if (cart[index]["qty"]<1) {
                if (container.classList.contains('active')) {
                    container.classList.remove('active');
                    container.parentNode.firstChild.classList.remove('inCart');
                    container.parentNode.firstChild.innerHTML = `Agregar al carrito`;
                }
            }
            container.childNodes[1].innerHTML = cart[index]["qty"];
        } else {
            if (container.classList.contains('active')) {
                container.classList.remove('active');
                container.parentNode.firstChild.classList.remove('inCart');
                container.parentNode.firstChild.innerHTML = `Agregar al carrito`;
            }
        }

    })
}

// BOTÓN - EN EL CARRITO -----------------------------------------------------------------------------------------------------
function reduceCartProd(e){
    let prodIndexAux = e.target.parentNode.getAttribute('data-prodIndex') || e.target.parentNode.getAttribute('data-cartProdIndex');
    if (e.target.parentNode.getAttribute('data-cartProdIndex')) {
        cart[e.target.parentNode.getAttribute('data-cartProdIndex')]['qty'] -= 1;
        if (cart[e.target.parentNode.getAttribute('data-cartProdIndex')]["qty"] == 0) {
            cart.splice(e.target.parentNode.getAttribute('data-cartProdIndex'),1)
        }
    } else{
        let productAux = products.findIndex(product => product.code == prodIndexAux);
        if(cart.find(prod => prod.code == products[productAux].code) !== -1){
            let index = cart.findIndex(prod => prod.code == products[productAux].code)
            cart[index]["qty"] -= 1; 
            if (cart[index]["qty"] == 0) {
                cart.splice(index,1)
            }

        }
    }
    updateCart();
}

// BOTÓN + EN EL CARRITO -----------------------------------------------------------------------------------------------------
function incrementCartProd(e){
    let prodIndexAux = e.target.parentNode.getAttribute('data-prodIndex') || e.target.parentNode.getAttribute('data-cartProdIndex');
    let productAux = products.findIndex(product => product.code == prodIndexAux);
    if (e.target.parentNode.getAttribute('data-cartProdIndex')) {
        cart[e.target.parentNode.getAttribute('data-cartProdIndex')]['qty'] += 1;
    } else{
        if(cart.find(prod => prod.code == products[productAux].code) !== -1){
            let index = cart.findIndex(prod => prod.code == products[productAux].code)
            cart[index]["qty"] += 1; 

        }
    }
    updateCart();
}