import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import ProductoDetalle from "./pages/ProductoDetalle";
import Contacto from "./pages/Contacto";
import CrearProducto from './pages/CrearProducto';
import Login from './pages/Login';
import Register from './pages/Register';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import Perfil from './pages/Perfil';
import MisPedidos from './pages/MisPedidos';
import ProtectedRoute from './components/ProtectedRoute';
import { useCart } from './context/CartContext';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<Catalogo />} />
          <Route path="productos/:id" element={<ProductoDetalle onAddToCart={handleAddToCart} />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="perfil" element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          } />
          <Route path="mis-pedidos" element={
            <ProtectedRoute>
              <MisPedidos />
            </ProtectedRoute>
          } />
          <Route path="checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="admin/crear-producto" element={<CrearProducto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
