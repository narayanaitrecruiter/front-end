import React, { useState, useEffect } from 'react';
import './VendorNav.css';
import VendorProfile from '../UserProfile/VendorProfile';

const Navbar = ({ user, onSignin, onLogout, onCartIconClick, onCategorySelect, addClick, manageClick, onProductTabChange }) => {
  const [selectedProductTab, setSelectedProductTab] = useState('');
  const [userEmailSet, setUserEmail] = useState('');

  useEffect(() => {
    if (user && user.email) {
      setUserEmail(user.email);
    }
  }, [user]);

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
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div>
          <div className='addnew' onClick={addClick}>Add New Product</div>
        </div>
        <div className="accounts-tab">
          <select
            name="accounts"
            id="accounts"
            value=""
            onChange={handleProductTabChange}
          >
            <option value="">{userEmailSet}</option>
            <option value="usersettings">User Settings</option>
            <option value="logout">Log Out</option>
          </select>
        </div>
      </nav>
      {selectedProductTab === 'usersettings' && <VendorProfile user={user} onClose={() => setSelectedProductTab("")} />}
    </div>
  );
};

export default Navbar;
