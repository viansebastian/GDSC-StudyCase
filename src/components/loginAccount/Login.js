import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; 

function Login({ closePopup }) {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', userData);

      setAlertMessage('Login successful');
    } catch (error) {

      setAlertMessage('Error logging in');
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
    <div className="login-popup">
      <div className="login-popup-box">
        <button className="close-button" onClick={closePopup}>
          X
        </button>
        <h2>Login</h2>
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
        <button onClick={handleLogin}>Login</button>
        {alertMessage && <p className="alert-message">{alertMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
