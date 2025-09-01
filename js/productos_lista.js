import { productos } from './catalogo_productos.js';

const productsContainer = document.querySelector('#productsContainer');
const searchInput = document.querySelector('.search-input');

function fetchProductos() {
    return new Promise(resolve => {
        setTimeout(() => resolve(productos), 500); // medio segundo de delay
    });
}

function renderProductos(lista) {
    productsContainer.innerHTML = ''; // para que funcione la barra buscadora
    lista.forEach(producto => {
        const article = document.createElement('article');
        article.className = 'product-card';
        article.innerHTML = `
            <a href="producto.html?id=${producto.id}" class="product-card__link">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-card__image">
                <h3 class="product-card__title">${producto.nombre}</h3>
                <p class="product-card__price">$ ${producto.precio.toLocaleString()}</p>
            </a>
        `;
        productsContainer.appendChild(article);
    });
}


searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = productos.filter(p => p.nombre.toLowerCase().includes(term));
    renderProductos(filtered);
});

document.addEventListener('DOMContentLoaded', async () => {
    const lista = await fetchProductos();
    renderProductos(lista);
});
