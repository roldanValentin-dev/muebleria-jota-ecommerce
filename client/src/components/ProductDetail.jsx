import { API_URL } from '../config/api';
import { FaShoppingCart, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ProductDetail({ product, onBack, onAddToCart }) {
  const navigate = useNavigate();
  const imageUrl = `${API_URL}/images/${product.imagenUrl}`;

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar "${product.nombre}"? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a0522d',
      cancelButtonColor: '#87a96b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/api/productos/${product._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      await Swal.fire({
        title: '¡Eliminado!',
        text: 'Producto eliminado exitosamente',
        icon: 'success',
        confirmButtonColor: '#87a96b'
      });
      navigate('/productos');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#a0522d'
      });
    }
  };
  
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
          <button onClick={handleDelete} className="btn btn--danger">
            <FaTrash /> Eliminar producto
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
