import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign, FaHome } from 'react-icons/fa';
import api from '../../config/api';

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading">Cargando estadísticas...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="title title--primary">Panel de Administración</h1>
        <button onClick={() => navigate('/')} className="btn btn--secondary">
          <FaHome /> Ir al Home
        </button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon stat-icon--blue">
            <FaBox />
          </div>
          <div className="stat-info">
            <h3>{stats?.totalProducts || 0}</h3>
            <p>Productos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--purple">
            <FaShoppingCart />
          </div>
          <div className="stat-info">
            <h3>{stats?.totalOrders || 0}</h3>
            <p>Pedidos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--green">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>{stats?.totalUsers || 0}</h3>
            <p>Usuarios</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--orange">
            <FaDollarSign />
          </div>
          <div className="stat-info">
            <h3>${stats?.totalRevenue?.toLocaleString() || 0}</h3>
            <p>Ingresos</p>
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <Link to="/admin/productos" className="btn btn--primary">
          Gestionar Productos
        </Link>
        <Link to="/admin/pedidos" className="btn btn--secondary">
          Gestionar Pedidos
        </Link>
      </div>

      <div className="admin-recent">
        <h2 className="title title--secondary">Pedidos Recientes</h2>
        {stats?.recentOrders?.length > 0 ? (
          <div className="recent-orders">
            {stats.recentOrders.map(order => (
              <div key={order._id} className="recent-order-item">
                <div>
                  <strong>#{order._id.slice(-6)}</strong>
                  <p>{order.usuario?.nombre} - {order.usuario?.email}</p>
                </div>
                <div>
                  <span className={`pedido-estado pedido-estado--${order.estado}`}>
                    {order.estado}
                  </span>
                  <p className="recent-order-total">
                    ${order.total.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay pedidos recientes</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
