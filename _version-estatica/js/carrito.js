const carritoItems = document.querySelector('#carritoItems');
const carritoTotal = document.querySelector('#carritoTotal');
const btnVaciar = document.querySelector('#btn-borrar-carrito');


// leer carrito desde localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carritoItems')) || [];
}

// guardar carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carritoItems', JSON.stringify(carrito));
}

// renderizar tabla del carrito
function renderCarrito() {
    const carrito = obtenerCarrito();
    carritoItems.innerHTML = '';

    let total = 0;

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$ ${producto.precio.toLocaleString()}</td>
            <td>${producto.cantidad}</td>
            <td>$ ${subtotal.toLocaleString()}</td>
            <td><button class="btn-eliminar" data-index="${index}">❌</button></td>
        `;
        carritoItems.appendChild(fila);
    });

    carritoTotal.textContent = total.toLocaleString();

    // agrego eventos para eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', eliminarProducto);
    });
}

// eliminar producto del carrito
function eliminarProducto(e) {
    const index = e.target.dataset.index;
    let carrito = obtenerCarrito();
    carrito.splice(index, 1); // saco el producto
    guardarCarrito(carrito);
    renderCarrito();
    actualizarContador();
}

// vaciar carrito
function vaciarCarrito() {
    localStorage.removeItem('carritoItems');
    localStorage.setItem('carrito', 0); // reinicio el contador
    renderCarrito();
    actualizarContador();
}

// actualizar contador en el header
function actualizarContador() {
    const contadorElemento = document.querySelector('#contador-carrito');
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contadorElemento.textContent = totalItems;
    localStorage.setItem('carrito', totalItems);
}

if (btnVaciar) {
    btnVaciar.addEventListener('click', vaciarCarrito);
}

document.addEventListener('DOMContentLoaded', () => {
    renderCarrito();
    actualizarContador();
});

// boton de "Realizar Compra"
const btnComprar = document.querySelector('#btn-comprar');

function realizarCompra() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de comprar.');
        return;
    }

    let total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    alert(`¡Compra realizada!\nTotal: $${total.toLocaleString()}\nGracias por tu compra.`);

    vaciarCarrito();
}

if (btnComprar) {
    btnComprar.addEventListener('click', realizarCompra);
}

