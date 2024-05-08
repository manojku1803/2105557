
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      {/* Render product details */}
    </div>
  );
};

export default ProductCard;