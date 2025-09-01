
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

// agregar al carrito
export function agregarAlCarrito(cantidad = 1) {
    contador += cantidad;
    localStorage.setItem('carrito', contador);
    actualizar();
}

// borrar carrito
function borrarCarrito() {
    contador = 0;
    localStorage.setItem('carrito', contador);
    actualizar();
}


if (botonBorrar) {
    botonBorrar.addEventListener('click', borrarCarrito);
}

document.addEventListener('DOMContentLoaded', actualizar);
