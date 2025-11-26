import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Cerrando sesión...',
      text: 'Hasta pronto!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      logout();
      navigate('/');
      window.location.reload();
    });
  };

  return (
    <div className="perfil-container">
      <h1 className="title title--primary text-center">Mi Perfil</h1>
      
      <div className="perfil-card">
        <div className="perfil-item">
          <h3 className="perfil-item-title">Nombre</h3>
          <p className="perfil-item-text">{user?.nombre}</p>
        </div>

        <div className="perfil-item">
          <h3 className="perfil-item-title">Email</h3>
          <p className="perfil-item-text">{user?.email}</p>
        </div>

        <div className="perfil-item">
          <h3 className="perfil-item-title">Miembro desde</h3>
          <p className="perfil-item-text">
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-AR') : 'N/A'}
          </p>
        </div>
      </div>

      <div className="perfil-actions">
        <button onClick={() => navigate('/editar-perfil')} className="btn btn--primary">
          <FaEdit /> Editar Perfil
        </button>
        <button onClick={handleLogout} className="btn btn--secondary">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Perfil;
