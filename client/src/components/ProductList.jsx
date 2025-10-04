import ProductCard from './ProductCard.jsx';

// Ahora también recibe onProductClick
function ProductList({ products, onProductClick }) {
  return (
    <div className="product-list">
      {products.map(product => (
        // Se la pasamos a cada tarjeta
        <ProductCard 
          key={product.id} 
          product={product} 
          onCardClick={onProductClick} 
        />
      ))}
    </div>
  );
}

export default ProductList;