import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdChair, MdBed, MdMenuBook, MdDeck, MdLaptop } from 'react-icons/md';
import { FaCouch } from 'react-icons/fa';
import ProductList from '../components/ProductList';
import { API_URL } from '../config/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/productos`);
        const data = await response.json();
        setProducts(data.slice(0, 4)); // Solo 4 productos destacados
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [products]);

  const handleProductClick = (product) => {
    navigate(`/productos/${product._id}`);
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="ml-home" style={{ animation: 'fadeIn 0.5s' }}>
      <div className="ml-header">
        <h1 className="ml-header-title">Mueblería Hermanos Jota</h1>
        <p className="ml-header-subtitle">La mejor selección de muebles para tu hogar</p>
      </div>
      {products.length > 0 && (
        <section className="ml-banner">
          <div className="ml-banner-wrapper">
            <div className="ml-banner-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {products.map((product) => (
                <div key={product._id} className="ml-banner-slide">
                  <img 
                    src={`${API_URL}/images/${product.imagenUrl}`} 
                    alt={product.nombre}
                  />
                </div>
              ))}
            </div>
            <button 
              className="ml-banner-arrow ml-banner-arrow--left"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + products.length) % products.length)}
            >
              ‹
            </button>
            <button 
              className="ml-banner-arrow ml-banner-arrow--right"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % products.length)}
            >
              ›
            </button>
            <div className="ml-banner-dots">
              {products.map((_, index) => (
                <span
                  key={index}
                  className={`ml-banner-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="ml-container">
        <section className="ml-categories">
          <h2 className="ml-section-title">Categorías</h2>
          <div className="ml-categories-grid">
            <div className="ml-category-card" onClick={() => navigate('/productos?categoria=sofá')}>
              <div className="ml-category-icon"><FaCouch /></div>
              <span>Sofás</span>
            </div>
            <div className="ml-category-card" onClick={() => navigate('/productos?categoria=silla')}>
              <div className="ml-category-icon"><MdChair /></div>
              <span>Sillas</span>
            </div>
            <div className="ml-category-card" onClick={() => navigate('/productos?categoria=cama')}>
              <div className="ml-category-icon"><MdBed /></div>
              <span>Camas</span>
            </div>
            <div className="ml-category-card" onClick={() => navigate('/productos?categoria=biblioteca')}>
              <div className="ml-category-icon"><MdMenuBook /></div>
              <span>Estanterías</span>
            </div>
            <div className="ml-category-card" onClick={() => navigate('/productos?categoria=aparador')}>
              <div className="ml-category-icon"><MdDeck /></div>
              <span>Decoración</span>
            </div>
            <div className="ml-category-card" onClick={() => navigate('/productos?categoria=escritorio')}>
              <div className="ml-category-icon"><MdLaptop /></div>
              <span>Oficina</span>
            </div>
          </div>
        </section>

        <section className="ml-offers">
          <div className="ml-offers-header">
            <h2 className="ml-section-title">Ofertas destacadas</h2>
            <button className="ml-link" onClick={() => navigate('/productos')}>Ver todas →</button>
          </div>
          <div className="ml-products-grid">
            {products.map((product) => (
              <div key={product._id} className="ml-product-card" onClick={() => handleProductClick(product)}>
                <div className="ml-product-image">
                  <img src={`${API_URL}/images/${product.imagenUrl}`} alt={product.nombre} />
                </div>
                <div className="ml-product-info">
                  <p className="ml-product-price">${product.precio.toLocaleString()}</p>
                  <h3 className="ml-product-title">{product.nombre}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
export default Home;