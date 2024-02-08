const modal = new bootstrap.Modal('#modalCarrito', {});
const elements = {
    modalCarrito: document.querySelector('#modalCarrito'),
    btnModalCarrito: document.querySelector('#btnModalCarrito'),
    cartCount: document.querySelector('#cartCount'),
    cartSum: document.querySelector('#cartSum'),
    inputSearch: document.querySelector('#inputSearch'),
    listProducts: document.querySelector('#listProducts'),
    selectCategory: document.querySelector('#selectCategory'),
    modalListProducts: document.querySelector('#modalListProducts'),
    btnClose: document.querySelector('#btnClose'),
    btnSave: document.querySelector('#btnSave'),
    btnOrder: document.querySelector('#btnOrder')
};

const listCart = JSON.parse( localStorage.getItem('cart') ) || [];
const cart = new Cart(listCart);

elements.cartCount.innerText = cart.getCount();


elements.btnModalCarrito.addEventListener('click', function(){
    const list = cart.getProducts();
    elements.cartSum.innerText = cart.getSum();
    redenCart( list );
    modal.show();
})

elements.btnSave.addEventListener('click', ()=> {
    setTimeout( () => {        
        Swal.fire({
            title: "Carrito de Compras",
            text: "Compra finalizada",
            icon: "success"
        });    

    }, 3000)
    modal.hide();

    localStorage.removeItem('cart');
})

elements.btnClose.addEventListener('click', ()=> {
    modal.hide();
})

elements.inputSearch.addEventListener('input', (event) => {
    const search = event.target.value.toLowerCase();
    const newList = products.filter(product => product.nombre.toLowerCase().includes(search) );
    renderProducts(newList);
})

elements.btnOrder.addEventListener('click', () => {
    products.sort((a, b) => a.precio - b.precio);
    renderProducts(products);
    elements.btnOrder.setAttribute('disabled', true);
});

function renderProducts(list) {
    const fragment = document.createDocumentFragment();
    list.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('col-sm-4', 'col-md-3');
        div.innerHTML = `
            <div class="card p-2">
                <h4 class="text-center">${product.nombre}</h4>
                <img class="img-fluid" src="${product.img}" alt="${product.name}">
                <h3 class="text-center">$${product.precio}</h3>
                <button id="${product.id}" type="button" class="btn btn-primary btnAddCart">
                    <i class="fa-solid fa-cart-plus"></i> Agregar
                </button>
            </div>`;
        fragment.appendChild(div);
    });
    elements.listProducts.innerHTML = '';
    elements.listProducts.appendChild(fragment);
    const btns = document.querySelectorAll('.btnAddCart');
    btns.forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

function addToCart(e) {
    const id = e.target.id;
    const product = products.find(item => item.id == id);
    console.table(product);
    cart.addToCart(product);
    elements.cartCount.innerText = cart.getCount();
    Toastify({
        close: true,
        text: "Producto agregado al Carrito",
        gravity: 'bottom',
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)"
        }
    }).showToast();
}

function redenCart(list) {
    const fragment = document.createDocumentFragment();
    list.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.nombre}</td>
            <td>${product.units}</td>
            <td>$${product.precio}</td>
            <td>$${product.precio * product.units}</td>`;
        fragment.appendChild(tr);
    });
    elements.modalListProducts.innerHTML = '';
    elements.modalListProducts.appendChild(fragment);
}

renderProducts(products);