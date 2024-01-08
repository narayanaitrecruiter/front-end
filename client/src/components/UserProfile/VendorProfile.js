import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VendorProfile.css';

const VendorProfile = ({ user, onUpdateVendorInfo, onClose }) => {
  const [vendorInfo, setVendorInfo] = useState({
    email: '',
    fullname: '',
    shopName: '',
    shopCountry: '',
  });

  const [originalInfo, setOriginalInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchVendorInfo = async () => {
      try {
        const response = await axios.post('http://localhost:3001/auth/vendor/getInfo', {
          userEmail: user.email,
        });

        const { email, fullname, shopName, shopCountry } = response.data.vendor;
        setVendorInfo({ email, fullname, shopName, shopCountry });
        setOriginalInfo({ email, fullname, shopName, shopCountry });
      } catch (error) {
        console.error('Error fetching vendor information:', error);
      }
    };

    if (user && user.email) {
      fetchVendorInfo();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setVendorInfo(originalInfo);
    setIsEditing(false);
    onClose(); 
  };

  const handleSaveChanges = async () => {
    try {
      const updatedInfo = {
        fullname: vendorInfo.fullname,
        shopName: vendorInfo.shopName,
      };
      const response = await axios.put('http://localhost:3001/auth/vendor/updateInfo', {
        userEmail: user.email,
        updatedInfo,
      });
      setIsEditing(false);
      onClose(); 

      if (response.data.success) {
        setIsEditing(false);
        onUpdateVendorInfo(updatedInfo); 
      } else {
        console.error('Failed to update vendor information:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating vendor information:', error);
    }
  };



  return (
    <div className="vendor-profile-container">
      <h2>Vendor Profile</h2>
      {isEditing ? (
        <div className="edit-info">
          <label htmlFor="email">Email:</label>
          <p>{vendorInfo.email}</p>
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            name="fullname"
            value={vendorInfo.fullname}
            onChange={handleInputChange}
          />
          <label htmlFor="shopName">Shop Name:</label>
          <input
            type="text"
            name="shopName"
            value={vendorInfo.shopName}
            onChange={handleInputChange}
          />
          <label htmlFor="shopCountry">Shop Country:</label>
          <p>{vendorInfo.shopCountry}</p>
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={handleCancelClick} className="cancel">Cancel</button>
        </div>
      ) : (
        <div className="unedited-info">
          <p><span className='header'>Email:</span> {vendorInfo.email}</p>
          <p><span className='header'>Full Name:</span> {vendorInfo.fullname}</p>
          <p><span className='header'>Shop Name:</span> {vendorInfo.shopName}</p>
          <p><span className='header'>Shop Country:</span> {vendorInfo.shopCountry}</p>
          <div className="button-wrapper">
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleCancelClick} className="cancel">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorProfile;
