import React, { useState } from 'react';
import axios from 'axios';
import './CreateAccount.css'; // Import your CSS file

function CreateAccount({ closePopup }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [alertMessage, setAlertMessage] = useState('');

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/signIn', userData);
      setAlertMessage('Account created successfully');
    } catch (error) {
      setAlertMessage('Error creating account');
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="create-account-popup">
      <div className="create-account-popup-box">
        <button className="close-button" onClick={closePopup}>
          X
        </button>
        <h2>Create Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleInputChange}
          required
        />
        <button onClick={handleCreateUser}>Create User</button>
        {alertMessage && <p className="alert-message">{alertMessage}</p>}
      </div>
    </div>
  );
}

export default CreateAccount;
