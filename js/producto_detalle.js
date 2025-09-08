import { productos } from './catalogo_productos.js';
import { agregarAlCarrito } from './agregar_carrito.js';

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id'), 10);

const productImage = document.querySelector('.product-image img');
const productTitle = document.querySelector('.product-title');
const productPrice = document.querySelector('.price');
const addToCartBtn = document.querySelector('.add-to-cart');

document.addEventListener('DOMContentLoaded', () => {
    const producto = productos.find(p => p.id === productId);
    if (!producto) {
        productTitle.textContent = 'Producto no encontrado';
        return;
    }

    productImage.src = producto.imagen;
    productImage.alt = producto.nombre;
    productTitle.textContent = producto.nombre;
    productPrice.textContent = `$ ${producto.precio.toLocaleString()}`;

    addToCartBtn.addEventListener('click', () => {
        agregarAlCarrito(producto, 1);
        alert(`${producto.nombre} agregado al carrito!`);
    });
});
