
let welcome = `Bienvenidos a la tienda de articulos de Hockey`;

let message = `
Ingresá el número de producto que quieras agregar al carrito.

1. Palo de hockey $99.000.
2. Bolso grande $89.000.
3. Guante mano izquierda $15.000.
4. Guante mano derecha $16.500.
5. Bocha de hockey $3.500.
6. Medias largas $4.000.
9. Ir al carrito.
`;

let option;
let total = 0;
let detalle = "";

function showProducts(){
    do {
       option = prompt(message)
       if(option === "" || option === undefined || option === null || isNaN(option)){
        alert("Ingreso inválido, por favor intente nuevamente");
        continue;
       } 

       option = Number(option);
       switch (option) {
        case 1:
            total += 99000;
            detalle += "Palo de hockey $99.000 \n";
            alert("Producto agregado correctamente");
            break;
        case 2:
            total += 89000;
            detalle += "Bolso grande $89.000 \n";
            alert("Producto agregado correctamente");
            break;

        case 3:
            total += 15000;
            detalle += "Guante mano izquierda $15.000 \n";
            alert("Producto agregado correctamente");
            break;
       
        case 4:
            total += 16500;
            detalle += "Guante mano derecha $16.500 \n";
            alert("Producto agregado correctamente");
            break;

        case 5:
            total += 3500;
            detalle += "Bocha de hockey $3.500 \n";
            alert("Producto agregado correctamente");
            break;

        case 6:
            total += 4000;
            detalle += "Medias largas $4.000 \n";
            alert("Producto agregado correctamente");
            break;
        case 9:
            break;
        default:
            alert("La opción elegida no es válida, elegí una de las opciones disponibles.")
            break;
            }
        } while (option !== 9);
    }
    
    function showCart(total, detalle){
        let hayDescuento = false;
        let descuento = 0;
        let msgDescuento = "";
        if(total > 100000){
            descuento = total * 0.10;
            total -= descuento;
            hayDescuento = true;
        }
        if(descuento){
            msgDescuento = `Tu compra supera los $100.000 por lo que te recompensamos con un 10% de descuento!`
        }
        let resumen = `
        \r${msgDescuento}
        \n
        \r******Detalle del carrito****** 
        \r${detalle}
        \r--------------------------------
        \rDescuentos: -$${descuento}
        \r--------------------------------
        \rTotal a pagar: $${total}
        `;
        alert(resumen);
    }
alert(welcome)
showProducts();
showCart(total, detalle);