import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(nombre, email, password);
      Swal.fire({
        title: '¡Registro exitoso!',
        text: 'Tu cuenta ha sido creada',
        icon: 'success',
        confirmButtonColor: '#87a96b',
        timer: 2000,
        showConfirmButton: false
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Error al registrar usuario',
        icon: 'error',
        confirmButtonColor: '#87a96b'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="title title--primary text-center">Registrarse</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="auth-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>
      </form>
      <p className="auth-link">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Register;
