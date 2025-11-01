import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/api';
import { MdAdd, MdCancel } from 'react-icons/md';
import { FaBox, FaDollarSign, FaWarehouse, FaImage, FaRuler, FaTools, FaPaintBrush, FaWeight, FaBoxOpen } from 'react-icons/fa';
import Swal from 'sweetalert2';

function CrearProducto() {
  const navigate = useNavigate();
  
  // Estado inicial con todos los campos del producto
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagenUrl: '',
    medidas: '',
    materiales: '',
    acabado: '',
    peso: '',
    capacidad: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          precio: Number(formData.precio),
          stock: Number(formData.stock)
        })
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }

      const newProduct = await response.json();
      await Swal.fire({
        title: '¡Éxito!',
        text: `Producto "${newProduct.nombre}" creado exitosamente`,
        icon: 'success',
        confirmButtonColor: '#87a96b'
      });
      navigate('/productos');
    } catch (error) {
      setError(error.message);
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#a0522d'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title title--primary text-center"><MdAdd /> Crear Nuevo Producto</h1>
      
      {error && <div className="form__error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form__row">
          <div className="form__group">
            <label htmlFor="nombre" className="form__label"><FaBox /> Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ej: Mesa de Centro Araucaria"
              className="form__input"
            />
          </div>

          <div className="form__group">
            <label htmlFor="precio" className="form__label"><FaDollarSign /> Precio *</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
              min="0"
              placeholder="Ej: 41000"
              className="form__input"
            />
          </div>
        </div>

        <div className="form__row">
          <div className="form__group">
            <label htmlFor="stock" className="form__label"><FaWarehouse /> Stock *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="Ej: 10"
              className="form__input"
            />
          </div>

          <div className="form__group">
            <label htmlFor="imagenUrl" className="form__label"><FaImage /> Imagen URL</label>
            <input
              type="text"
              id="imagenUrl"
              name="imagenUrl"
              value={formData.imagenUrl}
              onChange={handleChange}
              placeholder="Ej: mesa-centro.png"
              className="form__input"
            />
          </div>
        </div>

        <div className="form__group">
          <label htmlFor="descripcion" className="form__label">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="4"
            placeholder="Descripción detallada del producto..."
            className="form__textarea"
          />
        </div>

        <div className="form__row">
          <div className="form__group">
            <label htmlFor="medidas" className="form__label"><FaRuler /> Medidas</label>
            <input
              type="text"
              id="medidas"
              name="medidas"
              value={formData.medidas}
              onChange={handleChange}
              placeholder="Ej: 90 × 90 × 45 cm"
              className="form__input"
            />
          </div>

          <div className="form__group">
            <label htmlFor="materiales" className="form__label"><FaTools /> Materiales</label>
            <input
              type="text"
              id="materiales"
              name="materiales"
              value={formData.materiales}
              onChange={handleChange}
              placeholder="Ej: Mármol, Nogal"
              className="form__input"
            />
          </div>
        </div>

        <div className="form__row">
          <div className="form__group">
            <label htmlFor="acabado" className="form__label"><FaPaintBrush /> Acabado</label>
            <input
              type="text"
              id="acabado"
              name="acabado"
              value={formData.acabado}
              onChange={handleChange}
              placeholder="Ej: Mármol pulido"
              className="form__input"
            />
          </div>

          <div className="form__group">
            <label htmlFor="peso" className="form__label"><FaWeight /> Peso</label>
            <input
              type="text"
              id="peso"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              placeholder="Ej: 42 kg"
              className="form__input"
            />
          </div>
        </div>

        <div className="form__group">
          <label htmlFor="capacidad" className="form__label"><FaBoxOpen /> Capacidad</label>
          <input
            type="text"
            id="capacidad"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleChange}
            placeholder="Ej: 25 kg distribuidos"
            className="form__input"
          />
        </div>

        <div className="form__actions">
          <button type="button" onClick={() => navigate('/productos')} className="btn btn--cancel">
            <MdCancel /> Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn btn--primary">
            <MdAdd /> {loading ? 'Creando...' : 'Crear Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearProducto;