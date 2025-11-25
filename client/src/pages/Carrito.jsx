import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config/api';

function Carrito() {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="container text-center cart-empty">
        <h1 className="title title--primary">Tu carrito está vacío</h1>
        <p className="cart-empty-link">
          <Link to="/productos" className="btn btn--primary">Ver productos</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="title title--primary">Carrito de Compras</h1>
      
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img 
              src={`${API_URL}/images/${item.imagenUrl}`} 
              alt={item.nombre} 
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <h3>{item.nombre}</h3>
              <p className="cart-item-price">
                ${item.precio.toLocaleString()}
              </p>
            </div>
            <div className="cart-item-quantity">
              <button onClick={() => updateQuantity(item._id, item.cantidad - 1)}>
                -
              </button>
              <span>{item.cantidad}</span>
              <button onClick={() => updateQuantity(item._id, item.cantidad + 1)}>
                +
              </button>
            </div>
            <p className="cart-item-total">
              ${(item.precio * item.cantidad).toLocaleString()}
            </p>
            <button 
              onClick={() => removeFromCart(item._id)}
              className="cart-item-remove"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: ${getTotal().toLocaleString()}</h2>
        <button 
          onClick={handleCheckout}
          className="btn btn--primary"
        >
          {user ? 'Proceder al Pago' : 'Iniciar Sesión para Comprar'}
        </button>
      </div>
    </div>
  );
}

export default Carrito;
