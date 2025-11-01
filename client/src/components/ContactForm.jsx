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
    console.log('Datos del formulario:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return <h3 className="form__success">¡Gracias por tu mensaje! Nos pondremos en contacto pronto.</h3>;
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="title title--secondary">Contacto</h2>
      <div className="form__group">
        <label htmlFor="nombre" className="form__label">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          autoComplete="name"
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
          autoComplete="email"
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
          autoComplete="off"
          required
          className="form__textarea"
        />
      </div>
      <div className="form__actions">
        <button type="submit" className="btn btn--primary">Enviar</button>
      </div>
    </form>
  );
}

export default ContactForm;