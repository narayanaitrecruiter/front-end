import React, { useEffect, useState } from 'react';
import './Cart.css';
import Checkout from './Checkout';
import axios from 'axios';

const Cart = ({ checkout, setCheckout, user, onclose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [error, setError] = useState(null);

  const handleCheckout = () => {

    setCheckout(!checkout);
    /*if (cartItems.length === 0 || calculateSubtotal() === 0) {
      setError('Cart is empty');
    } else {
      setCheckout(!checkout);
    }*/
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/orders/cart/all-items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail: user.email }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();
        console.log("cart", data);

        const productDetailsPromises = data.map((item) =>
            fetchProductDetails(item.productId)
        );
        const productDetailsData = await Promise.all(productDetailsPromises);

        const productDetailsMap = {};
        console.log( productDetailsData );

        for (let i = 0; i < productDetailsData.length; i++) {
          const details = productDetailsData[i];
          const productId = data[i].productId;
          productDetailsMap[productId] = details;
        }

        setCartItems(data);
        setProductDetails(productDetailsMap);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [user]);

  const fetchProductDetails = async (productId) => {
    try {
      console.log("singleee", productId);
      const response = await fetch('http://localhost:3001/products/'+productId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const data = await response.json();
      return data;
      //return data.productDetails;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.quantity * (productDetails[item.productId]?.price || 0),
      0
    );
  };

  const shippingCharge = 20.0;
  const totalCost = calculateSubtotal() + shippingCharge;

  const handleDeleteItem = async (productId) => {
    try {
      const response = await axios.post('http://localhost:3001/orders/cart/remove-item', {
          userEmail: user.email, productId: productId
      });

      onclose();

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="fullOrder">
      <div className="cart-container">
        <h2>Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart-message-container">
            <p className="empty-cart-message">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {productDetails[item.productId]?.images &&
                          (
                              <img
                                  src={`http://localhost:3002/uploads/${productDetails[item.productId]?.images[0]?.url}`}
                                  alt={productDetails[item.productId]?.title || ''}
                                  style={{ width: 'auto', height: '10rem' }}
                              />
                          )
                      }

                    </td>
                    <td>{productDetails[item.productId]?.title || ''}</td>
                    <td>
                      {item.quantity}
                    </td>
                    <td>${(productDetails[item.productId]?.price || 0).toFixed(2)}</td>
                    <td>${(item.quantity * (productDetails[item.productId]?.price || 0)).toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleDeleteItem(item.productId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-summary">
              <h3>Summary</h3>
              <p className="summary-headings">Subtotal: </p>
              <p>${calculateSubtotal().toFixed(2)}</p>
              <p className="summary-headings">Shipping Charge:(+) </p>
              <p>${shippingCharge.toFixed(2)}</p>
              <p className="summary-headings">Total: </p>
              <p>${totalCost.toFixed(2)}</p>
              <div className='button-container-cart'>
                <button onClick={onclose} >
                  Cancel
                </button>
                <button onClick={handleCheckout} >
                  {/*disabled={cartItems.length === 0 || calculateSubtotal() === 0}*/}
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {checkout && <Checkout cartItems={cartItems} user={user} totalCost={totalCost} />}
    </div>
  );
};

export default Cart;
