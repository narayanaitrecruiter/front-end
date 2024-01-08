import React from 'react';
import './Product.css';

const ManageProductCard = ({ product, onEditClick, user }) => {
  return (
    <div className="product-card">
        {/*{product?.images[0] &&*/}
        {/*    <img src={`http://localhost:3002/uploads/${product.images[0].url}`} alt={product.title} />*/}
        {/*}*/}

      <img src="https://th.bing.com/th/id/OIP.yuIhGQGVmD9pCQd22TKOWAHaHd?rs=1&pid=ImgDetMain" alt={product.title} />
      <div className="product-info">
        <h3>{product.title}</h3>
        <p>Price: ${product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <button onClick={() => onEditClick(product)}>Edit Product</button>
      </div>
    </div>
  );
};

export default ManageProductCard;
