import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../config/api';
import Swal from 'sweetalert2';

function EditarPerfil() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || ''
  });

  const [passwordData, setPasswordData] = useState({
    passwordActual: '',
    passwordNueva: '',
    confirmarPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    actual: false,
    nueva: false,
    confirmar: false
  });

  const togglePassword = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put('/api/usuario/perfil', formData);
      setUser(response.data);
      
      Swal.fire({
        icon: 'success',
        title: 'Perfil actualizado',
        text: 'Tus datos han sido actualizados exitosamente',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al actualizar perfil',
        confirmButtonColor: '#87a96b'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (passwordData.passwordNueva !== passwordData.confirmarPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        confirmButtonColor: '#87a96b'
      });
      return;
    }

    setLoading(true);

    try {
      await api.put('/api/usuario/cambiar-password', {
        passwordActual: passwordData.passwordActual,
        passwordNueva: passwordData.passwordNueva
      });

      Swal.fire({
        icon: 'success',
        title: 'Contraseña actualizada',
        text: 'Tu sesión se cerrará por seguridad',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        logout();
        navigate('/login');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al cambiar contraseña',
        confirmButtonColor: '#87a96b'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="perfil-container">
      <h1 className="title title--primary text-center">Editar Perfil</h1>

      <div className="perfil-card">
        <h2 className="perfil-section-title">Información Personal</h2>
        <form onSubmit={handleSubmitProfile}>
          <div className="auth-form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              autoComplete="name"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      </div>

      <div className="perfil-card perfil-card--spacing">
        <h2 className="perfil-section-title">Cambiar Contraseña</h2>
        <form onSubmit={handleSubmitPassword}>
          <div className="auth-form-group">
            <label htmlFor="passwordActual">Contraseña Actual</label>
            <div className="password-input-wrapper">
              <input
                type={showPasswords.actual ? "text" : "password"}
                id="passwordActual"
                name="passwordActual"
                autoComplete="current-password"
                value={passwordData.passwordActual}
                onChange={handlePasswordChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePassword('actual')}
                aria-label="Mostrar contraseña"
              >
                {showPasswords.actual ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="auth-form-group">
            <label htmlFor="passwordNueva">Nueva Contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={showPasswords.nueva ? "text" : "password"}
                id="passwordNueva"
                name="passwordNueva"
                autoComplete="new-password"
                value={passwordData.passwordNueva}
                onChange={handlePasswordChange}
                required
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePassword('nueva')}
                aria-label="Mostrar contraseña"
              >
                {showPasswords.nueva ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="auth-form-group">
            <label htmlFor="confirmarPassword">Confirmar Nueva Contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={showPasswords.confirmar ? "text" : "password"}
                id="confirmarPassword"
                name="confirmarPassword"
                autoComplete="new-password"
                value={passwordData.confirmarPassword}
                onChange={handlePasswordChange}
                required
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePassword('confirmar')}
                aria-label="Mostrar contraseña"
              >
                {showPasswords.confirmar ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </button>
        </form>
      </div>

      <div className="perfil-actions-single">
        <button onClick={() => navigate('/perfil')} className="btn btn--secondary">
          Volver al Perfil
        </button>
      </div>
    </div>
  );
}

export default EditarPerfil;
