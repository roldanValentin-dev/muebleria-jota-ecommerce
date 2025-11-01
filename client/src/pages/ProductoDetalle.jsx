import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import { API_URL } from '../config/api';

function ProductoDetalle({onAddToCart}){
    const {id} = useParams();
    const navigate = useNavigate();
    const [product,setProduct] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        window.scrollTo(0, 0);
        const fetchProducto = async ()=>{
            try {
                const response = await fetch(`${API_URL}/api/productos/${id}`);
                if(!response.ok){
                    throw new Error('Producto no encontrado');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };
        fetchProducto();
    },[id]);
    const handleBack = ()=> navigate('/productos');
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Producto no encontrado</div>;

    return(
        <ProductDetail 
        product={product} 
        onBack={handleBack} 
        onAddToCart={onAddToCart} 
        />
    );
}
export default ProductoDetalle;