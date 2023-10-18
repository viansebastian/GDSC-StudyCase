import React, { useState } from 'react';
import axios from 'axios';
import './personalinfo.css'

function PersonalInfo({ closePopup }) {
  const [userEmail, setUserEmail] = useState('');
  const [personalInfo, setPersonalInfo] = useState(null);

  const handleFetchPersonalInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/personal/${userEmail}`);
      setPersonalInfo(response.data);
    } catch (error) {

      console.error(error);
    }
  };

  return (
    <div className="personal-info-popup">
      <div className="personal-info-popup-box">
        <button className="close-button" onClick={closePopup}>
          X
        </button>
        <h2>Get Personal Information</h2>
        <input
          type="email"
          placeholder="User Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <button onClick={handleFetchPersonalInfo}>Fetch Info</button>
        {personalInfo && (
          <div className="info-display">
            <h3>Personal Information:</h3>
            <p>Name: {personalInfo.name}</p>
            <p>Email: {personalInfo.email}</p>
            <p>ID: {personalInfo.userId}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalInfo;
