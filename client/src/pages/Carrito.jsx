import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api, { API_URL } from '../config/api';
import Swal from 'sweetalert2';

function Carrito() {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [cupon, setCupon] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [codigoCupon, setCodigoCupon] = useState('');
  const [provincia, setProvincia] = useState('');
  const [costoEnvio, setCostoEnvio] = useState(0);
  const [provincias, setProvincias] = useState([]);
  
  useEffect(() => {
    const cargarProvincias = async () => {
      try {
        const response = await api.get('/api/envio');
        setProvincias(response.data);
      } catch (error) {
        console.error('Error al cargar provincias:', error);
      }
    };
    cargarProvincias();
  }, []);
  
  const aplicarCupon = async () => {
    try {
      const response = await api.post('/api/cupones/validar', { codigo: cupon });
      setDescuento(response.data.descuento);
      setCodigoCupon(response.data.codigo);
      Swal.fire({
        icon: 'success',
        title: '¡Cupón aplicado!',
        text: response.data.message,
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Cupón inválido',
        text: error.response?.data?.message || 'El cupón ingresado no es válido',
        timer: 2000,
        showConfirmButton: false
      });
      setDescuento(0);
      setCodigoCupon('');
    }
  };
  
  const calcularEnvio = async () => {
    try {
      const response = await api.post('/api/envio/calcular', { provincia });
      setCostoEnvio(response.data.costo);
      Swal.fire({
        icon: 'info',
        title: 'Envío calculado',
        text: response.data.message,
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al calcular envío',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };
  
  const subtotal = getTotal();
  const montoDescuento = (subtotal * descuento) / 100;
  const totalFinal = subtotal - montoDescuento + costoEnvio;

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout', {
      state: {
        descuento: descuento > 0 ? {
          porcentaje: descuento,
          monto: montoDescuento,
          codigoCupon
        } : null,
        envio: costoEnvio > 0 ? {
          provincia,
          costo: costoEnvio
        } : null
      }
    });
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
              <button 
                onClick={() => updateQuantity(item._id, item.cantidad - 1)}
                className="quantity-btn"
                disabled={item.cantidad <= 1}
              >
                -
              </button>
              <span className="quantity-display">{item.cantidad}</span>
              <button 
                onClick={() => updateQuantity(item._id, item.cantidad + 1)}
                className="quantity-btn"
              >
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
        <div className="cart-summary-section">
          <h3>Cupón de descuento</h3>
          <div className="coupon-input">
            <input 
              type="text" 
              placeholder="Ingresa tu cupón"
              value={cupon}
              onChange={(e) => setCupon(e.target.value)}
            />
            <button onClick={aplicarCupon} className="btn btn--secondary">
              Aplicar
            </button>
          </div>
          <p className="coupon-hint">Prueba: JOTA10, JOTA20, PRIMERACOMPRA, VERANO2025</p>
        </div>
        
        <div className="cart-summary-section">
          <h3>Calcular envío</h3>
          <div className="shipping-input">
            <select 
              value={provincia} 
              onChange={(e) => setProvincia(e.target.value)}
            >
              <option value="">Selecciona tu provincia</option>
              {provincias.map(prov => (
                <option key={prov._id} value={prov.provincia}>{prov.provincia}</option>
              ))}
            </select>
            <button onClick={calcularEnvio} className="btn btn--secondary" disabled={!provincia}>
              Calcular
            </button>
          </div>
        </div>
        
        <div className="cart-totals">
          <div className="cart-total-row">
            <span>Subtotal:</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          {descuento > 0 && (
            <div className="cart-total-row discount">
              <span>Descuento ({descuento}%):</span>
              <span>-${montoDescuento.toLocaleString()}</span>
            </div>
          )}
          {costoEnvio > 0 && (
            <div className="cart-total-row">
              <span>Envío:</span>
              <span>${costoEnvio.toLocaleString()}</span>
            </div>
          )}
          <div className="cart-total-row total">
            <span>Total:</span>
            <span>${totalFinal.toLocaleString()}</span>
          </div>
        </div>
        
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
