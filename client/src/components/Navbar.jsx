// client/src/components/Navbar.jsx
import { useState } from 'react';

// Recibimos la prop cartItemCount
function Navbar({ cartItemCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // BORRAMOS la línea: const cartItemCount = 0;
  // Ya no es necesaria, porque el valor viene de las props.

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="main-header">
      <div className="logo-container">
        <img src="/assets/logo.svg" alt="Logo Mueblería Jota" className="logo" />
      </div>
      <nav className="nav-desktop">
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>
      <div className="header-right">
        <div className="carrito">
          🛒 <span id="contador-carrito">{cartItemCount}</span>
        </div>
        <button 
          className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
        >
          <div className="hamburger"></div>
        </button>
      </div>
      <nav className={`nav-mobile ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;