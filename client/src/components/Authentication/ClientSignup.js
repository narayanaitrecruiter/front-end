import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

const ClientSignup = ({ onSignup, onToggleSignin, }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [formErrors, setFormErrors] = useState({
    passwordMismatch: false,
    emailDuplicate: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormErrors({
      passwordMismatch: false,
      emailDuplicate: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, password, confirmPassword, email } = formData;

    try {
      if (password !== confirmPassword) {
        setFormErrors({ passwordMismatch: true, emailDuplicate: false });
        return;
      } else {
        setFormErrors({ passwordMismatch: false, emailDuplicate: false });
      }

      const response = await axios.post('http://localhost:3001/api/auth/signup/client', {
        fullname: `${firstName} ${lastName}`,
        password,
        email,
      });
      console.log( response );

      if (response.status === 200) {
        const userData = response.data;
        onSignup(userData.client);
      } else {
        console.error('Client Signup failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setFormErrors({ passwordMismatch: false, emailDuplicate: true });
      } else {
        console.error('Error during client signup:', error);
      }
    }
  };

  return (
    <div className="container">
      <div className="inner">
        <div className="box1">
          <h1>Welcome to our community</h1>
          <div className="suggestion">
            <h3>Already have an account?</h3>
            <a className="login-now" onClick={onToggleSignin}>Login now</a>
          </div>

        </div>
        <div className="box2">
          <form onSubmit={handleSubmit}>
            <h2>Client Sign Up</h2>
            {formErrors.passwordMismatch && <span className="error-message">Passwords do not match</span>}
            {formErrors.emailDuplicate && <span className="error-message">Email must be unique</span>}
            <label>
              First Name:
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </label>
            <label>
              Last Name:
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Password:
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <label>
              Confirm Password:
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </label>
            <button type="submit" className="signup" onClick={handleSubmit}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientSignup;
