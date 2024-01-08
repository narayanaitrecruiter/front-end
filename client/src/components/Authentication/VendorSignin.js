import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 

const VendorSignin = ({ onSignin, onToggleSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/signin/vendor', {
        email,
        password,
      });

      const { token } = response.data;
      onSignin({ email, token, role: 'vendor' });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Incorrect email or password');
      } else if (error.response && error.response.status === 404) {
        setError('Vendor does not exist');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signin-container">
      <h2>Vendor Sign In</h2>
      <form>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        {error && <p className="error-message">{error}</p>}
        <button type="button" className="signin" onClick={handleSignin}>
          Sign In
        </button>
      </form>
      <div className="dont-have-account">
        <p>Don't have an account? <a className="register-now" onClick={onToggleSignup}>Register now</a></p>
      </div>
    </div>
  );
};

export default VendorSignin;
