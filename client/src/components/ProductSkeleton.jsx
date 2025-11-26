function ProductSkeleton() {
  return (
    <div className="ml-product-card skeleton">
      <div className="skeleton-image"></div>
      <div className="ml-product-info">
        <div className="skeleton-text skeleton-price"></div>
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-title short"></div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
