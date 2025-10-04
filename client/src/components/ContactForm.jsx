// client/src/components/ContactForm.jsx


// esta parte la hice con IA por que no tenia idea de como hacerlo xD

import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData); // Requisito: console.log
    setSubmitted(true);
  };

  if (submitted) {
    return <h3 className="form-success">¡Gracias por tu mensaje! Nos pondremos en contacto pronto.</h3>;
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Contacto</h2>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input 
          type="text" 
          id="nombre"
          name="nombre" 
          value={formData.nombre}
          onChange={handleChange}
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email"
          name="email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea 
          id="mensaje"
          name="mensaje" 
          value={formData.mensaje}
          onChange={handleChange}
          required 
        />
      </div>
      <button type="submit" className="btn-secondary">Enviar</button>
    </form>
  );
}

export default ContactForm;