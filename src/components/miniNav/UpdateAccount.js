import React, { useState } from 'react';
import axios from 'axios';
import './updateAccount.css'; 

function UpdateAccount({ closePopup }) {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [updatedName, setUpdatedName] = useState('');

  const handleUpdateAccount = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, {
        email, 
        name: updatedName,
       });
      console.log('Account updated successfully:', response.data);

    } catch (error) {
      console.error('Error updating account:', error);

    }
  };

  return (
    <div className="update-account-popup">
      <div className="update-account-popup-box">
        <button className="close-button" onClick={closePopup}>
          X
        </button>
        <h2>Update Account</h2>
        <input
          type="text"
          placeholder="Enter your ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="text"
          placeholder="New Name"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          required        
        />
        <button onClick={handleUpdateAccount}>Update</button>
      </div>
    </div>
  );
}

export default UpdateAccount;
