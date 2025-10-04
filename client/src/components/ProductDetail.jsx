// Recibe el producto seleccionado y la función para volver
function ProductDetail({ product, onBack, onAddToCart }) {
    const imageUrl = `http://localhost:2000/images/${product.imagen}`;
    return (
        <div className="product-detail">
            <article>
                <div>
                    <button onClick={onBack} className="btn-volver">{"<= Volver al catálogo"}</button>
                </div>
                <img src={imageUrl} alt={product.nombre} />
                <p className="descripcion-">Medidas: {product.medidas}</p>

            </article>
            <article>
                <h2 className="h2-detail">{product.nombre}</h2>
                <p className="descripcion">{product.descripcion}</p>
                <p className="descripcion">Materiales: {product.materiales}</p>
                <p className="descripcion">Acabado: {product.acabado}</p>
                <p className="precio-detail">${product.precio}</p>

                <button
                    onClick={() => onAddToCart(product)}
                    className="btn-carrito"
                >Añadir al carrito</button>
            </article>




        </div>
    );
}

export default ProductDetail;