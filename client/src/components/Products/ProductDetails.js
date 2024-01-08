import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductDetails.css';
import axios from 'axios';

const ProductDetails = ({ product, onClose,user, setSelectedProduct }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleImageClick = (index) => {
    setActiveImageIndex(index);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  const handleResetSelectedProduct = () => {
    setSelectedProduct(null);
  };

  const calculateTotalPrice = () => {
    return quantity * product.price;
  };
  const handleClose = () => {
    setSelectedProduct(null);
  };
  

  const handleAddToCart = async () => {
    if (!isAddingToCart) {
      try {
        await axios.post('http://localhost:3001/orders/cart/add', {
          userEmail: user.email,
          productId: product.id,
          quantity: quantity,
        });
        handleResetSelectedProduct();

        setIsAddingToCart(true);
        window.location.reload()

        onClose();
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        setIsAddingToCart(false);
      }
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    afterChange: (current) => setActiveImageIndex(current),
  };

  return (
    <div className="product-details-container">
      <div className="product-images-carousel">
        <Slider {...sliderSettings}>
          {product?.images && product.images.map((image, index) => (
            <div key={index} onClick={() => handleImageClick(index)}>
              <img
                src={`http://localhost:3002/uploads/${image.url}`}
                alt={`Product Image ${index + 1}`}
                className={index === activeImageIndex ? 'active' : ''}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="product-details">
        <h2>{product.title}</h2>
        <div className="info-box">
          <p className="category">Category: {product.category}</p>
        </div>
        <div className="info-box">
          <p className="price">Price: ${product.price} per unit</p>
        </div>
        <div className="quantity-selection">
          <div className="info-box">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-box">
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-label">{quantity}</span>
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="info-box">
            <p className="total-price">Total Price: ${calculateTotalPrice()}</p>
          </div>
        </div>
        <div className="buttons-container">
          <button className="button button-primary" onClick={handleAddToCart} disabled={isAddingToCart}>
            {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
          </button>
          <button onClick={handleClose} className="button button-secondary">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
