import React, { useState } from 'react';
import axios from 'axios';
import './searchUser.css'; 

function SearchUser({ closePopup }) {
  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSearchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userEmail}`);
      setUserData(response.data);
      setAlertMessage('');
    } catch (error) {
      setAlertMessage('User not found');
      console.error(error);
      setUserData(null);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setUserEmail(value);
  };

  const closeSearchUserPopup = () => {
    setUserData(null);
    closePopup();
  };

  return (
    <div className="search-user-popup">
      <div className="search-user-popup-box">
        <button className="close-button" onClick={closeSearchUserPopup}>
          X
        </button>
        <h2>Search User</h2>
        <input
          type="text"
          placeholder="User Email"
          value={userEmail}
          onChange={handleInputChange}
          required
        />
        <button onClick={handleSearchUser}>Search User</button>
        {alertMessage && <p className="alert-message">{alertMessage}</p>}
        {userData && (
          <div>
            <h3>User Name: {userData.name}</h3>
            <p>Email: {userData.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchUser;
