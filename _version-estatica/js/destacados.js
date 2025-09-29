// destacados.js
import { productos } from './catalogo_productos.js';

const contenedorDestacados = document.querySelector('.productos-centrados');

function getProductosRandom(cantidad = 4) { //elijo los 4 prod random
    const copia = [...productos];
    const seleccion = [];
    while (seleccion.length < cantidad && copia.length > 0) {
        const index = Math.floor(Math.random() * copia.length);
        seleccion.push(copia.splice(index, 1)[0]);
    }
    return seleccion;
}

function renderProducto(producto) {  //renderizo en el html
    const article = document.createElement('article');
    article.classList.add('producto');
    article.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio.toLocaleString()}</p>
        <a href="producto.html?id=${producto.id}" class="btn-secondary">Ver más</a>
    `;
    contenedorDestacados.appendChild(article);
}

async function cargarDestacados() {
    const destacados = await new Promise(resolve => {
        setTimeout(() => resolve(getProductosRandom()), 1000);
    });
    destacados.forEach(renderProducto);
}

document.addEventListener('DOMContentLoaded', cargarDestacados);
