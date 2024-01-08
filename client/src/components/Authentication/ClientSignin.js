import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 

const ClientSignin = ({ onSignin, onToggleSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth//signin/client', {
        email,
        password,
      });

      const { token } = response.data;
      onSignin({ email, token, role: 'client' });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Incorrect email or password');
      } else if (error.response && error.response.status === 404) {
        setError('Client does not exist');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signin-container">
      <h2>Client Sign In</h2>
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
        <div className="dont-have-account">
          <p>
            Don't have an account?{' '}
            <a className="register-now" onClick={onToggleSignup}>
              Register Now
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ClientSignin;
