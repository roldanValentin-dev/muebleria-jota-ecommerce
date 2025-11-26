import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import Swal from 'sweetalert2';

function MisPedidos() {
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await api.get('/api/orders');
        setPedidos(res.data);
      } catch (error) {
        console.error('Error al cargar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPedidos();
    }
  }, [token]);

  const handleCancelarPedido = async (pedidoId) => {
    const result = await Swal.fire({
      title: '¿Cancelar pedido?',
      text: 'Esta acción devolverá el stock de los productos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#87a96b',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No'
    });

    if (result.isConfirmed) {
      try {
        await api.patch(`/api/orders/${pedidoId}/cancelar`);
        
        // Actualizar lista de pedidos
        setPedidos(pedidos.map(p => 
          p._id === pedidoId ? { ...p, estado: 'cancelado' } : p
        ));

        Swal.fire({
          icon: 'success',
          title: 'Pedido cancelado',
          text: 'El pedido ha sido cancelado exitosamente',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Error al cancelar el pedido',
          confirmButtonColor: '#87a96b'
        });
      }
    }
  };

  const handleEliminarPedido = async (pedidoId) => {
    const result = await Swal.fire({
      title: '¿Eliminar pedido?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#87a96b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/orders/${pedidoId}`);
        
        // Remover de la lista
        setPedidos(pedidos.filter(p => p._id !== pedidoId));

        Swal.fire({
          icon: 'success',
          title: 'Pedido eliminado',
          text: 'El pedido ha sido eliminado exitosamente',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Error al eliminar el pedido',
          confirmButtonColor: '#87a96b'
        });
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando pedidos</div>;
  }

  return (
    <div className="pedidos-container">
      <h1 className="title title--primary text-center">Mis Pedidos</h1>

      {pedidos.length === 0 ? (
        <div className="pedidos-empty">
          <p>No tienes pedidos aún</p>
        </div>
      ) : (
        <div className="pedidos-list">
          {pedidos.map((pedido) => (
            <div key={pedido._id} className="pedido-card">
              <div className="pedido-header">
                <div className="pedido-info">
                  <h3 className="pedido-id">Pedido #{pedido._id.slice(-6)}</h3>
                  <p className="pedido-fecha">
                    {new Date(pedido.createdAt).toLocaleDateString('es-AR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="pedido-estado-container">
                  <span className={`pedido-estado pedido-estado--${pedido.estado}`}>
                    {pedido.estado}
                  </span>
                </div>
              </div>

              <div className="pedido-productos">
                {pedido.productos.map((item, index) => (
                  <div key={index} className="pedido-producto-item">
                    <span>{item.nombre} x {item.cantidad}</span>
                    <span className="pedido-producto-precio">
                      ${(item.precio * item.cantidad).toLocaleString()}
                    </span>
                  </div>
                ))}
                
                <div className="pedido-producto-item pedido-subtotal">
                  <span>Subtotal:</span>
                  <span>${pedido.subtotal?.toLocaleString() || pedido.total.toLocaleString()}</span>
                </div>
                
                {pedido.descuento?.monto > 0 && (
                  <div className="pedido-producto-item pedido-descuento">
                    <span>Descuento ({pedido.descuento.porcentaje}% - {pedido.descuento.codigoCupon}):</span>
                    <span>-${pedido.descuento.monto.toLocaleString()}</span>
                  </div>
                )}
                
                {pedido.envio?.costo > 0 && (
                  <div className="pedido-producto-item">
                    <span>Envío ({pedido.envio.provincia}):</span>
                    <span>${pedido.envio.costo.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="pedido-total">
                <span className="pedido-total-label">Total:</span>
                <span className="pedido-total-amount">
                  ${pedido.total.toLocaleString()}
                </span>
              </div>

              {pedido.estado === 'cancelado' ? (
                <div className="perfil-actions-single">
                  <button 
                    onClick={() => handleEliminarPedido(pedido._id)}
                    className="btn btn--danger"
                  >
                    Eliminar Pedido
                  </button>
                </div>
              ) : pedido.estado !== 'completado' && (
                <div className="perfil-actions-single">
                  <button 
                    onClick={() => handleCancelarPedido(pedido._id)}
                    className="btn btn--danger"
                  >
                    Cancelar Pedido
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MisPedidos;
