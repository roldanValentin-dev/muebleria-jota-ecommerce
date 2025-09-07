const productsContainer = document.querySelector('#productsContainer');
const searchInput = document.querySelector('.search-input');
const url = 'catalogo_productos.json';

let lista = [];

function renderProductos(lista) {
    productsContainer.innerHTML = ''; 
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
    const filtered = lista.filter(p => p.nombre.toLowerCase().includes(term));
    renderProductos(filtered);
});

async function cargarProductos(){
    try {
        const res = await fetch(url);
        if (!res.ok){
            throw new Error(`Error HTTP: ${res.status}`);
        }
        lista = await res.json();
        renderProductos(lista);
    } catch(error) {
        console.log('No se pudo obtener el producto: ', error);
    }
}

cargarProductos();
