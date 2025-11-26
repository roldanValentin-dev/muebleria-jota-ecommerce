import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.rol !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;
