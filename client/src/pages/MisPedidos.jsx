import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

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
              </div>

              <div className="pedido-total">
                <span className="pedido-total-label">Total:</span>
                <span className="pedido-total-amount">
                  ${pedido.total.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MisPedidos;
