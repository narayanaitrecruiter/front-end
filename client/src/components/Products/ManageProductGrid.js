import React from 'react';
import ManageProductCard from './ManageProductCard';
import './Product.css';

const ManageProductGrid = ({ managables, onEditClick, user, category }) => {
    console.log("help me", managables);
  return (
    <div className="product-grid-container">
      {!category && <h2>Your Products</h2>}
      {category && <h2>{category}</h2>}
      <div className="product-cards-container">
        {managables?.map((product) => (
          <ManageProductCard
            key={product.id}
            product={product}
            onEditClick={onEditClick}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageProductGrid;
