import { API_URL } from '../config/api';

function ProductCard({ product, onCardClick }) {
  const imageUrl = `${API_URL}/images/${product.imagenUrl}`;
  
  return (
    <div className="product-card" onClick={() => onCardClick(product)}>
      <img src={imageUrl} alt={product.nombre} className="product-card__image" />
      <div className="product-card__content">
        <h3 className="product-card__title">{product.nombre}</h3>
        <p className="product-card__price">${product.precio.toLocaleString()}</p>
        <button className="btn btn--secondary">Ver detalle</button>
      </div>
    </div>
  );
}

export default ProductCard;