import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientProfile.css';

const ClientProfile = ({ user, onUpdateClientInfo, onClose }) => {
  const [clientInfo, setClientInfo] = useState({
    email: '',
    fullname: '',
    pass: '',
    cpass: '',
  });

  const [originalInfo, setOriginalInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        const response = await axios.post('http://localhost:3001/auth/client/getInfo', {
          userEmail: user.email,
        });

        const { email, fullname } = response.data.client;
        setClientInfo({ email, fullname });
        setOriginalInfo({ email, fullname });
      } catch (error) {
        console.error('Error fetching Client information:', error);
      }
    };

    if (user && user.email) {
      fetchClientInfo();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setClientInfo(originalInfo);
    setIsEditing(false);
    onClose(); 
  };

  const handleSaveChanges = async () => {
    try {
      const updatedInfo = {
        fullname: clientInfo.fullname,
        password: clientInfo.pass,
      };
      const response = await axios.put('http://localhost:3001/auth/client/updateInfo', {
        userEmail: user.email,
        updatedInfo,
      });
      setIsEditing(false);
      onClose(); 

      if (response.data.success) {
        setIsEditing(false);
        onUpdateClientInfo(updatedInfo); 
      } else {
        console.error('Failed to update Client information:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating Client information:', error);
    }
  };



  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      {isEditing ? (
        <div className="edit-info">
          <label htmlFor="email">Email:</label>
          <p>{clientInfo.email}</p>
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            name="fullname"
            value={clientInfo.fullname}
            onChange={handleInputChange}
          />
          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            name="password"
            value={clientInfo.pass}
            onChange={handleInputChange}
          />
          <label htmlFor="cpass">Confirm Password:</label>
          <input
            type="password"
            name="password"
            value={clientInfo.cpass}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={handleCancelClick} className="cancel">Cancel</button>
        </div>
      ) : (
        <div className="unedited-info">
          <p><span className='header'>Email:</span> {clientInfo.email}</p>
          <p><span className='header'>Full Name:</span> {clientInfo.fullname}</p>
          <div className="button-wrapper">
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleCancelClick} className="cancel">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientProfile;
