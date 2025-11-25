import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from 'react-icons/md';
import ContactForm from '../components/ContactForm';

function Contacto() {
  return (
    <>
      <div className="container" style={{ animation: 'fadeIn 0.5s' }}>
        <div className="contact">
          <div className="contact__info">
            <h1 className="title title--primary">Contáctanos</h1>
            <p style={{ marginBottom: '2rem' }}>Estamos aquí para ayudarte. Si tienes alguna pregunta sobre nuestros productos, envíos o cualquier otra consulta, no dudes en contactarnos.</p>

            <div className="contact__item">
              <h3 className="contact__item-title"><MdLocationOn /> Dirección</h3>
              <p className="contact__item-text">Av. San Juan 2847<br />C1232AAB — Barrio de San Cristóbal<br /> Ciudad Autónoma de Buenos Aires <br />Argentina</p>
            </div>

            <div className="contact__item">
              <h3 className="contact__item-title"><MdPhone /> Teléfono</h3>
              <p className="contact__item-text">+54 11 4567-8900</p>
            </div>

            <div className="contact__item">
              <h3 className="contact__item-title"><MdEmail /> Email</h3>
              <p className="contact__item-text">info@muebleriajota.com<br />ventas@muebleriajota.com</p>
            </div>

            <div className="contact__item">
              <h3 className="contact__item-title"><MdAccessTime /> Horarios de Atención</h3>
              <p className="contact__item-text">Lunes a Viernes: 10:00 - 19:00 hs<br />Sábados: 10:00 - 14:00 hs<br />Domingos: Cerrado</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default Contacto;