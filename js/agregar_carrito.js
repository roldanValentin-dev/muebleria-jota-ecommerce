const contadorElemento = document.querySelector('#contador-carrito');

// creo boton borrar carrito
let botonBorrar = document.querySelector('#btn-borrar-carrito');
if (!botonBorrar && contadorElemento) {
    botonBorrar = document.createElement('button');
    botonBorrar.id = 'btn-borrar-carrito';
    botonBorrar.textContent = 'Borrar carrito';
    contadorElemento.parentNode.appendChild(botonBorrar);
}

// inicializa el contador
let contador = parseInt(localStorage.getItem('carrito')) || 0;

// actualizo
function actualizar() {
    if (contadorElemento) {
        contadorElemento.textContent = contador;
    }
}

export function agregarAlCarrito(producto, cantidad = 1) {
    // actualizo contador
    contador += cantidad;
    localStorage.setItem('carrito', contador);
    actualizar();

    // leo carrito existente
    let carritoItems = JSON.parse(localStorage.getItem('carritoItems')) || [];

    // veo si ya existe el producto
    const index = carritoItems.findIndex(p => p.id === producto.id);
    if (index !== -1) {
        carritoItems[index].cantidad += cantidad; // sumo cantidad
    } else {
        carritoItems.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }

    // guardo en localStorage
    localStorage.setItem('carritoItems', JSON.stringify(carritoItems));
}

// borrar carrito
function borrarCarrito() {
    contador = 0;
    localStorage.setItem('carrito', contador);
    localStorage.removeItem('carritoItems'); // vacío productos
    actualizar();
}

if (botonBorrar) {
    botonBorrar.addEventListener('click', borrarCarrito);
}

document.addEventListener('DOMContentLoaded', actualizar);
