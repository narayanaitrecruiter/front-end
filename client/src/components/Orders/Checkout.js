import React, { useState } from 'react';
import axios from 'axios';
import './Checkout.css';

const Checkout = ({ user, cartItems, totalCost }) => {
  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');

  const [apartment, setApartment] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOrderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const paymentId = `${Date.now()}_${user.email}`;

    const orderData = {
      userEmail: user.email,
      items: cartItems.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      totalAmount: totalCost,
      paymentId: paymentId,
    };

    try {

      if (paymentMethod === 'paypal') {
        const paymentData = {
          userEmail: user.email,
          paymentId: paymentId,
          amount: totalCost,
        };

        const paymentResponse = await axios.post('http://localhost:3004/api/payment/create-payment', paymentData);

        console.log('Payment approved');
        console.log(paymentResponse.data.approvalUrl);
        window.location.href = paymentResponse.data.approvalUrl;


      }

      const orderResponse = await axios.post('http://localhost:3001/orders/create', orderData);
      console.log(orderResponse)
      const inventoryResponse = await axios.put('http://localhost:3002/products/decreaseQuantity', orderData);
      console.log(inventoryResponse)

      
    if (paymentMethod === 'cashOnDelivery') {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }

      



      setOrderSuccess(true);
      setTimeout(() => {
        setOrderSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error creating order or processing payment:', error);
      setError(error.message || 'Error processing order/payment');
    }
  };
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="payment-section">
        <label>Payment Method</label>
        <div className="payment-options">
          <div className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={() => handlePaymentMethodChange('paypal')}
            />
            <label htmlFor="card">Paypal</label>
          </div>
          <div className={`payment-option ${paymentMethod === 'cashOnDelivery' ? 'selected' : ''}`}>
            <input
              type="radio"
              id="cashOnDelivery"
              name="paymentMethod"
              value="cashOnDelivery"
              checked={paymentMethod === 'cashOnDelivery'}
              onChange={() => handlePaymentMethodChange('cashOnDelivery')}
            />
            <label htmlFor="cashOnDelivery">Cash on Delivery</label>
          </div>
        </div>
      </div>
      <div className="address-section">
        <label class="sec-label">Shipping Address</label>
        <div className="form-group">
          <label htmlFor="apartment">Apartment</label>
          <input type="text" id="apartment" name="apartment" value={apartment} onChange={(e) => setApartment(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="streetNumber">Street Number</label>
          <input type="text" id="streetNumber" name="streetNumber" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input type="text" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input type="text" id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="zipcode">Zipcode</label>
          <input type="text" id="zipcode" name="zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" onClick={handleSubmit}>
        Complete Order
      </button>
      {isOrderSuccess && (
        <div className="order-success-notification">
          <p>Order Successful!</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
