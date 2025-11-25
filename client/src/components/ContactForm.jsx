import { useState } from 'react';
import Swal from 'sweetalert2';

function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¡Mensaje enviado!',
      text: 'Gracias por contactarnos. Te responderemos pronto.',
      icon: 'success',
      confirmButtonColor: '#87a96b'
    });
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="title title--secondary">Envíanos un mensaje</h2>
      
      <div className="form__group">
        <label htmlFor="nombre" className="form__label">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="form__input"
        />
      </div>

      <div className="form__group">
        <label htmlFor="email" className="form__label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form__input"
        />
      </div>

      <div className="form__group">
        <label htmlFor="mensaje" className="form__label">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
          className="form__textarea"
        />
      </div>

      <div className="form__actions">
        <button type="submit" className="btn btn--primary">Enviar mensaje</button>
      </div>
    </form>
  );
}

export default ContactForm;
