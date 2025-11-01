import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList.jsx';
import {API_URL} from '../config/api.js';

function Catalogo(){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchProductos = async()=>{
            try {
                const response = await fetch(`${API_URL}/api/productos`);
                if (!response.ok) {
                    throw new Error('Error al cargar productos');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };
        fetchProductos();
    },[]);
    const handleProductClick = (product) => {
        navigate(`/productos/${product._id}`);
    };
    if (loading) {
        return <div>Cargando...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return(
        <div className="container">
            <h1 className="title title--primary text-center">Muebleria Hermanos Jota</h1>
            <h2 className="title title--secondary text-center">Catalogo de Productos</h2>
            <ProductList products={products} onProductClick={handleProductClick} />
        </div>
    );
}
export default Catalogo;