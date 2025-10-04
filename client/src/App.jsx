import { useState, useEffect } from 'react';
import ProductList from './components/ProductList.jsx';
import ProductDetail from './components/ProductDetail.jsx'
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ContactForm from './components/ContactForm.jsx';
import './App.css';

function App() {
  // Estados para guardar los productos, la carga y los errores
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  // Efecto para buscar los datos cuando el componente se monta
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Hacemos la petición a la URL de nuestro backend
        // Nota: Si tu backend corre en un puerto diferente, cámbialo aquí.
        const response = await fetch('http://localhost:2000/api/productos');
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue OK');
        }
        const data = await response.json();
        setProducts(data); // Guardamos los productos en el estado
      } catch (error) {
        setError(error.message); // Guardamos el mensaje de error
      } finally {
        setLoading(false); // Dejamos de cargar (con éxito o con error)
      }
    };

    fetchProducts();
  }, []); // El array vacío [] asegura que se ejecute solo una vez


  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };
  const handleAddToCart = (productToAdd) => {
    setCart(prevCart => [...prevCart, productToAdd]);
    alert(`"${productToAdd.nombre}" fue añadido al carrito!`);
  };
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <Navbar cartItemCount={cart.length} />
      <main>
        <h1>Mueblería Jota</h1>
        <h2>Catálogo de Productos</h2>
        {/* --- RENDERIZADO CONDICIONAL --- */}
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={handleBackToList} 
            onAddToCart={handleAddToCart} // <-- ¡Esta es la prop que faltaba!
          />
        ) : (
          // Si no, muestra la lista
          <ProductList products={products} onProductClick={handleProductClick} />
        )}
      </main>
       <ContactForm />
      <Footer />
    </>

  );
}

export default App;
