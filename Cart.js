class Cart {
    constructor(list = []) {
        this.cart = list;
    }

    addToCart({ id, nombre, img, precio }) {
        const index = this.cart.findIndex(product => product.id === id);
        if (index === -1) {
            this.cart.push({ id, nombre, img, precio, units: 1 });
        } else {
            this.cart[index].units += 1;
        }
    }

    getProducts() {
        return this.cart;
    }

    getCount() {
        return this.cart.reduce((total, product) => total + product.units, 0);
    }

    getSum() {
        return this.cart.reduce((total, product) => total + (product.units * product.precio), 0);
    }
}

// Función para guardar y obtener el carrito desde el almacenamiento local
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}
