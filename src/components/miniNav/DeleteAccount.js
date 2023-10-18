import React, { useState } from 'react';
import axios from 'axios';
import './deleteAccount.css';

function DeleteAccount({ closePopup }) {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [deleteStatus, setDeleteStatus] = useState('');

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        data: {
          userEmail,
          password,
        },
      });
      console.log('Account deleted successfully:', response.data);
      setDeleteStatus('Account Deleted Successfully');
    } catch (error) {
      console.error('Error deleting account:', error);
      setDeleteStatus('Account Deletion Failed, Check ID, Email, and Password');
    }
  };

  return (
    <div className="delete-account-popup">
      <div className="delete-account-popup-box">
        <button className="close-button" onClick={closePopup}>
          X
        </button>
        <h2>Delete Account</h2>
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
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <input
          type="password" 
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={handleDeleteAccount}>Delete</button>
        {deleteStatus && <p>{deleteStatus}</p>}
      </div>
    </div>
  );
}

export default DeleteAccount;
