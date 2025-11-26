import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../config/api';
import Swal from 'sweetalert2';

function AdminPedidos() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/admin/pedidos');
      setOrders(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`/api/admin/pedidos/${orderId}/estado`, { estado: newStatus });
      Swal.fire({ icon: 'success', title: 'Estado actualizado', timer: 2000, showConfirmButton: false });
      fetchOrders();
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.response?.data?.message });
    }
  };

  if (loading) return <div className="loading">Cargando pedidos...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="title title--primary">Gestión de Pedidos</h1>
        <button onClick={() => navigate('/admin')} className="btn btn--secondary">
          <FaArrowLeft /> Volver
        </button>
      </div>

      <div className="pedidos-list">
        {orders.map(order => (
          <div key={order._id} className="pedido-card">
            <div className="pedido-header">
              <div className="pedido-info">
                <h3 className="pedido-id">Pedido #{order._id.slice(-6)}</h3>
                <p className="pedido-fecha">
                  {new Date(order.createdAt).toLocaleDateString('es-AR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p><strong>Cliente:</strong> {order.usuario?.nombre} ({order.usuario?.email})</p>
              </div>
              <div className="pedido-estado-container">
                <select
                  value={order.estado}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="admin-select"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="procesando">Procesando</option>
                  <option value="completado">Completado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>

            <div className="pedido-productos">
              {order.productos.map((item, index) => (
                <div key={index} className="pedido-producto-item">
                  <span>{item.nombre} x {item.cantidad}</span>
                  <span className="pedido-producto-precio">
                    ${(item.precio * item.cantidad).toLocaleString()}
                  </span>
                </div>
              ))}
              
              <div className="pedido-producto-item pedido-subtotal">
                <span>Subtotal:</span>
                <span>${order.subtotal?.toLocaleString() || order.total.toLocaleString()}</span>
              </div>
              
              {order.descuento?.monto > 0 && (
                <div className="pedido-producto-item pedido-descuento">
                  <span>Descuento ({order.descuento.porcentaje}% - {order.descuento.codigoCupon}):</span>
                  <span>-${order.descuento.monto.toLocaleString()}</span>
                </div>
              )}
              
              {order.envio?.costo > 0 && (
                <div className="pedido-producto-item">
                  <span>Envío ({order.envio.provincia}):</span>
                  <span>${order.envio.costo.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="pedido-total">
              <span className="pedido-total-label">Total:</span>
              <span className="pedido-total-amount">
                ${order.total.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPedidos;
