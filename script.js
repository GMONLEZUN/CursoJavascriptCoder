
// CONSTRUCTOR DE PRODUCTOS -----------------------------------------------------------------------------------------------------

let codigo = 1;
let productos = [];

function Product (codigo, nombre, descripcion, precio, categoria, stock = 0) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.categoria = categoria; 
    this.stock = stock;
    this.sumaIva = function(){
        this.precio = this.precio * 1.21;
    };
    this.actualizarStock = function(valor){
        this.stock += valor;
    }
}

function newProduct(nombre, descripcion, precio, categoria){
    let prod = new Product(codigo, nombre, descripcion, precio, categoria);
    productos.push(prod);
    codigo++;
}

// PRODUCTOS            -----------------------------------------------------------------------------------------------------

newProduct("Palo de hockey", "Composición: Carbono 99% Medida: Grande",99000,"Palos");
newProduct("Bolso grande", "Composición: Poliester 99% Medida: Grande",89000,"Bolsos");
newProduct("Guante izquierdo", "Composición: Poliester 99% Medida: M",15000,"Guantes");
newProduct("Guante derecho", "Composición: Poliester 99% Medida: S",13000,"Guantes");
newProduct("Bocha de hockey", "color: blanco",3500,"Accesorios");
newProduct("Medias largas", "Composición: Poliester 99% Medida: M",4000,"Accesorios");


// MENSAJE            -----------------------------------------------------------------------------------------------------

let welcome = `Bienvenidos a la tienda de artículos de Hockey`;

alert(welcome)

let message = `
Ingresá el número de producto que quieras agregar al carrito, presioná 99 si querés terminar tu compra o ver el carrito.
\n
99. Ver el carrito.\n
`;

productos.forEach(producto => {
message += `${producto.codigo}. ${producto.nombre} \t $${producto.precio} \n`
});


let option;
let cart = [];
let cartAux = [];
let total = 0;
let numProdCart = 0;



// MOSTRAR LOS PRODUCTOS            -----------------------------------------------------------------------------------------------------

function showProducts(){
    do {
            option = prompt(message)
            if(option === "" || option === undefined || option === null || isNaN(option)){
                console.log("Ingreso inválido, por favor intentá nuevamente");
                continue;
            } 

            option = Number(option);

            if((option < 1 || option > productos.length) && option !== 9){
                alert("Opción incorrecta, por favor intentá nuevamente");
                continue;
            } 

            const busqueda = productos.find(producto => producto.codigo === option)

            if (busqueda !== undefined && busqueda !== 9) {
                cart.push(busqueda)
            }

        } while (option !== 99);
        if(option === 99){
            showCart()
        }
    }

// MOSTRAR EL CARRITO            -----------------------------------------------------------------------------------------------------

function showCart(){
    let resumen = `\r******Detalle del carrito******\n `;

    
    cart.forEach((prod)=>{ 
        numProdCart++;
        cartAux.push({...prod, "numProdCart":numProdCart})
    })

    cartAux.map(prod => {
        resumen += `\r${prod.numProdCart}. ${prod.nombre} \t $${prod.precio}\n`;
    })
    
    total = cartAux.reduce((acc, prod) => acc + prod.precio,0);

    resumen += `\r--------------------------------\n`
    if(total > 100000){
        let descuento = total * 0.10
        total -= descuento
        resumen +=`
        \rTu compra supera los $100.000 por lo que te recompensamos con un 10% de descuento!\n
        \rDescuentos: -$${descuento}\n
        \r--------------------------------\n`
    }
    resumen += `\rTotal a pagar: $${total}\n`
    
    alert(resumen)
    
    cart = [];
    cart = [...cartAux]
    cartAux = []
    
    option = Number(prompt("Presioná 1 para seguir comprando\n Presioná 2 para modificar el carrito\n Presioná 3 para vaciar el carrito"))
    
    if(option === "" || option === undefined || option === null || isNaN(option)){
        alert("Ingreso inválido, por favor intentá nuevamente");
        showCart();
    } 

    verifOptions(1,3, option, showCart);

    if(option === 1){
        numProdCart = 0;
        showProducts()
    }
    if(option === 2){
        modCart(resumen)
    }
    if(option === 3){
        numProdCart = 0;
        emptyCart()
    }
}

// MODIFICAR EL CARRITO            -----------------------------------------------------------------------------------------------------

function modCart(resumen){
    option = Number(prompt(`Presione el número de producto que desea eliminar del carrito, o 99 para ver el carrito\n ${resumen}`))
    if(option === "" || option === undefined || option === null || isNaN(option)){
        alert("Ingreso inválido, por favor intentá nuevamente");
        modCart(resumen);
    } 
    if (option === 99) {
        showCart()
    }
    let prodIndex = cart.find(prod => prod.numProdCart === option);
    if(prodIndex == undefined){
        alert("Opción inválida");
        modCart(resumen);
    }
    let prodDel = cart.indexOf(prodIndex);
    cart.splice(prodDel,1)
    alert(`Se ha eliminado el producto ${prodIndex.nombre}`)
    numProdCart = 0;
    showCart()
}


// VACIAR EL CARRITO            -----------------------------------------------------------------------------------------------------

function emptyCart(){
    cart = []
    alert("Carrito vacio")
    showProducts()
}

// FUNCIÓN PARA VERIFICAR LOS INPUT -----------------------------------------------------------------------------------------------------

function verifOptions(min, max, opt, func){
    if(opt < min || option > max){
        console.log("Opción inválida")
        func()
    }
}




showProducts();

