import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

function Navbar({ cartItemCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?buscar=${searchQuery}`);
      setSearchQuery('');
      closeMenu();
    }
  };

  const toggleMenu = () => { setMenuOpen(!menuOpen); };
  const closeMenu = () => { setMenuOpen(false); };
  
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
    closeMenu();
  };

  return (
    <header className="header">
      <button className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="menu-toggle__icon"></span>
      </button>
      <div className="header__logo">
        <img src="/assets/logo.svg" alt="Logo Muebleria Jota" />
      </div>
      <form className="header__search" onSubmit={handleSearch}>
        <input 
          type="text" 
          id="search-input"
          name="search"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="header__search-input"
        />
        <button type="submit" className="header__search-btn" aria-label="Buscar">
          <FaSearch />
        </button>
      </form>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item"><Link to="/" className="nav__link">Inicio</Link></li>
          <li className="nav__item"><Link to="/productos" className="nav__link">Productos</Link></li>
          {user && (
            <>
              <li className="nav__item"><Link to="/favoritos" className="nav__link">Favoritos</Link></li>
              <li className="nav__item"><Link to="/mis-pedidos" className="nav__link">Mis Pedidos</Link></li>
              {user.rol === 'admin' && (
                <li className="nav__item"><Link to="/admin" className="nav__link nav__link--admin">Panel Admin</Link></li>
              )}
            </>
          )}
          <li className="nav__item"><Link to="/contacto" className="nav__link">Contacto</Link></li>
        </ul>
      </nav>
      <div className="header__actions">
        {user ? (
          <Link to="/perfil" className="header__profile" title="Mi Perfil">
            <FaUser />
          </Link>
        ) : (
          <Link to="/login" className="navbar-login">Iniciar Sesión</Link>
        )}
        <Link to="/carrito" className="header__cart" onClick={closeMenu}>
          <FaShoppingCart />
          <span className="header__cart-count">{cartItemCount}</span>
        </Link>
      </div>
      <nav className={`nav--mobile ${menuOpen ? 'active' : ''}`}>
        <ul className="nav__list">
          <li className="nav__item"><Link to="/" onClick={closeMenu} className="nav__link">Inicio</Link></li>
          <li className="nav__item"><Link to="/productos" onClick={closeMenu} className="nav__link">Productos</Link></li>
          {user && (
            <>
              <li className="nav__item"><Link to="/favoritos" onClick={closeMenu} className="nav__link">Favoritos</Link></li>
              <li className="nav__item"><Link to="/mis-pedidos" onClick={closeMenu} className="nav__link">Mis Pedidos</Link></li>
              {user.rol === 'admin' && (
                <li className="nav__item"><Link to="/admin" onClick={closeMenu} className="nav__link nav__link--admin">Panel Admin</Link></li>
              )}
            </>
          )}
          <li className="nav__item"><Link to="/contacto" onClick={closeMenu} className="nav__link">Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
