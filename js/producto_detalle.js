import { productos } from './catalogo_productos.js';
import { agregarAlCarrito } from './carrito.js';

// Función para obtener el parámetro 'id' de la URL
function getQueryParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

function renderProductoDetalle(producto) {
    const img = document.querySelector('.product-image img');
    const title = document.querySelector('.product-title');
    const desc = document.querySelector('.product-info p');
    const specsList = document.querySelector('.product-specs');
    const price = document.querySelector('.price');

    img.src = producto.imagen;
    img.alt = producto.nombre;
    title.textContent = producto.nombre;
    desc.textContent = producto.descripcion;
    price.textContent = `$ ${producto.precio.toLocaleString()}`;

    specsList.innerHTML = '';
    for (const key in producto) {
        if (!['id','nombre','imagen','descripcion','precio'].includes(key)) {
            const li = document.createElement('li');
            li.innerHTML = `<span class="label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <span class="value">${producto[key]}</span>`;
            specsList.appendChild(li);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const id = parseInt(getQueryParam('id'));
    const producto = productos.find(p => p.id === id);
    if (producto) renderProductoDetalle(producto);

    // Botón "Agregar al carrito"
    const botonAgregar = document.querySelector('.add-to-cart');
    if (botonAgregar) {
        botonAgregar.addEventListener('click', () => {
            agregarAlCarrito(1);
        });
    }
});
