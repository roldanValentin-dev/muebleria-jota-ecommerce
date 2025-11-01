import { API_URL } from '../config/api';

function ProductCard({ product, onCardClick }) {
  const imageUrl = `${API_URL}/images/${product.imagenUrl}`;
  
  return (
    <div className="product-card" onClick={() => onCardClick(product)}>
      <img src={imageUrl} alt={product.nombre} className="product-card__image" />
      <h3 className="product-card__title">{product.nombre}</h3>
      <p className="product-card__price">${product.precio}</p>
      <button className="btn btn--secondary">Ver detalle</button>
    </div>
  );
}

export default ProductCard;