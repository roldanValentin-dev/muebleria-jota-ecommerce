import {useState,useEffect} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import ProductSkeleton from '../components/ProductSkeleton';
import {API_URL} from '../config/api.js';
import Swal from 'sweetalert2';

function Catalogo(){
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const categoria = searchParams.get('categoria');
    const buscar = searchParams.get('buscar');
    
    // Estados de filtros
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortBy, setSortBy] = useState('recientes');
    const [showFilters, setShowFilters] = useState(false);
    
    const categorias = ['sofá', 'silla', 'cama', 'mesa', 'escritorio', 'biblioteca'];

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
        let filtered = [...products];
        
        // Filtro por categoría desde URL
        if (categoria) {
            filtered = filtered.filter(p => 
                p.nombre.toLowerCase().includes(categoria.toLowerCase())
            );
        }
        
        // Filtro por búsqueda
        if (buscar) {
            filtered = filtered.filter(p => 
                p.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
                p.descripcion?.toLowerCase().includes(buscar.toLowerCase())
            );
        }
        
        // Filtro por categorías seleccionadas
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => 
                selectedCategories.some(cat => 
                    p.nombre.toLowerCase().includes(cat.toLowerCase())
                )
            );
        }
        
        // Filtro por precio
        if (priceMin) {
            filtered = filtered.filter(p => p.precio >= Number(priceMin));
        }
        if (priceMax) {
            filtered = filtered.filter(p => p.precio <= Number(priceMax));
        }
        
        // Ordenamiento
        switch(sortBy) {
            case 'precio-asc':
                filtered.sort((a, b) => a.precio - b.precio);
                break;
            case 'precio-desc':
                filtered.sort((a, b) => b.precio - a.precio);
                break;
            case 'nombre':
                filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'recientes':
            default:
                // Mantener orden original (más recientes primero)
                break;
        }
        
        setFilteredProducts(filtered);
    }, [categoria, buscar, products, selectedCategories, priceMin, priceMax, sortBy]);
    
    const handleCategoryToggle = (cat) => {
        setSelectedCategories(prev => 
            prev.includes(cat) 
                ? prev.filter(c => c !== cat)
                : [...prev, cat]
        );
    };
    
    const clearFilters = () => {
        setPriceMin('');
        setPriceMax('');
        setSelectedCategories([]);
        setSortBy('recientes');
        navigate('/productos');
    };

    const handleProductClick = (product) => {
        navigate(`/productos/${product._id}`);
    };

    const handleFavoriteClick = async (e, productId) => {
        e.stopPropagation();
        if (!user) {
            Swal.fire({
                icon: 'info',
                title: 'Inicia sesión',
                text: 'Debes iniciar sesión para agregar favoritos',
                confirmButtonColor: '#87a96b'
            });
            return;
        }
        
        if (isFavorite(productId)) {
            await removeFavorite(productId);
        } else {
            await addFavorite(productId);
        }
    };

    if (loading) {
        return (
            <div className="ml-container">
                <div className="ml-products-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <ProductSkeleton key={i} />)}
                </div>
            </div>
        );
    }
    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return(
        <div className="ml-container fadeIn-animation">
            <div className="ml-catalog-header">
                <h2 className="ml-section-title">
                    {categoria ? `${categoria.charAt(0).toUpperCase() + categoria.slice(1)}` : 
                     buscar ? `Resultados para "${buscar}"` : 'Catálogo de Productos'}
                </h2>
                <div className="catalog-controls">
                    <button className="btn btn--secondary" onClick={() => setShowFilters(!showFilters)}>
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="catalog-sort">
                        <option value="recientes">Más recientes</option>
                        <option value="precio-asc">Precio: Menor a Mayor</option>
                        <option value="precio-desc">Precio: Mayor a Menor</option>
                        <option value="nombre">Nombre A-Z</option>
                    </select>
                </div>
            </div>
            
            {showFilters && (
                <div className="catalog-filters">
                    <div className="filter-group">
                        <h3>Precio</h3>
                        <div className="filter-price">
                            <input 
                                type="number" 
                                placeholder="Mín" 
                                value={priceMin}
                                onChange={(e) => setPriceMin(e.target.value)}
                            />
                            <span>-</span>
                            <input 
                                type="number" 
                                placeholder="Máx" 
                                value={priceMax}
                                onChange={(e) => setPriceMax(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="filter-group">
                        <h3>Categorías</h3>
                        <div className="filter-categories">
                            {categorias.map(cat => (
                                <label key={cat} className="filter-checkbox">
                                    <input 
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => handleCategoryToggle(cat)}
                                    />
                                    <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    <button className="btn btn--secondary" onClick={clearFilters}>
                        Limpiar Filtros
                    </button>
                </div>
            )}
            
            <div className="catalog-results">
                <p>{filteredProducts.length} productos encontrados</p>
            </div>
            
            <div className="ml-products-grid">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="ml-product-card">
                        {user && (
                            <button 
                                className={`favorite-btn ${isFavorite(product._id) ? 'active' : ''}`}
                                onClick={(e) => handleFavoriteClick(e, product._id)}
                                title={isFavorite(product._id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                            >
                                <FaHeart />
                            </button>
                        )}
                        <div className="ml-product-image">
                            <img src={`${API_URL}/images/${product.imagenUrl}`} alt={product.nombre} />
                        </div>
                        <div className="ml-product-info">
                            <p className="ml-product-price">${product.precio.toLocaleString()}</p>
                            <h3 className="ml-product-title">{product.nombre}</h3>
                            <button className="btn btn--primary" onClick={() => handleProductClick(product)}>
                                Ver Detalle
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Catalogo;