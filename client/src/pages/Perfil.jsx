import { useAuth } from '../context/AuthContext';

function Perfil() {
  const { user } = useAuth();

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
    </div>
  );
}

export default Perfil;
