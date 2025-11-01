import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Navbar({ cartItemCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => { setMenuOpen(!menuOpen); };
  const closeMenu = () => { setMenuOpen(false); };

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
          <li className="nav__item"><Link to="/admin/crear-producto" className="nav__link">Admin</Link></li>
        </ul>
      </nav>
      <div className="header__actions">
        <div className="header__cart">
          <FaShoppingCart />
          <span className="header__cart-count">{cartItemCount}</span>
        </div>
      </div>
      <nav className={`nav--mobile ${menuOpen ? 'active' : ''}`}>
        <ul className="nav__list">
          <li className="nav__item"><Link to="/" onClick={closeMenu} className="nav__link">Inicio</Link></li>
          <li className="nav__item"><Link to="/productos" onClick={closeMenu} className="nav__link">Productos</Link></li>
          <li className="nav__item"><Link to="/contacto" onClick={closeMenu} className="nav__link">Contacto</Link></li>
          <li className="nav__item"><Link to="/admin/crear-producto" onClick={closeMenu} className="nav__link">Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;