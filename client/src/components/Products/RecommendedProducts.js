import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ recommended, onCardClick, user, category }) => {
  return (
    <div className="product-grid-container">
      {!category && <h2>Recommended for You</h2>}
      {category && <h2>{category}</h2>}
      <div className="reccommended-product-container">
        {recommended.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onCardClick={onCardClick}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
