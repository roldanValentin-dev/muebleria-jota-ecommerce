import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h3 className="footer__section-title">Mueblería Hermanos Jota</h3>
          <p>Diseño, calidad y elegancia en cada pieza para tu hogar.</p>
        </div>
        
        <div className="footer__section">
          <h4 className="footer__section-subtitle">Enlaces Rápidos</h4>
          <ul className="footer__list">
            <li className="footer__list-item"><Link to="/" className="footer__link">Inicio</Link></li>
            <li className="footer__list-item"><Link to="/productos" className="footer__link">Productos</Link></li>
            <li className="footer__list-item"><Link to="/contacto" className="footer__link">Contacto</Link></li>
          </ul>
        </div>
        
        <div className="footer__section">
          <h4 className="footer__section-subtitle">Contacto</h4>
          <p className="footer__text"><MdEmail /> info@muebleriajota.com</p>
          <p className="footer__text"><MdPhone /> +54 11 1234-5678</p>
          <p className="footer__text"><MdLocationOn /> Buenos Aires, Argentina</p>
        </div>
        
        <div className="footer__section">
          <h4 className="footer__section-subtitle">Síguenos</h4>
          <div className="footer__social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="footer__social-link">
              <FaTwitter />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer__social-link">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <p>&copy; 2025 Mueblería Hermanos Jota Inc. Todos los derechos reservados. <img src="/assets/logo.svg" alt="Logo" className="footer__logo" /></p>
      </div>
    </footer>
  );
}

export default Footer;