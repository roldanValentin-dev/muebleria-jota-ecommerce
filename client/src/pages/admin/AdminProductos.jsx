import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';
import api from '../../config/api';
import Swal from 'sweetalert2';

function AdminProductos() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    categoria: '',
    stock: '',
    imagenUrl: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/admin/productos');
      setProducts(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/api/admin/productos/${editingProduct._id}`, formData);
        Swal.fire({ icon: 'success', title: 'Producto actualizado', timer: 2000, showConfirmButton: false });
      } else {
        await api.post('/api/admin/productos', formData);
        Swal.fire({ icon: 'success', title: 'Producto creado', timer: 2000, showConfirmButton: false });
      }
      fetchProducts();
      closeModal();
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.response?.data?.message });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#87a96b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/admin/productos/${id}`);
        Swal.fire({ icon: 'success', title: 'Producto eliminado', timer: 2000, showConfirmButton: false });
        fetchProducts();
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Error', text: error.response?.data?.message });
      }
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        nombre: product.nombre,
        precio: product.precio,
        descripcion: product.descripcion,
        categoria: product.categoria,
        stock: product.stock,
        imagenUrl: product.imagenUrl
      });
    } else {
      setEditingProduct(null);
      setFormData({ nombre: '', precio: '', descripcion: '', categoria: '', stock: '', imagenUrl: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  if (loading) return <div className="loading">Cargando productos...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="title title--primary">Gestión de Productos</h1>
        <div className="admin-actions">
          <button onClick={() => navigate('/admin')} className="btn btn--secondary">
            <FaArrowLeft /> Volver
          </button>
          <button onClick={() => openModal()} className="btn btn--primary">
            <FaPlus /> Nuevo Producto
          </button>
        </div>
      </div>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td><img src={`${api.defaults.baseURL}/images/${product.imagenUrl}`} alt={product.nombre} className="admin-product-img" /></td>
                <td>{product.nombre}</td>
                <td>${product.precio.toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>{product.categoria}</td>
                <td>
                  <button onClick={() => openModal(product)} className="btn-icon btn-icon--edit"><FaEdit /></button>
                  <button onClick={() => handleDelete(product._id)} className="btn-icon btn-icon--delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label>Nombre</label>
                <input type="text" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
              </div>
              <div className="auth-form-group">
                <label>Precio</label>
                <input type="number" value={formData.precio} onChange={(e) => setFormData({...formData, precio: e.target.value})} required />
              </div>
              <div className="auth-form-group">
                <label>Descripción</label>
                <textarea value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} required />
              </div>
              <div className="auth-form-group">
                <label>Categoría</label>
                <input type="text" value={formData.categoria} onChange={(e) => setFormData({...formData, categoria: e.target.value})} required />
              </div>
              <div className="auth-form-group">
                <label>Stock</label>
                <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
              </div>
              <div className="auth-form-group">
                <label>Imagen URL</label>
                <input type="text" value={formData.imagenUrl} onChange={(e) => setFormData({...formData, imagenUrl: e.target.value})} required />
              </div>
              <div className="modal-form-actions">
                <button type="submit" className="btn btn--primary">Guardar</button>
                <button type="button" onClick={closeModal} className="btn btn--secondary">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProductos;
