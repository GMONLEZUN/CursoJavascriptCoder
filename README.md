# CursoJavascriptCoder
Entrega Final Monlezun, Gabriel

Curso de Coderhouse de Javascript año 2023. Se utilizó javascript vanilla para el desarrollo de este proyecto, solamente se implementó un alert de SweetAlert. En este proyecto no se utilizaron librerías de CSS ni plantillas.

El proyecto trata de un ecommerce de artículos de hockey.

Se pueden agregar modificar y eliminar productos del carrito desde el home de la web.

Posee un buscador en la parte superior y tiene categorías para filtrar los productos.

Tiene un carrito que se despliega como un modal desde la derecha donde se encuentran todos los productos que se fueron agregando. Desde este modal también se pueden modificar estos productos (agregar, restar, eliminar y vaciar el carrito).

Los productos en el carrito son guardados y traidos del localStorage para brindar persistencia de estos datos.

Al presionar ir a pagar desde el carrito se abre un modal donde está el formulario de pago, hace diferentes validaciones como: número de tarjeta (si comienza 45 Visa, 53 Master), nombre y una fecha de vencimiento válida (no vencida).

Si los input de la tarjeta son válidos, se habilita el botón de pago para finalizar la compra y se muestra un alert de sweet alert para mostrar que se ha pagado.