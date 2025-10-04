// client/src/components/ProductCard.jsx

// Recibimos la nueva prop 'onCardClick'
function ProductCard({ product, onCardClick }) {
     const imageUrl = `http://localhost:2000/images/${product.imagen}`
  return (
    // Envolvemos la tarjeta en un div que escucha el evento onClick
    <div className="product-card" onClick={() => onCardClick(product)}>
      <img src={imageUrl} alt={product.nombre} />
      <h3>{product.nombre}</h3>
      <p className="precio">${product.precio}</p>
      {/* El botón ya no hace nada, el clic es en toda la tarjeta */}
      <button className="btn-secondary">Ver detalle</button>
    </div>
  );
}

export default ProductCard;