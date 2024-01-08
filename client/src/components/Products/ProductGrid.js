import React from 'react';
import ProductCard from './ProductCard';
import './Product.css';

const ProductGrid = ({ products, onCardClick, user, category }) => {
    console.log( "products", products )
  return (
    <div className="product-grid-container">
      {!category && <h2>All Products</h2>}
      {category && <h2>{category}</h2>}
      <div className="product-cards-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
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
