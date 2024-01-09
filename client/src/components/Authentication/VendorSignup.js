import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

const VendorSignup = ({ onSignup, onToggleSignin, }) => {
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', 'Cote d Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
  ];

  const [formData, setFormData] = useState({
    fullname: '',
    password: '',
    confirmPassword: '',
    email: '',
    shopName: '',
    shopCountry: 'Select', 
  });

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (value === 'Select') {
      setFilteredCountries([]);
    } else {
      const filtered = countries.filter((country) => country.toLowerCase().startsWith(value.toLowerCase()));
      setFilteredCountries(filtered);
    }
  };

  const handleSelect = (country) => {
    setFormData((prevData) => ({
      ...prevData,
      shopCountry: country,
    }));
    setShowOptions(false);
    setError('');
  };

  const handleFocus = () => {
    setShowOptions(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowOptions(false);
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, password, confirmPassword, email, shopName, shopCountry } = formData;

    if (shopCountry === 'Select') {
      setError('Please select a valid country');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/signup/vendor', {
        fullname,
        password,
        confirmPassword,
        email,
        shopName,
        shopCountry,
      });

      if (response.status === 200) {
        const userData = response.data;
        onSignup(userData.vendor);
      } else {
        setError('Vendor Signup failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.error);
      } else {
        setError('Error during vendor signup');
      }
    }
  };

  return (
    <div className="container">
      <div className="inner">
        <div className="box1">
          <h1>Walk in for a whole new experience</h1>
          <div className="suggestion">
            <h3>Already have an account?</h3>
            <a className="login-now" onClick={onToggleSignin}>Login now</a>
          </div>
        </div>
        <div className="box2">
          <form onSubmit={handleSubmit}>
            <h2>Vendor Sign Up</h2>
            {error && <p className="error-message">{error}</p>}
            <label>
              Full Name:
              <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Shop Name:
              <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} required />
            </label>
            <label>
              Shop Country:
              <div className="country-dropdown">
                <select
                  name="shopCountry"
                  value={formData.shopCountry}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                >
                  <option value="Select" disabled>Select</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {showOptions && (
                  <ul className="country-options">
                    {filteredCountries.map((country) => (
                      <li key={country} onClick={() => handleSelect(country)}>
                        {country}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </label>
            <label>
              Password:
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <label>
              Confirm Password:
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              {formData.password !== formData.confirmPassword && <span>Passwords do not match</span>}
            </label>
            <button type="submit" className="signup" onClick={handleSubmit}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;
