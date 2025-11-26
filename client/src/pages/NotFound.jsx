import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Página no encontrada</h2>
        <p className="not-found-text">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <button onClick={() => navigate('/')} className="btn btn--primary">
          <FaHome /> Volver al Inicio
        </button>
      </div>
    </div>
  );
}

export default NotFound;
