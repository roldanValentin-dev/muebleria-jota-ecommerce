import {useState,useEffect} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList.jsx';
import {API_URL} from '../config/api.js';

function Catalogo(){
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const categoria = searchParams.get('categoria');

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

    useEffect(() => {
        if (categoria) {
            const filtered = products.filter(p => 
                p.nombre.toLowerCase().includes(categoria.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [categoria, products]);
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
            <h2 className="title title--secondary text-center">
                {categoria ? `${categoria.charAt(0).toUpperCase() + categoria.slice(1)}` : 'Catálogo de Productos'}
            </h2>
            {categoria && (
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <button className="btn btn--secondary" onClick={() => navigate('/productos')}>
                        Ver todos los productos
                    </button>
                </div>
            )}
            <ProductList products={filteredProducts} onProductClick={handleProductClick} />
        </div>
    );
}
export default Catalogo;