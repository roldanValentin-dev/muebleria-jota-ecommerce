import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import ProductoDetalle from "./pages/ProductoDetalle";
import Contacto from "./pages/Contacto";
import CrearProducto from './pages/CrearProducto';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
    Swal.fire({
      title: '¡Agregado!',
      text: `"${product.nombre}" fue agregado al carrito`,
      icon: 'success',
      confirmButtonColor: '#87a96b',
      timer: 2000,
      showConfirmButton: false
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout cartItemCount={cart.length} />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<Catalogo />} />
          <Route path="productos/:id" element={<ProductoDetalle onAddToCart={handleAddToCart} />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="admin/crear-producto" element={<CrearProducto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;