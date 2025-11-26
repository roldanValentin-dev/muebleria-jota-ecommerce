import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import Swal from 'sweetalert2';

function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  
  const descuento = location.state?.descuento;
  const envio = location.state?.envio;
  
  const subtotal = getTotal();
  const montoDescuento = descuento?.monto || 0;
  const costoEnvio = envio?.costo || 0;
  const totalFinal = subtotal - montoDescuento + costoEnvio;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConfirmOrder = async () => {
    setLoading(true);

    try {
      const productos = cart.map(item => ({
        producto: item._id,
        cantidad: item.cantidad
      }));

      await api.post('/api/orders', { 
        productos,
        descuento,
        envio
      });

      clearCart();

      Swal.fire({
        title: '¡Pedido realizado!',
        text: 'Tu pedido ha sido procesado exitosamente',
        icon: 'success',
        confirmButtonColor: '#87a96b'
      });

      navigate('/');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Error al procesar el pedido',
        icon: 'error',
        confirmButtonColor: '#87a96b'
      });
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/carrito');
    return null;
  }

  return (
    <div className="checkout-container fadeIn-animation">
      <h1 className="title title--primary">Confirmar Pedido</h1>

      <div className="checkout-summary">
        <h2>Resumen del Pedido</h2>
        {cart.map((item) => (
          <div key={item._id} className="checkout-item">
            <span>{item.nombre} x {item.cantidad}</span>
            <span>
              ${(item.precio * item.cantidad).toLocaleString()}
            </span>
          </div>
        ))}
        
        <div className="checkout-totals">
          <div className="checkout-item">
            <span>Subtotal:</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          {descuento && (
            <div className="checkout-item pedido-descuento">
              <span>Descuento ({descuento.porcentaje}% - {descuento.codigoCupon}):</span>
              <span>-${montoDescuento.toLocaleString()}</span>
            </div>
          )}
          {envio && (
            <div className="checkout-item">
              <span>Envío ({envio.provincia}):</span>
              <span>${costoEnvio.toLocaleString()}</span>
            </div>
          )}
        </div>
        
        <div className="checkout-total">
          <span>Total:</span>
          <span className="checkout-total-amount">${totalFinal.toLocaleString()}</span>
        </div>
      </div>

      <div className="checkout-actions">
        <button 
          onClick={() => navigate('/carrito')}
          className="btn-secondary"
        >
          Volver al Carrito
        </button>
        <button 
          onClick={handleConfirmOrder}
          disabled={loading}
          className="btn btn--primary"
        >
          {loading ? 'Procesando...' : 'Confirmar Pedido'}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
