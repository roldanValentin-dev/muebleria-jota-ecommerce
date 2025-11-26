import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { API_URL } from '../config/api';
import { FaHeart } from 'react-icons/fa';

function Favoritos() {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleRemove = async (productoId) => {
    await removeFavorite(productoId);
  };

  if (favorites.length === 0) {
    return (
      <div className="container text-center favoritos-empty">
        <FaHeart className="favoritos-empty-icon" />
        <h1 className="title title--primary">No tienes favoritos</h1>
        <p className="favoritos-empty-text">
          Agrega productos a tus favoritos para verlos aquí
        </p>
        <button onClick={() => navigate('/productos')} className="btn btn--primary">
          Ver Productos
        </button>
      </div>
    );
  }

  return (
    <div className="ml-container fadeIn-animation">
      <div className="ml-catalog-header">
        <h2 className="ml-section-title">Mis Favoritos</h2>
        <p className="favoritos-count">{favorites.length} productos</p>
      </div>

      <div className="ml-products-grid">
        {favorites.map((product) => (
          <div key={product._id} className="ml-product-card">
            <button 
              className="favorite-btn active"
              onClick={() => handleRemove(product._id)}
              title="Quitar de favoritos"
            >
              <FaHeart />
            </button>
            <div className="ml-product-image" onClick={() => navigate(`/productos/${product._id}`)}>
              <img src={`${API_URL}/images/${product.imagenUrl}`} alt={product.nombre} />
            </div>
            <div className="ml-product-info">
              <p className="ml-product-price">${product.precio.toLocaleString()}</p>
              <h3 className="ml-product-title">{product.nombre}</h3>
              <button className="btn btn--primary" onClick={() => navigate(`/productos/${product._id}`)}>
                Ver Detalle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favoritos;
