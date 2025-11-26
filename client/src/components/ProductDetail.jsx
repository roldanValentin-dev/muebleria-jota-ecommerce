import { API_URL } from '../config/api';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

function ProductDetail({ product, onBack, onAddToCart }) {
  const imageUrl = `${API_URL}/images/${product.imagenUrl}`;
  
  return (
    <div className="product-detail">
      <div className="product-detail__section">
        <button onClick={onBack} className="btn btn--secondary">
          <FaArrowLeft /> Volver al catalogo
        </button>
        <img src={imageUrl} alt={product.nombre} className="product-detail__image" />
        <p className="product-detail__meta">Medidas: {product.medidas}</p>
      </div>
      <div className="product-detail__section">
        <h2 className="product-detail__title">{product.nombre}</h2>
        <p className="product-detail__description">{product.descripcion}</p>
        <p className="product-detail__meta">Materiales: {product.materiales}</p>
        <p className="product-detail__meta">Acabado: {product.acabado}</p>
        <p className="product-detail__price">${product.precio}</p>
        <div className="product-detail__actions">
          <button onClick={() => onAddToCart(product)} className="btn btn--primary">
            <FaShoppingCart /> Anadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
