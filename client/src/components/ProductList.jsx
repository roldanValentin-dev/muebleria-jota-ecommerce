import ProductCard from './ProductCard.jsx';

function ProductList({ products, onProductClick }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard 
          key={product._id} 
          product={product} 
          onCardClick={onProductClick} 
        />
      ))}
    </div>
  );
}

export default ProductList;