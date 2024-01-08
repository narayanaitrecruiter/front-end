import React, { useState } from 'react';
import './Product.css';
import axios from 'axios';

const truncateText = (text, maxLines = 2) => {
  const lines = text.split('\n').slice(0, maxLines);
  return lines.join('\n') + (lines.length < text.split('\n').length ? '...' : '');
};

const ProductCard = ({ product, onCardClick, user }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const isOutOfStock = () => {
    return product.quantity === 0;
  };

  const handleCardClick = () => {
    if (!isOutOfStock()) {
      onCardClick(product);
    }
  };

  const handleAddToCart = async (event) => {
    event.stopPropagation(); 

    if (user && !isAddingToCart && !isOutOfStock()) {
      try {
        await axios.post('http://localhost:3001/orders/cart/add', {
          userEmail: user.email, 
          productId: product.id,
        });

        setIsAddingToCart(true);
        window.location.reload();
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        setIsAddingToCart(false);
      }
    }
  };

  return (
    <div className={`product-card ${isOutOfStock() ? 'out-of-stock' : ''}`} onClick={handleCardClick}>
      {/*<img*/}
      {/*  src={`http://localhost:3002/uploads/${product.images[0].url}`}*/}
      {/*  alt={product.title}*/}
      {/*  className={isOutOfStock() ? 'out-of-stock-image' : ''}*/}
      {/*/>*/}
      <img src="https://th.bing.com/th/id/OIP.yuIhGQGVmD9pCQd22TKOWAHaHd?rs=1&pid=ImgDetMain" alt={product.title} />
      <div className="product-info">
        <h3>{product.title}</h3>
        {isOutOfStock() ? (
          <p className="out-of-stock-text">Out Of Stock</p>
        ) : (
          <>
            <p>Price: ${product.price}</p>
            <p>{truncateText(product.description)}</p>
            <button onClick={handleAddToCart} disabled={isAddingToCart || isOutOfStock()}>
              {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
