import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';

function Navbar({ cartItemCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => { setMenuOpen(!menuOpen); };
  const closeMenu = () => { setMenuOpen(false); };
  
  const handleLogout = () => {
    logout();
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
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item"><Link to="/" className="nav__link">Inicio</Link></li>
          <li className="nav__item"><Link to="/productos" className="nav__link">Productos</Link></li>
          <li className="nav__item"><Link to="/contacto" className="nav__link">Contacto</Link></li>
          {user && (
            <>
              <li className="nav__item"><Link to="/perfil" className="nav__link">Perfil</Link></li>
              <li className="nav__item"><Link to="/mis-pedidos" className="nav__link">Mis Pedidos</Link></li>
            </>
          )}
        </ul>
      </nav>
      <div className="header__actions">
        {user ? (
          <div className="navbar-auth">
            <span className="navbar-user">
              <FaUser /> {user.nombre}
            </span>
            <button onClick={handleLogout} className="navbar-logout">
              Salir
            </button>
          </div>
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
          <li className="nav__item"><Link to="/contacto" onClick={closeMenu} className="nav__link">Contacto</Link></li>
          {user && (
            <>
              <li className="nav__item"><Link to="/perfil" onClick={closeMenu} className="nav__link">Perfil</Link></li>
              <li className="nav__item"><Link to="/mis-pedidos" onClick={closeMenu} className="nav__link">Mis Pedidos</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
