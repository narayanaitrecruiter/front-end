import React, { useState, useEffect } from 'react';
import './ClientNavbar.css';
import cartIcon from './icons/shopping-cart.png';
import ClientProfile from '../UserProfile/ClientProfile';

const ClientNavbar = ({
  user,
  onLogout,
  onCartIconClick,
  onCategorySelect,
  onSearch, 
}) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProductTab, setSelectedProductTab] = useState('');
  const [userEmailSet, setUserEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        if (user && user.email) {
          setUserEmail(user.email);
          const response = await fetch('http://localhost:3001/orders/cart/item-count', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail: user.email }),
          });
          const data = await response.json();
          console.log("item count" ,data );
          setCartItemCount(data);
        }
      } catch (error) {
        console.error('Error fetching cart item count:', error);
      }
    };

    fetchCartItemCount();
  }, [user, onCartIconClick]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    if (searchQuery.trim() !== '') {
      onSearch(searchQuery);
    } else {
      onCategorySelect('');
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    onCategorySelect(selectedCategory);
  };

  const handleProductTabChange = (event) => {
    const selectedProductTab = event.target.value;
    setSelectedProductTab(selectedProductTab);

    if (selectedProductTab === 'logout') {
      onLogout();
    }
  };

  return (
    <div>
      <nav className="navbar-container">
        <div className="logo">Ecom</div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchButtonClick}>Search</button>
        </div>
        <div className="categories-dropdown">
          <label htmlFor="categories">Categories</label>
          <select
            name="categories"
            id="categories"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
                <option value="">All Products</option>
                <option value="Womens fashion">Womens fashion</option>
                <option value="Mens fashion">Mens fashion</option>
                <option value="Bags and accessories">Bags and accessories</option>
                <option value="Baby care">Baby care</option>
                <option value="Health care and beauty">Health care and beauty</option>
                <option value="Electronic Accessories">Electronic Accessories</option>
                <option value="Home and lifestyle">Home and lifestyle</option>
                <option value="Art and crafts">Art and crafts</option>
          </select>
        </div>
        <div className="cart-icon" onClick={onCartIconClick}>
          <div>
            <img src={cartIcon} alt="Cart Icon" />
          </div>
          <div className={`cartNotiBox ${cartItemCount > 0 ? 'active' : ''}`}>
            {cartItemCount > 0 && <div className="cart-notification">{cartItemCount}</div>}
          </div>
        </div>
        <div className="accounts-tab">
          <select name="accounts" id="accounts" value="" onChange={handleProductTabChange}>
            <option value="">{userEmailSet}</option>
            <option value="usersettings">User Settings</option>
            <option value="logout">Log Out</option>
          </select>
        </div>
      </nav>
      {selectedProductTab === 'usersettings' && <ClientProfile user={user} onClose={() => setSelectedProductTab('')} />}
    </div>
  );
};

export default ClientNavbar;
