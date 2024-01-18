
class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

// Agregar un producto al carrito
function agregarAlCarrito(productos, carrito) {
    let idProducto = prompt("Ingrese el ID del producto que desea agregar al carrito: ( 1, 2 o 3 )");
    let cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar:"));

    let productoEncontrado = productos.find(producto => producto.id === parseInt(idProducto));

    if (productoEncontrado) {
        if (cantidad > 0 && cantidad <= productoEncontrado.stock) {
            carrito.push({ producto: productoEncontrado, cantidad });
            productoEncontrado.stock -= cantidad;
            console.log(`${cantidad} ${productoEncontrado.nombre} agregado al carrito.`);
        } else {
            console.log("Cantidad no disponible.");
        }
    } else {
        console.log("Producto no encontrado.");
    }
}

// Contenido del carrito
function mostrarCarrito(carrito) {
    console.log("Carrito de Compras:");
    carrito.forEach(item => {
        console.log(`- Producto: ${item.producto.nombre}`);
        console.log(`  Cantidad: ${item.cantidad}`);
        console.log(`  Precio unitario: $${item.producto.precio.toFixed(2)}`);
        console.log(`  Subtotal: $${(item.producto.precio * item.cantidad).toFixed(2)}`);
    });
}

// Función para calcular el total 
function calcularTotal(carrito) {
    let total = carrito.reduce((acumulador, item) => acumulador + (item.producto.precio * item.cantidad), 0);
    console.log(`Total del carrito: $${total.toFixed(2)}`);
}

// Crear productos con stock
const productosDisponibles = [
    new Producto(1, "Taza", 2500, 5),
    new Producto(2, "Plato", 3000, 12),
    new Producto(3, "Jarra", 3500, 15)
];

const carritoDeCompras = [];

// Solicitar al usuario que agregue productos 
while (true) {
    let deseaAgregar = prompt("¿Desea agregar un producto al carrito? (Si / No)").toLowerCase();
    if (deseaAgregar !== "si") {
        break;
    }

    agregarAlCarrito(productosDisponibles, carritoDeCompras);
}

// Mostrar el carrito y calcular el total
mostrarCarrito(carritoDeCompras);
calcularTotal(carritoDeCompras);
